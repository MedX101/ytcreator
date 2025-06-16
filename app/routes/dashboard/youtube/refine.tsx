"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react-router";
import { useAction, useQuery } from "convex/react";
import { Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
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
  SparklesIcon, 
  Loader2Icon, 
  CheckIcon, 
  ArrowLeftIcon,
  CopyIcon,
  DownloadIcon,
  UploadIcon
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";

export default function RefinePage() {
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const transcriptId = searchParams.get("transcript");
  
  const [selectedTranscriptId, setSelectedTranscriptId] = useState(transcriptId || "");
  const [selectedScriptId, setSelectedScriptId] = useState("");
  const [refinementInstructions, setRefinementInstructions] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [refinedScript, setRefinedScript] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const refineScript = useAction(api.youtube.refineScript);
  const analyzeStyle = useAction(api.youtube.analyzeStyle);
  
  const userTranscripts = useQuery(api.youtube.getUserTranscripts);
  const userScripts = useQuery(api.youtube.getUserScripts);
  const styleAnalyses = useQuery(api.youtube.getUserStyleAnalyses);
  
  const selectedTranscript = useQuery(
    api.youtube.getTranscript,
    selectedTranscriptId ? { id: selectedTranscriptId as any } : "skip"
  );
  
  const selectedScript = useQuery(
    api.youtube.getScript,
    selectedScriptId ? { id: selectedScriptId as any } : "skip"
  );
  
  // Find style analysis for the selected transcript
  const styleAnalysis = styleAnalyses?.find(
    analysis => analysis.transcriptId === selectedTranscriptId
  );

  useEffect(() => {
    if (selectedTranscript && !styleAnalysis && userId) {
      // Auto-analyze style if not done yet
      handleAnalyzeStyle();
    }
  }, [selectedTranscript, styleAnalysis, userId]);

  const handleAnalyzeStyle = async () => {
    if (!selectedTranscriptId || !userId) return;

    try {
      await analyzeStyle({
        transcriptId: selectedTranscriptId as any,
      });
    } catch (err: any) {
      setError(err.message || "Failed to analyze style");
    }
  };

  const handleRefine = async () => {
    if (!refinementInstructions.trim() || !selectedScriptId || !userId) return;

    setIsRefining(true);
    setError("");
    setRefinedScript("");
    setSuccess(false);

    try {
      const result = await refineScript({
        scriptId: selectedScriptId as any,
        refinementInstructions: refinementInstructions.trim(),
      });

      if (result.script) {
        setRefinedScript(result.script);
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to refine script");
    } finally {
      setIsRefining(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setRefinementInstructions(content);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refinedScript);
  };

  const downloadScript = () => {
    const blob = new Blob([refinedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'refined-script.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const completedTranscripts = userTranscripts?.filter(t => t.status === 'completed') || [];
  const availableScripts = userScripts || [];

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
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
          <SparklesIcon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold">Refine Existing Script</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transform your existing script to match any YouTube creator's writing style. 
          Your content will be rewritten to perfectly replicate their voice and personality.
        </p>
      </div>

      {/* Style Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Reference Style</CardTitle>
          <CardDescription>
            Select a transcribed video to use as your style reference
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedTranscripts.length === 0 ? (
            <Alert>
              <AlertDescription>
                No transcribed videos found. You need to transcribe a video first to use as a style reference.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="style-select">Reference Video</Label>
              <Select
                value={selectedTranscriptId}
                onValueChange={setSelectedTranscriptId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a transcribed video for style reference" />
                </SelectTrigger>
                <SelectContent>
                  {completedTranscripts.map((transcript) => (
                    <SelectItem key={transcript._id} value={transcript._id}>
                      {transcript.title || "Untitled Video"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedTranscript && styleAnalysis && (
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

          {selectedTranscript && !styleAnalysis && (
            <Alert>
              <SparklesIcon className="w-4 h-4" />
              <AlertDescription>
                Analyzing writing style... This may take a moment.
              </AlertDescription>
            </Alert>
          )}

          {completedTranscripts.length === 0 && (
            <Link to="/dashboard/youtube/transcribe">
              <Button className="w-full">
                Transcribe a Video First
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {/* Script Selection */}
      {selectedTranscriptId && (
        <Card>
          <CardHeader>
            <CardTitle>Select Script to Refine</CardTitle>
            <CardDescription>
              Choose an existing script to refine with the selected style
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableScripts.length === 0 ? (
              <Alert>
                <AlertDescription>
                  No scripts found. Generate a script first to refine it.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="script-select">Script to Refine</Label>
                <Select
                  value={selectedScriptId}
                  onValueChange={setSelectedScriptId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a script to refine" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableScripts.map((script) => (
                      <SelectItem key={script._id} value={script._id}>
                        {script.topic || "Untitled Script"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedScript && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Current Script:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Topic:</span> {selectedScript.topic}
                </p>
                <Textarea
                  value={selectedScript.content?.substring(0, 300) + "..."}
                  readOnly
                  className="text-sm"
                  rows={3}
                />
              </div>
            )}

            {availableScripts.length === 0 && (
              <Link to="/dashboard/youtube/generate">
                <Button className="w-full">
                  Generate a Script First
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      {/* Refinement Instructions */}
      {selectedScriptId && (
        <Card>
          <CardHeader>
            <CardTitle>Refinement Instructions</CardTitle>
            <CardDescription>
              Describe how you want the script to be refined
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="refinement-instructions">Instructions</Label>
              <Textarea
                id="refinement-instructions"
                placeholder="e.g., Make it more conversational, add more humor, focus on beginner-friendly language..."
                value={refinementInstructions}
                onChange={(e) => setRefinementInstructions(e.target.value)}
                disabled={isRefining}
                className="min-h-[150px]"
              />
              <p className="text-sm text-muted-foreground">
                Provide specific instructions on how you want the script to be improved or modified
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">Or upload instructions from file:</div>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Upload .txt file
                    </span>
                  </Button>
                </Label>
              </div>
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
                  Script refined successfully!
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleRefine}
              disabled={!refinementInstructions.trim() || isRefining || !styleAnalysis}
              className="w-full"
              size="lg"
            >
              {isRefining ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Refining Script...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  Refine Script
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Refined Script Display */}
      {refinedScript && (
        <Card>
          <CardHeader>
            <CardTitle>Refined Script</CardTitle>
            <CardDescription>
              Your script transformed to match the reference style
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={refinedScript}
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

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>How Script Refinement Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">What gets refined:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Writing tone and personality</li>
                <li>• Vocabulary level and word choice</li>
                <li>• Sentence structure and pacing</li>
                <li>• Humor style and catchphrases</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">What stays the same:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Core message and content</li>
                <li>• Key information and facts</li>
                <li>• Overall structure and flow</li>
                <li>• Essential meaning and intent</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}