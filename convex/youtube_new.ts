import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";

// AI-powered action to transcribe a YouTube video
export const transcribeVideo = action({
  args: {
    userId: v.string(),
    youtubeUrl: v.string(),
    title: v.optional(v.string()),
  },
  handler: async (ctx, { userId, youtubeUrl, title }) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    let transcriptId: any = null;
    
    try {
      // Create initial transcript record
      transcriptId = await ctx.runMutation(createTranscript, {
        userId,
        youtubeUrl,
        status: "processing",
        originalScript: "",
        title: title || "Untitled Video",
        metadata: { processingStarted: Date.now() },
      });

      // Extract video ID from YouTube URL
      const videoId = extractVideoId(youtubeUrl);
      if (!videoId) {
        await ctx.runMutation(updateTranscript, {
          transcriptId,
          status: "error",
          metadata: { error: "Invalid YouTube URL" },
        });
        throw new Error("Invalid YouTube URL");
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Use Gemini to provide transcription instructions
      const prompt = `
        You are helping with YouTube video transcription. The user has provided this YouTube URL: ${youtubeUrl}
        
        Since we cannot directly access YouTube's audio, please provide comprehensive instructions for manual transcription:

        **TRANSCRIPTION WORKFLOW INSTRUCTIONS:**

        1. **Audio Extraction**: Visit the YouTube video and use browser tools or applications to:
           - Record audio while playing the video
           - Use browser extensions for audio capture
           - Download audio using tools like yt-dlp (if legally permissible)

        2. **Manual Transcription Guidelines**:
           - Listen carefully and transcribe all spoken words
           - Include natural pauses and speech patterns
           - Don't worry about perfect punctuation initially
           - Note any background music or sound effects if relevant
           - Include filler words (um, uh, like) as they show speaking style

        3. **What to Capture**:
           - All dialogue and narration
           - Important sound effects or music cues
           - Any text that appears on screen and is read aloud
           - Speaker changes if multiple people are talking

        4. **Transcription Format**:
           - Write everything as one continuous text
           - Use line breaks for natural speaking pauses
           - Don't add extra formatting initially
           - Include approximate timestamps if helpful: [0:30] content here

        **Next Steps**: 
        After you manually transcribe the video content, return to this app and use the "Submit Manual Transcript" feature. Our AI will then clean up your transcription, add proper punctuation, and prepare it for style analysis.

        **Video ID Extracted**: ${videoId}
        **Ready for manual input**: Yes
      `;

      const result = await model.generateContent(prompt);
      const instructionsText = result.response.text();

      // Store the instructions as the initial transcript content
      const cleanedTranscript = `MANUAL_TRANSCRIPTION_REQUIRED

${instructionsText}

VIDEO_ID: ${videoId}
STATUS: Waiting for manual transcript input
NEXT_STEP: Use submitManualTranscript action with your transcribed content`;

      // Update transcript with instructions - status remains processing until manual input
      await ctx.runMutation(updateTranscript, {
        transcriptId,
        originalScript: cleanedTranscript,
        status: "awaiting_manual_input",
        metadata: { 
          processingStarted: Date.now(),
          videoId,
          transcriptionMethod: "manual_input_required",
          instructionsProvided: true,
        },
      });

      return { 
        transcriptId, 
        success: true, 
        status: "awaiting_manual_input",
        message: "Transcription instructions provided. Please manually transcribe the video and submit using submitManualTranscript.",
        videoId
      };
    } catch (error: any) {
      // Update transcript with error status if it was created
      if (transcriptId) {
        await ctx.runMutation(updateTranscript, {
          transcriptId,
          status: "error",
          metadata: { error: error.message },
        });
      }
      throw error;
    }
  },
});

// Create a new action for manual transcript input
export const submitManualTranscript = action({
  args: {
    transcriptId: v.id("transcripts"),
    manualTranscript: v.string(),
  },
  handler: async (ctx, { transcriptId, manualTranscript }) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Clean and improve the manually provided transcript using Gemini
      const prompt = `
        Please clean up and improve this manually provided YouTube transcript. Make it more readable while preserving the original meaning and style:
        
        Raw transcript:
        ${manualTranscript}
        
        Please:
        1. Fix any obvious transcription errors
        2. Add proper punctuation and capitalization
        3. Break into logical paragraphs
        4. Preserve the speaker's tone and style
        5. Keep all important content intact
        6. Remove any obvious filler words if excessive
        7. Ensure natural flow and readability
        
        Return only the cleaned transcript without any additional commentary.
      `;

      const result = await model.generateContent(prompt);
      const cleanedTranscript = result.response.text();

      // Update transcript with cleaned content
      await ctx.runMutation(updateTranscript, {
        transcriptId,
        originalScript: cleanedTranscript,
        status: "completed",
        metadata: { 
          processingCompleted: Date.now(),
          rawTranscriptLength: manualTranscript.length,
          cleanedTranscriptLength: cleanedTranscript.length,
          transcriptionMethod: "manual_input_with_ai_cleanup"
        },
      });

      return { success: true, cleanedTranscript };
    } catch (error: any) {
      // Update transcript with error status
      await ctx.runMutation(updateTranscript, {
        transcriptId,
        status: "error",
        metadata: { error: error.message },
      });
      throw error;
    }
  },
});

