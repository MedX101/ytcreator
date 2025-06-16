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
    .index("status", ["status"]),
  styleAnalyses: defineTable({
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
      addressingStyle: v.string(), // "direct", "conversational", etc.
    }),
    detailedAnalysis: v.string(),
  })
    .index("transcriptId", ["transcriptId"])
    .index("userId", ["userId"]),  generatedScripts: defineTable({
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
