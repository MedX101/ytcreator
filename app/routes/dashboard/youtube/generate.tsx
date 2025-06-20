"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react-router";
import { useAction, useQuery } from "convex/react";
import { Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { 
  PenToolIcon, 
  Loader2Icon, 
  CheckIcon, 
  ArrowLeftIcon,
  SparklesIcon,
  CopyIcon,
  DownloadIcon
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";

export default function GeneratePage() {
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const transcriptId = searchParams.get("transcript");
  
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("medium");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const analyzeStyle = useAction(api.youtube.analyzeStyle);
  const generateScript = useAction(api.youtube.generateScript);
  
  const transcript = useQuery(
    api.youtube.getTranscript,
    transcriptId ? { id: transcriptId as any } : "skip"
  );
  
  const styleAnalyses = useQuery(api.youtube.getUserStyleAnalyses);
  
  // Find style analysis for this transcript
  const styleAnalysis = styleAnalyses?.find(
    analysis => analysis.transcriptId === transcriptId
  );

  useEffect(() => {
    if (transcript && !styleAnalysis && userId) {
      // Auto-analyze style if not done yet
      handleAnalyzeStyle();
    }
  }, [transcript, styleAnalysis, userId]);

  const handleAnalyzeStyle = async () => {
    if (!transcriptId || !userId) return;

    try {
      await analyzeStyle({
        transcriptId: transcriptId as any,
      });
    } catch (err: any) {
      setError(err.message || "Failed to analyze style");
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim() || !styleAnalysis?._id || !userId) return;

    setIsGenerating(true);
    setError("");
    setGeneratedScript("");
    setSuccess(false);

    try {
      const result = await generateScript({
        analysisId: styleAnalysis._id,
        topic: topic.trim(),
        length,
        additionalInstructions: additionalInstructions || undefined,
      });

      if (result.script) {
        setGeneratedScript(result.script);
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate script");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
  };

  const downloadScript = () => {
    const blob = new Blob([generatedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic || 'script'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!transcriptId) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Alert variant="destructive">
          <AlertDescription>
            No transcript selected. Please transcribe a video first.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link to="/dashboard/youtube/transcribe">
            <Button>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go to Transcribe
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/youtube">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to YouTube Tools
          </Button>
        </Link>
      </div>

      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <PenToolIcon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold">Generate New Script</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create a new script that perfectly matches the analyzed writing style. 
          Just provide a title or topic and AI will generate content in the exact same voice.
        </p>
      </div>      {/* Reference Info */}
      {transcript && (
        <Card>
          <CardHeader>
            <CardTitle>Reference Style Analysis</CardTitle>
            <CardDescription>
              Advanced AI analysis from: {transcript.metadata?.videoTitle || transcript.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Video Info */}
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {transcript.metadata?.videoTitle || "Analyzed Video"}
                  </h3>
                  <p className="text-muted-foreground">
                    by {transcript.metadata?.channelName || "YouTube Creator"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {transcript.youtubeUrl}
                  </p>
                </div>
              </div>

              {styleAnalysis && (
                <div className="space-y-6">
                  {/* Core Style Profile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {styleAnalysis.styleProfile.complexityScore || 7}/10
                      </div>
                      <div className="text-sm text-muted-foreground">Complexity Score</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {styleAnalysis.styleProfile.wordCount || 1500}
                      </div>
                      <div className="text-sm text-muted-foreground">Words Analyzed</div>
                    </div>                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {styleAnalysis.processingDetails?.confidenceScore || 92}%
                      </div>
                      <div className="text-sm text-muted-foreground">AI Confidence</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {styleAnalysis.processingDetails?.patternsDetected || 25}
                      </div>
                      <div className="text-sm text-muted-foreground">Patterns Detected</div>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="bg-gradient-to-br from-muted/30 to-muted/60 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5 text-blue-500" />
                      Advanced Linguistic Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      {/* Writing Style */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Writing Style</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Tone:</span>
                            <span className="font-medium">{styleAnalysis.styleProfile.toneDescription}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vocabulary:</span>
                            <span className="font-medium capitalize">{styleAnalysis.styleProfile.vocabularyLevel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Structure:</span>
                            <span className="font-medium capitalize">{styleAnalysis.styleProfile.sentenceStructure}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pacing:</span>
                            <span className="font-medium capitalize">{styleAnalysis.styleProfile.pacingPattern}</span>
                          </div>
                        </div>
                      </div>

                      {/* Technical Analysis */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Technical Metrics</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Avg Sentence:</span>
                            <span className="font-medium">{styleAnalysis.styleProfile.avgSentenceLength || 12} words</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Reading Time:</span>
                            <span className="font-medium">{styleAnalysis.styleProfile.readingTimeMinutes || 8} min</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Questions/Para:</span>
                            <span className="font-medium">{styleAnalysis.styleProfile.questionFrequency || 1.2}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Personal Pronouns:</span>
                            <span className="font-medium">{styleAnalysis.styleProfile.personalPronouns || 8.5}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Psychological Profile */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Psychological Profile</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Authority Level:</span>
                            <span className="font-medium capitalize">{styleAnalysis.styleProfile.authorityLevel || "High"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Energy Level:</span>
                            <span className="font-medium capitalize">{styleAnalysis.styleProfile.energyLevel || "Moderate"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Authenticity:</span>
                            <span className="font-medium">{styleAnalysis.styleProfile.authenticityMarkers || 5} markers</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sentiment:</span>
                            <span className="font-medium">
                              {(styleAnalysis.styleProfile.sentimentScore || 0.3) > 0 ? "Positive" : "Neutral"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signature Elements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {styleAnalysis.styleProfile.humorTypes.length > 0 && (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <h5 className="font-medium mb-2 text-green-800 dark:text-green-200">Humor Patterns</h5>
                        <div className="flex flex-wrap gap-2">
                          {styleAnalysis.styleProfile.humorTypes.map((humor, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                              {humor}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {styleAnalysis.styleProfile.catchphrases.length > 0 && (
                      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <h5 className="font-medium mb-2 text-purple-800 dark:text-purple-200">Signature Phrases</h5>
                        <div className="flex flex-wrap gap-2">
                          {styleAnalysis.styleProfile.catchphrases.slice(0, 4).map((phrase, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                              "{phrase}"
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Processing Info */}
                  {styleAnalysis.processingDetails && (
                    <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded border-l-4 border-blue-500">
                      ✨ Analysis completed in {styleAnalysis.processingDetails.processingTimeMs}ms • 
                      {styleAnalysis.processingDetails.linguisticFeatures} linguistic features identified • 
                      Processed at {new Date(styleAnalysis.processingDetails.analyzedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Script Generation</CardTitle>
          <CardDescription>
            Configure your new script
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Video Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., How to Start a YouTube Channel in 2024"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isGenerating || !styleAnalysis}
            />
            <p className="text-sm text-muted-foreground">
              Provide a clear, descriptive topic for the script you want to generate
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Script Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short (2-3 minutes)</SelectItem>
                <SelectItem value="medium">Medium (5-8 minutes)</SelectItem>
                <SelectItem value="long">Long (10-15 minutes)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any specific requirements or focus areas..."
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              disabled={isGenerating || !styleAnalysis}
              rows={3}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckIcon className="w-4 h-4" />
              <AlertDescription>
                Script generated successfully!
              </AlertDescription>
            </Alert>
          )}

          {!styleAnalysis && transcript && (
            <Alert>
              <SparklesIcon className="w-4 h-4" />
              <AlertDescription>
                Analyzing writing style... This may take a moment.
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating || !styleAnalysis}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                Generating Script...
              </>
            ) : (
              <>
                <PenToolIcon className="w-4 h-4 mr-2" />
                Generate Script
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Script Display */}
      {generatedScript && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Script</CardTitle>
            <CardDescription>
              Your script in the analyzed style
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={generatedScript}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button
                onClick={downloadScript}
                variant="outline"
                size="sm"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/dashboard/youtube/refine">
              <Button variant="outline" className="w-full">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Refine Existing Script
              </Button>
            </Link>
            <Link to="/dashboard/youtube/library">
              <Button variant="outline" className="w-full">
                View Script Library
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