// AI-powered action to analyze writing style
export const analyzeStyle = action({
  args: {
    transcriptId: v.id("transcripts"),
    userId: v.string(),
  },
  handler: async (ctx, { transcriptId, userId }) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    try {
      // Get the transcript
      const transcript = await ctx.runQuery(getTranscript, { transcriptId });
      if (!transcript) {
        throw new Error("Transcript not found");
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Analyze style using Gemini
      const prompt = `
        Analyze the writing and speaking style of this transcript in detail. Provide a comprehensive analysis that includes specific patterns and characteristics:

        Transcript:
        ${transcript.originalScript}

        Please analyze and provide:

        1. **Tone and Voice**: Describe the overall tone (formal/casual, energetic/calm, etc.)
        2. **Vocabulary Level**: Simple/intermediate/advanced language usage
        3. **Sentence Structure**: Are sentences short and punchy, long and complex, or varied?
        4. **Pacing Pattern**: Fast-paced, measured, or variable pacing
        5. **Humor Types**: What types of humor are used (if any)?
        6. **Addressing Style**: How does the speaker address the audience (direct, conversational, formal)?
        7. **Common Phrases**: List any catchphrases, repeated phrases, or verbal tics
        8. **Transition Words**: What words/phrases does the speaker use to connect ideas?
        9. **Structure Elements**: Does it have intro/outro patterns?

        Respond in this exact JSON format:
        {
          "styleProfile": {
            "hasIntro": boolean,
            "hasOutro": boolean,
            "humorTypes": ["type1", "type2"],
            "toneDescription": "detailed description",
            "vocabularyLevel": "simple/intermediate/advanced",
            "sentenceStructure": "description",
            "pacingPattern": "description",
            "catchphrases": ["phrase1", "phrase2"],
            "transitionWords": ["word1", "word2"],
            "addressingStyle": "description"
          },
          "detailedAnalysis": "comprehensive analysis paragraph"
        }
      `;

      const result = await model.generateContent(prompt);
      const analysisText = result.response.text();
      
      // Parse the JSON response
      const analysis = JSON.parse(analysisText.replace(/```json\n?|\n?```/g, ''));

      // Create style analysis record
      const styleAnalysisId = await ctx.runMutation(createStyleAnalysis, {
        transcriptId,
        userId,
        styleProfile: analysis.styleProfile,
        detailedAnalysis: analysis.detailedAnalysis,
      });

      return { styleAnalysisId, analysis, success: true };
    } catch (error: any) {
      throw new Error(`Style analysis failed: ${error.message}`);
    }
  },
});

