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
  
  const [title, setTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const analyzeStyle = useAction(api.youtube.analyzeScriptStyle);
  const generateScript = useAction(api.youtube.generateScript);
  
  const transcript = useQuery(
    api.youtube.getTranscript,
    transcriptId ? { transcriptId: transcriptId as any } : "skip"
  );
  
  const styleAnalysis = useQuery(
    api.youtube.getTranscriptStyleAnalysis,
    transcriptId ? { transcriptId: transcriptId as any } : "skip"
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
        userId,
      });
    } catch (err: any) {
      setError(err.message || "Failed to analyze style");
    }
  };

  const handleGenerate = async () => {
    if (!title.trim() || !styleAnalysis?._id || !userId) return;

    setIsGenerating(true);
    setError("");
    setGeneratedScript("");
    setSuccess(false);

    try {
      const result = await generateScript({
        styleAnalysisId: styleAnalysis._id,
        title: title.trim(),
        userId,
      });

      if (result.success) {
        setGeneratedScript("Script generated successfully! Check your library for the result.");
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
    a.download = `${title || 'script'}.txt`;
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
      </div>

      {/* Reference Info */}
      {transcript && (
        <Card>
          <CardHeader>
            <CardTitle>Reference Style</CardTitle>
            <CardDescription>
              Using style analysis from this video
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">
                {transcript.title || "Untitled Video"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {transcript.youtubeUrl}
              </p>
              {styleAnalysis && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Style Profile:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Tone:</span> {styleAnalysis.styleProfile.toneDescription}
                    </div>
                    <div>
                      <span className="font-medium">Vocabulary:</span> {styleAnalysis.styleProfile.vocabularyLevel}
                    </div>
                    <div>
                      <span className="font-medium">Structure:</span> {styleAnalysis.styleProfile.sentenceStructure}
                    </div>
                    <div>
                      <span className="font-medium">Pacing:</span> {styleAnalysis.styleProfile.pacingPattern}
                    </div>
                  </div>
                  {styleAnalysis.styleProfile.humorTypes.length > 0 && (
                    <div className="mt-2">
                      <span className="font-medium">Humor Types:</span> {styleAnalysis.styleProfile.humorTypes.join(", ")}
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
            Enter a title or topic for your new script
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Video Title or Topic</Label>
            <Input
              id="title"
              placeholder="e.g., How to Start a YouTube Channel in 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isGenerating || !styleAnalysis}
            />
            <p className="text-sm text-muted-foreground">
              Provide a clear, descriptive title for the script you want to generate
            </p>
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
                Script generated successfully! You can find it in your script library.
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
            disabled={!title.trim() || isGenerating || !styleAnalysis}
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
