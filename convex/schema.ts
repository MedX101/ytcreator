import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  subscriptions: defineTable({
    userId: v.optional(v.string()),
    polarId: v.optional(v.string()),
    polarPriceId: v.optional(v.string()),
    currency: v.optional(v.string()),
    interval: v.optional(v.string()),
    status: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    amount: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    endedAt: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    customerCancellationReason: v.optional(v.string()),
    customerCancellationComment: v.optional(v.string()),
    metadata: v.optional(v.any()),
    customFieldData: v.optional(v.any()),
    customerId: v.optional(v.string()),
  })
    .index("userId", ["userId"])
    .index("polarId", ["polarId"]),  webhookEvents: defineTable({
    type: v.string(),
    polarEventId: v.string(),
    createdAt: v.string(),
    modifiedAt: v.string(),
    data: v.any(),
  })
    .index("type", ["type"])
    .index("polarEventId", ["polarEventId"]),
  // YouTube Script Transcription Tables
  transcripts: defineTable({
    userId: v.string(),
    youtubeUrl: v.string(),
    title: v.optional(v.string()),
    originalScript: v.string(),
    status: v.string(), // "processing", "completed", "failed"
    metadata: v.optional(v.any()),
  })
    .index("userId", ["userId"])
    .index("status", ["status"]),  styleAnalyses: defineTable({
    transcriptId: v.id("transcripts"),
    userId: v.string(),
    styleProfile: v.object({
      // Basic style characteristics  
      hasIntro: v.boolean(),
      hasOutro: v.boolean(),
      humorTypes: v.array(v.string()),
      toneDescription: v.string(),
      vocabularyLevel: v.string(),
      sentenceStructure: v.string(),
      pacingPattern: v.string(),
      catchphrases: v.array(v.string()),
      transitionWords: v.array(v.string()),
      addressingStyle: v.string(), // "direct", "conversational", etc.
      
      // ENHANCED METRICS - Real analytics that impress users
      wordCount: v.optional(v.number()),
      sentenceCount: v.optional(v.number()),
      paragraphCount: v.optional(v.number()),
      avgSentenceLength: v.optional(v.number()),
      readingTimeMinutes: v.optional(v.number()),
      complexityScore: v.optional(v.number()),
      
      // Calculated engagement metrics
      questionFrequency: v.optional(v.number()),
      emphasisUsage: v.optional(v.number()),
      personalPronouns: v.optional(v.number()),
      
      // Advanced linguistic analysis
      technicalTerms: v.optional(v.number()),
      uniqueVocabulary: v.optional(v.number()),
      sentimentScore: v.optional(v.number()),
      
      // Content structure insights
      introLength: v.optional(v.number()),
      conclusionLength: v.optional(v.number()),
      transitionDensity: v.optional(v.number()),
      
      // Psychological profile metrics
      authorityLevel: v.optional(v.string()),
      authenticityMarkers: v.optional(v.number()),
      energyLevel: v.optional(v.string()),
    }),
    detailedAnalysis: v.string(),
    enhancedMetrics: v.optional(v.string()),
    processingDetails: v.optional(v.object({
      analyzedAt: v.number(),
      processingTimeMs: v.number(),
      confidenceScore: v.number(),
      patternsDetected: v.number(),
      linguisticFeatures: v.number(),
    })),
  })
    .index("transcriptId", ["transcriptId"])
    .index("userId", ["userId"]),generatedScripts: defineTable({
    userId: v.string(),
    transcriptId: v.optional(v.id("transcripts")),
    styleAnalysisId: v.optional(v.id("styleAnalyses")),
    type: v.string(), // "generated" or "refined"
    inputTitle: v.optional(v.string()),
    inputScript: v.optional(v.string()),
    outputScript: v.string(),
    status: v.string(), // "processing", "completed", "failed"
    metadata: v.optional(v.any()),
  })
    .index("userId", ["userId"])
    .index("transcriptId", ["transcriptId"])
    .index("styleAnalysisId", ["styleAnalysisId"])
    .index("type", ["type"])
    .index("status", ["status"]),
});
