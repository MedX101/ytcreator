import { GoogleGenerativeAI } from "@google/generative-ai";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ACTION - Can make external HTTP requests
export const transcribeVideo = action({
  args: {
    videoUrl: v.string(),
    title: v.optional(v.string()),
  },
  handler: async (ctx, { videoUrl, title }): Promise<{ transcriptId: Id<"transcripts">; transcript: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    try {
      // Use Gemini 2.0 Flash (as shown in your error)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const prompt = `Please provide a detailed transcript of this YouTube video. Include:
1. Complete spoken content with speaker identification if multiple speakers
2. Timestamps for major sections  
3. Any important visual elements or text shown in the video
4. Format as a clean, readable transcript`;

      const result = await model.generateContent([
        prompt,
        {
          fileData: {
            fileUri: videoUrl,
            mimeType: "video/*",
          },
        },
      ]);
      
      const transcript = result.response.text();      // Store the transcript in the database using a mutation
      const transcriptId: Id<"transcripts"> = await ctx.runMutation(api.youtube.storeTranscript, {
        userId: identity.subject,
        youtubeUrl: videoUrl,
        title: title || "Untitled Video",
        originalScript: transcript,
      });

      return { transcriptId, transcript };
    } catch (error) {
      console.error("Error transcribing video:", error);
      throw new Error(`Transcription failed: ${error}`);
    }
  },
});

// Helper mutation to store transcript (called from action)
export const storeTranscript = mutation({
  args: {
    userId: v.string(),
    youtubeUrl: v.string(),
    title: v.string(),
    originalScript: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transcripts", {
      userId: args.userId,
      youtubeUrl: args.youtubeUrl,
      title: args.title,
      originalScript: args.originalScript,
      status: "completed",
      metadata: { createdAt: Date.now() },
    });
  },
});

// ACTION - Makes external API calls
export const analyzeStyle = action({
  args: {
    transcriptId: v.id("transcripts"),
  },
  handler: async (ctx, { transcriptId }): Promise<{ analysisId: Id<"styleAnalyses">; analysis: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }    try {
      // Get the transcript using a query
      const transcript = await ctx.runQuery(api.youtube.getTranscript, { id: transcriptId });
      if (!transcript || transcript.userId !== identity.subject) {
        throw new Error("Transcript not found or unauthorized");
      }

      // Use Gemini to analyze the style
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Analyze the following video transcript and provide a detailed style analysis:
        
        Transcript:
        ${transcript.originalScript}
        
        Please provide a comprehensive analysis including:
        1. **Tone and Voice**: Describe the overall tone (casual, professional, enthusiastic, etc.)
        2. **Language Style**: Vocabulary level, sentence structure, use of jargon
        3. **Pacing and Flow**: How information is presented and organized
        4. **Engagement Techniques**: Hooks, questions, calls-to-action used
        5. **Content Structure**: How the video is organized (intro, main points, conclusion)
        6. **Unique Characteristics**: Any distinctive style elements or patterns
        7. **Target Audience**: Who this content seems designed for
        8. **Key Phrases**: Common expressions or catchphrases used
        
        Format this as a structured analysis that could be used to replicate this style.
      `;

      const result = await model.generateContent(prompt);
      const analysis = result.response.text();      // Store the style analysis using a mutation
      const analysisId: Id<"styleAnalyses"> = await ctx.runMutation(api.youtube.storeStyleAnalysis, {
        userId: identity.subject,
        transcriptId,
        analysis,
      });

      return { analysisId, analysis };
    } catch (error) {
      console.error("Error analyzing style:", error);
      throw new Error("Failed to analyze style");
    }
  },
});

// Helper mutation to store style analysis
export const storeStyleAnalysis = mutation({
  args: {
    userId: v.string(),
    transcriptId: v.id("transcripts"),
    analysis: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("styleAnalyses", {
      userId: args.userId,
      transcriptId: args.transcriptId,
      styleProfile: {
        hasIntro: false,
        hasOutro: false,
        humorTypes: [],
        toneDescription: "Analysis pending",
        vocabularyLevel: "intermediate",
        sentenceStructure: "varied",
        pacingPattern: "moderate",
        catchphrases: [],
        transitionWords: [],
        addressingStyle: "conversational",
      },
      detailedAnalysis: args.analysis,
    });
  },
});