// AI-powered action to generate new script in analyzed style
export const generateScript = action({
  args: {
    userId: v.string(),
    styleAnalysisId: v.id("styleAnalyses"),
    inputTitle: v.string(),
    inputDescription: v.optional(v.string()),
    scriptLength: v.optional(v.string()), // "short", "medium", "long"
  },
  handler: async (ctx, { userId, styleAnalysisId, inputTitle, inputDescription, scriptLength = "medium" }) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    let generatedScriptId: any = null;
    
    try {
      // Get the style analysis
      const styleAnalysis = await ctx.runQuery(getStyleAnalysis, { styleAnalysisId });
      if (!styleAnalysis) {
        throw new Error("Style analysis not found");
      }

      // Get the original transcript for additional context
      const transcript = await ctx.runQuery(getTranscript, { 
        transcriptId: styleAnalysis.transcriptId 
      });

      // Create initial generated script record
      generatedScriptId = await ctx.runMutation(createGeneratedScript, {
        userId,
        transcriptId: styleAnalysis.transcriptId,
        styleAnalysisId,
        type: "generated",
        inputTitle,
        inputScript: inputDescription || "",
        outputScript: "",
        status: "processing",
        metadata: { scriptLength, processingStarted: Date.now() },
      });

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Define length guidelines
      const lengthGuide = {
        short: "2-3 minutes (300-450 words)",
        medium: "5-7 minutes (750-1050 words)", 
        long: "10-12 minutes (1500-1800 words)"
      };

      // Generate script using Gemini
      const prompt = `
        Create a new YouTube script that matches the analyzed style profile below. The script should feel like it was written by the same person as the original transcript.

        **Target Length**: ${lengthGuide[scriptLength as keyof typeof lengthGuide]}
        **Topic/Title**: ${inputTitle}
        ${inputDescription ? `**Additional Details**: ${inputDescription}` : ''}

        **Style Profile to Match**:
        - Tone: ${styleAnalysis.styleProfile.toneDescription}
        - Vocabulary Level: ${styleAnalysis.styleProfile.vocabularyLevel}
        - Sentence Structure: ${styleAnalysis.styleProfile.sentenceStructure}
        - Pacing: ${styleAnalysis.styleProfile.pacingPattern}
        - Addressing Style: ${styleAnalysis.styleProfile.addressingStyle}
        - Common Phrases: ${styleAnalysis.styleProfile.catchphrases.join(', ')}
        - Transition Words: ${styleAnalysis.styleProfile.transitionWords.join(', ')}
        - Has Intro Pattern: ${styleAnalysis.styleProfile.hasIntro}
        - Has Outro Pattern: ${styleAnalysis.styleProfile.hasOutro}
        - Humor Types: ${styleAnalysis.styleProfile.humorTypes.join(', ')}

        **Original Transcript for Style Reference**:
        ${transcript?.originalScript?.substring(0, 1000)}...

        **Instructions**:
        1. Write in the exact same style as the analyzed speaker
        2. Use similar vocabulary, sentence patterns, and transitions
        3. Include the speaker's characteristic phrases and expressions naturally
        4. Match the tone and addressing style precisely
        5. Follow the same intro/outro patterns if they exist
        6. Incorporate similar humor style if applicable
        7. Make the content engaging and valuable for the specified topic

        Generate the complete script ready for recording:
      `;

      const result = await model.generateContent(prompt);
      const generatedScript = result.response.text();

      // Update generated script with content
      await ctx.runMutation(updateGeneratedScript, {
        generatedScriptId,
        outputScript: generatedScript,
        status: "completed",
        metadata: { 
          processingCompleted: Date.now(),
          scriptLength,
          wordCount: generatedScript.split(' ').length,
        },
      });

      return { generatedScriptId, script: generatedScript, success: true };
    } catch (error: any) {
      // Update with error status
      if (generatedScriptId) {
        await ctx.runMutation(updateGeneratedScript, {
          generatedScriptId,
          status: "error",
          metadata: { error: error.message },
        });
      }
      throw new Error(`Script generation failed: ${error.message}`);
    }
  },
});

// AI-powered action to refine existing script
export const refineScript = action({
  args: {
    userId: v.string(),
    styleAnalysisId: v.optional(v.id("styleAnalyses")),
    inputScript: v.string(),
    refinementInstructions: v.string(),
    title: v.optional(v.string()),
  },
  handler: async (ctx, { userId, styleAnalysisId, inputScript, refinementInstructions, title }) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    let generatedScriptId: any = null;
    
    try {
      // Create initial refined script record
      generatedScriptId = await ctx.runMutation(createGeneratedScript, {
        userId,
        styleAnalysisId,
        type: "refined",
        inputTitle: title,
        inputScript,
        outputScript: "",
        status: "processing",
        metadata: { refinementInstructions, processingStarted: Date.now() },
      });

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      let prompt = `
        Please refine the following script according to the specific instructions provided:

        **Original Script**:
        ${inputScript}

        **Refinement Instructions**:
        ${refinementInstructions}

        **Requirements**:
        1. Follow the refinement instructions precisely
        2. Maintain the overall quality and readability
        3. Preserve the original intent unless specifically asked to change it
        4. Ensure the refined script flows naturally
        5. Keep the same approximate length unless instructed otherwise
      `;

      // If style analysis is provided, include style matching instructions
      if (styleAnalysisId) {
        const styleAnalysis = await ctx.runQuery(getStyleAnalysis, { styleAnalysisId });
        if (styleAnalysis) {
          prompt += `

        **Also maintain this style profile**:
        - Tone: ${styleAnalysis.styleProfile.toneDescription}
        - Vocabulary Level: ${styleAnalysis.styleProfile.vocabularyLevel}
        - Sentence Structure: ${styleAnalysis.styleProfile.sentenceStructure}
        - Addressing Style: ${styleAnalysis.styleProfile.addressingStyle}
        - Use these phrases naturally: ${styleAnalysis.styleProfile.catchphrases.join(', ')}
        - Use these transitions: ${styleAnalysis.styleProfile.transitionWords.join(', ')}
        `;
        }
      }

      prompt += `

        Return only the refined script without any additional commentary or explanations.
      `;

      const result = await model.generateContent(prompt);
      const refinedScript = result.response.text();

      // Update generated script with refined content
      await ctx.runMutation(updateGeneratedScript, {
        generatedScriptId,
        outputScript: refinedScript,
        status: "completed",
        metadata: { 
          processingCompleted: Date.now(),
          refinementInstructions,
          originalWordCount: inputScript.split(' ').length,
          refinedWordCount: refinedScript.split(' ').length,
        },
      });

      return { generatedScriptId, script: refinedScript, success: true };
    } catch (error: any) {
      // Update with error status
      if (generatedScriptId) {
        await ctx.runMutation(updateGeneratedScript, {
          generatedScriptId,
          status: "error",
          metadata: { error: error.message },
        });
      }
      throw new Error(`Script refinement failed: ${error.message}`);
    }
  },
});