// ACTION - Makes external API calls
export const generateScript = action({
  args: {
    analysisId: v.id("styleAnalyses"),
    topic: v.string(),
    length: v.optional(v.string()),
    additionalInstructions: v.optional(v.string()),
  },
  handler: async (ctx, { analysisId, topic, length = "medium", additionalInstructions }): Promise<{ scriptId: Id<"generatedScripts">; script: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }    try {
      // Get the style analysis using a query
      const styleAnalysis = await ctx.runQuery(api.youtube.getStyleAnalysis, { id: analysisId });
      if (!styleAnalysis || styleAnalysis.userId !== identity.subject) {
        throw new Error("Style analysis not found or unauthorized");
      }

      // Get the original transcript for additional context
      const transcript = await ctx.runQuery(api.youtube.getTranscript, { id: styleAnalysis.transcriptId });
      if (!transcript) {
        throw new Error("Original transcript not found");
      }

      // Use Gemini to generate the script
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Create a YouTube video script on the topic "${topic}" using the following style analysis as a guide:
        
        Style Analysis:
        ${styleAnalysis.detailedAnalysis}
        
        Original Video Context:
        Title: ${transcript.title}
        URL: ${transcript.youtubeUrl}
        
        Requirements:
        - Topic: ${topic}
        - Length: ${length} (short: 2-3 minutes, medium: 5-8 minutes, long: 10-15 minutes)
        ${additionalInstructions ? `- Additional Instructions: ${additionalInstructions}` : ''}
        
        Please create a complete script that:
        1. Matches the tone, voice, and style identified in the analysis
        2. Uses similar engagement techniques and content structure
        3. Incorporates the language style and pacing patterns
        4. Includes timestamps for different sections
        5. Provides clear direction for visual elements or cuts
        6. Maintains the authentic voice while covering the new topic
        
        Format the script with:
        - [TIMESTAMP] markers
        - [VISUAL/ACTION] cues
        - Clear paragraph breaks
        - Hook, main content, and conclusion sections
      `;

      const result = await model.generateContent(prompt);
      const script = result.response.text();      // Store the generated script using a mutation
      const scriptId: Id<"generatedScripts"> = await ctx.runMutation(api.youtube.storeGeneratedScript, {
        userId: identity.subject,
        transcriptId: styleAnalysis.transcriptId,
        styleAnalysisId: analysisId,
        topic,
        script,
        additionalInstructions: additionalInstructions || "",
        length,
      });

      return { scriptId, script };
    } catch (error) {
      console.error("Error generating script:", error);
      throw new Error("Failed to generate script");
    }
  },
});

// Helper mutation to store generated script
export const storeGeneratedScript = mutation({
  args: {
    userId: v.string(),
    transcriptId: v.id("transcripts"),
    styleAnalysisId: v.id("styleAnalyses"),
    topic: v.string(),
    script: v.string(),
    additionalInstructions: v.string(),
    length: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("generatedScripts", {
      userId: args.userId,
      transcriptId: args.transcriptId,
      styleAnalysisId: args.styleAnalysisId,
      type: "generated",
      inputTitle: args.topic,
      inputScript: args.additionalInstructions,
      outputScript: args.script,
      status: "completed",
      metadata: { 
        length: args.length,
        createdAt: Date.now(),
      },
    });
  },
});

// ACTION - Makes external API calls
export const refineScript = action({
  args: {
    scriptId: v.id("generatedScripts"),
    refinementInstructions: v.string(),
  },
  handler: async (ctx, { scriptId, refinementInstructions }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    try {
      // Get the script using a query
      const script = await ctx.runQuery(api.youtube.getScript, { id: scriptId });
      if (!script || script.userId !== identity.subject) {
        throw new Error("Script not found or unauthorized");
      }

      // Use Gemini to refine the script
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Please refine the following YouTube script based on these instructions:
        
        Refinement Instructions:
        ${refinementInstructions}
        
        Original Script:
        ${script.outputScript}
        
        Please provide an improved version that:
        1. Addresses the specific refinement requests
        2. Maintains the original style and structure
        3. Preserves what's working well
        4. Enhances clarity, engagement, or flow as requested
        5. Keeps the same format with timestamps and visual cues
        
        Return the complete refined script.
      `;

      const result = await model.generateContent(prompt);
      const refinedScript = result.response.text();

      // Update the script using a mutation
      await ctx.runMutation(api.youtube.updateScript, {
        scriptId,
        refinedScript,
      });

      return { script: refinedScript };
    } catch (error) {
      console.error("Error refining script:", error);
      throw new Error("Failed to refine script");
    }
  },
});

// Helper mutation to update script
export const updateScript = mutation({
  args: {
    scriptId: v.id("generatedScripts"),
    refinedScript: v.string(),
  },
  handler: async (ctx, { scriptId, refinedScript }) => {
    await ctx.db.patch(scriptId, {
      outputScript: refinedScript,
      metadata: { lastRefinedAt: Date.now() },
    });
  },
});

// Query to get user's transcripts
export const getUserTranscripts = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("transcripts")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

// Query to get user's style analyses
export const getUserStyleAnalyses = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("styleAnalyses")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

// Query to get user's generated scripts
export const getUserScripts = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("generatedScripts")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

// Query to get a specific transcript
export const getTranscript = query({
  args: { id: v.id("transcripts") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const transcript = await ctx.db.get(id);
    if (!transcript || transcript.userId !== identity.subject) {
      return null;
    }

    return transcript;
  },
});

// Query to get a specific style analysis
export const getStyleAnalysis = query({
  args: { id: v.id("styleAnalyses") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const analysis = await ctx.db.get(id);
    if (!analysis || analysis.userId !== identity.subject) {
      return null;
    }

    return analysis;
  },
});

// Query to get a specific script
export const getScript = query({
  args: { id: v.id("generatedScripts") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const script = await ctx.db.get(id);
    if (!script || script.userId !== identity.subject) {
      return null;
    }

    return script;
  },
});