// Mutation to create a new transcript
export const createTranscript = mutation({
  args: {
    userId: v.string(),
    youtubeUrl: v.string(),
    status: v.string(),
    originalScript: v.string(),
    title: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transcripts", args);
  },
});

// Mutation to update a transcript
export const updateTranscript = mutation({
  args: {
    transcriptId: v.id("transcripts"),
    title: v.optional(v.string()),
    originalScript: v.optional(v.string()),
    status: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, { transcriptId, ...updates }) => {
    return await ctx.db.patch(transcriptId, updates);
  },
});

// Mutation to create a style analysis
export const createStyleAnalysis = mutation({
  args: {
    transcriptId: v.id("transcripts"),
    userId: v.string(),
    styleProfile: v.object({
      hasIntro: v.boolean(),
      hasOutro: v.boolean(),
      humorTypes: v.array(v.string()),
      toneDescription: v.string(),
      vocabularyLevel: v.string(),
      sentenceStructure: v.string(),
      pacingPattern: v.string(),
      catchphrases: v.array(v.string()),
      transitionWords: v.array(v.string()),
      addressingStyle: v.string(),
    }),
    detailedAnalysis: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("styleAnalyses", args);
  },
});

// Mutation to create a generated script
export const createGeneratedScript = mutation({
  args: {
    userId: v.string(),
    transcriptId: v.optional(v.id("transcripts")),
    styleAnalysisId: v.optional(v.id("styleAnalyses")),
    type: v.string(),
    inputTitle: v.optional(v.string()),
    inputScript: v.optional(v.string()),
    outputScript: v.string(),
    status: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("generatedScripts", args);
  },
});

// Mutation to update a generated script
export const updateGeneratedScript = mutation({
  args: {
    generatedScriptId: v.id("generatedScripts"),
    outputScript: v.optional(v.string()),
    status: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, { generatedScriptId, ...updates }) => {
    return await ctx.db.patch(generatedScriptId, updates);
  },
});

// Query to get a transcript
export const getTranscript = query({
  args: { transcriptId: v.id("transcripts") },
  handler: async (ctx, { transcriptId }) => {
    return await ctx.db.get(transcriptId);
  },
});

// Query to get a style analysis
export const getStyleAnalysis = query({
  args: { styleAnalysisId: v.id("styleAnalyses") },
  handler: async (ctx, { styleAnalysisId }) => {
    return await ctx.db.get(styleAnalysisId);
  },
});

// Query to get user's transcripts
export const getUserTranscripts = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("transcripts")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// Query to get user's style analyses
export const getUserStyleAnalyses = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("styleAnalyses")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// Query to get user's generated scripts
export const getUserGeneratedScripts = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("generatedScripts")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// Query to get style analyses for a specific transcript
export const getStyleAnalysesForTranscript = query({
  args: { transcriptId: v.id("transcripts") },
  handler: async (ctx, { transcriptId }) => {
    return await ctx.db
      .query("styleAnalyses")
      .withIndex("transcriptId", (q) => q.eq("transcriptId", transcriptId))
      .collect();
  },
});

// Query to get generated scripts for a specific style analysis
export const getGeneratedScriptsForStyle = query({
  args: { styleAnalysisId: v.id("styleAnalyses") },
  handler: async (ctx, { styleAnalysisId }) => {
    return await ctx.db
      .query("generatedScripts")
      .filter((q) => q.eq(q.field("styleAnalysisId"), styleAnalysisId))
      .collect();
  },
});

// Helper function to extract video ID from YouTube URL
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}
