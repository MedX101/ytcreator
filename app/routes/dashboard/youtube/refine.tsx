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
  UploadIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { cleanScriptForReading } from "~/lib/script-utils";

// Function to format analysis text with proper structure
const formatAnalysisText = (text: string) => {
  if (!text) return null;
  
  // Split by double line breaks to get paragraphs, then clean up
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  const elements = [];
  
  paragraphs.forEach((paragraph, index) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return;
    
    // Check for markdown-style headers (***text***, **text**, or #text)
    const boldHeaderMatch = trimmed.match(/^\*\*\*(.+?)\*\*\*/);
    const mediumHeaderMatch = trimmed.match(/^\*\*(.+?)\*\*/);
    const hashHeaderMatch = trimmed.match(/^#+\s*(.+)/);
    
    if (boldHeaderMatch) {
      // Handle ***Header*** - Main section header
      elements.push(
        <div key={`header-${index}`} className="mb-6 mt-4">
          <h3 className="text-lg font-bold text-primary border-b-2 border-primary/20 pb-2">
            {boldHeaderMatch[1].trim()}
          </h3>
        </div>
      );
    } else if (mediumHeaderMatch) {
      // Handle **Subheader** - Subsection header
      elements.push(
        <div key={`subheader-${index}`} className="mb-4 mt-3">
          <h4 className="text-base font-semibold text-foreground underline decoration-primary/40 underline-offset-4">
            {mediumHeaderMatch[1].trim()}
          </h4>
        </div>
      );
    } else if (hashHeaderMatch) {
      // Handle # Header - Alternative header style
      elements.push(
        <div key={`hash-header-${index}`} className="mb-4 mt-3">
          <h4 className="text-base font-semibold text-primary">
            {hashHeaderMatch[1].trim()}
          </h4>
        </div>
      );
    } else {
      // Regular paragraph content
      // Split into sentences for better formatting
      const sentences = trimmed.split(/([.!?]+)/).filter(part => part.trim().length > 0);
      let formattedText = "";
      
      for (let i = 0; i < sentences.length; i += 2) {
        const sentence = sentences[i]?.trim();
        const punctuation = sentences[i + 1] || "";
        if (sentence) {
          formattedText += sentence + punctuation + " ";
        }
      }
      
      // Clean up any remaining markdown and format the text
      const cleanText = formattedText
        .replace(/\*\*\*(.+?)\*\*\*/g, '$1') // Remove any remaining ***
        .replace(/\*\*(.+?)\*\*/g, '$1')    // Remove any remaining **
        .replace(/\*(.+?)\*/g, '$1')        // Remove any remaining *
        .trim();
      
      if (cleanText) {
        elements.push(
          <div key={`content-${index}`} className="mb-4">
            <div className="pl-4 border-l-2 border-muted-foreground/20">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {cleanText}
              </p>
            </div>
          </div>
        );
      }
    }
  });
  
  // If no structured content found, fall back to simple paragraph formatting
  if (elements.length === 0) {
    const simpleText = text.replace(/\*\*\*(.+?)\*\*\*/g, '$1').replace(/\*\*(.+?)\*\*/g, '$1');
    return (
      <div className="space-y-3">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {simpleText}
        </p>
      </div>
    );
  }
  
  return <div className="space-y-2">{elements}</div>;
};

export default function RefinePage() {
  const { userId } = useAuth();
  const [searchParams] = useSearchParams();
  const transcriptId = searchParams.get("transcript");
    const [selectedTranscriptId, setSelectedTranscriptId] = useState(transcriptId || "");
  const [selectedScriptId, setSelectedScriptId] = useState("");
  const [refinementInstructions, setRefinementInstructions] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [refinedScript, setRefinedScript] = useState("");
  const [error, setError] = useState("");  const [success, setSuccess] = useState(false);
  const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);
  // New states for custom script input
  const [useCustomScript, setUseCustomScript] = useState(false);
  const [customScript, setCustomScript] = useState("");  const [useCleanScript, setUseCleanScript] = useState(false);
  const [useAIClean, setUseAIClean] = useState(false);
  const [isAICleaningInProgress, setIsAICleaningInProgress] = useState(false);
  const [aiCleanedScript, setAiCleanedScript] = useState("");
  
  const refineScript = useAction(api.youtube.refineScript);
  const refineCustomScript = useAction(api.youtube.refineCustomScript);
  const analyzeStyle = useAction(api.youtube.analyzeStyle);
  const cleanScriptAction = useAction(api.youtube.cleanScriptWithAI);
  
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
  };  const handleRefine = async () => {
    // For custom script: check if we have custom script and instructions
    // For generated script: check if we have selected script and instructions
    const hasValidInput = useCustomScript 
      ? (customScript.trim() && refinementInstructions.trim())
      : (selectedScriptId && refinementInstructions.trim());
    
    if (!hasValidInput || !userId) return;

    setIsRefining(true);
    setError("");
    setRefinedScript("");
    setSuccess(false);

    try {
      if (useCustomScript) {
        // Use the new custom script refinement action
        const result = await refineCustomScript({
          customScript: customScript.trim(),
          refinementInstructions: refinementInstructions.trim(),
        });

        if (result.script) {
          setRefinedScript(result.script);
          setSuccess(true);
        }
      } else {
        // Original logic for generated scripts
        const result = await refineScript({
          scriptId: selectedScriptId as any,
          refinementInstructions: refinementInstructions.trim(),
        });

        if (result.script) {
          setRefinedScript(result.script);
          setSuccess(true);
        }
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
  const copyToClipboard = (content = refinedScript) => {
    navigator.clipboard.writeText(content);
  };

  const downloadScript = (content = refinedScript, filename = 'refined-script.txt') => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // AI Script Cleaning function
  const handleAIClean = async () => {
    if (!refinedScript.trim()) {
      setError("No script content to clean");
      return;
    }

    setIsAICleaningInProgress(true);
    setError("");
    
    try {
      const result = await cleanScriptAction({ script: refinedScript, useAI: true });
      setAiCleanedScript(result.cleanedScript);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("AI cleaning error:", err);
      setError("Failed to clean script with AI. Please try again.");
    } finally {
      setIsAICleaningInProgress(false);
    }
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
          )}          {selectedTranscript && styleAnalysis && (
            <div className="mt-6 space-y-6">
              {/* Advanced AI Analysis Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-purple-500" />
                    Advanced AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Sophisticated analysis of the creator's unique writing style and patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Processing Details */}
                  {styleAnalysis.processingDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {styleAnalysis.processingDetails.confidenceScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">AI Confidence</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {styleAnalysis.processingDetails.patternsDetected}
                        </div>
                        <div className="text-sm text-muted-foreground">Patterns Detected</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {styleAnalysis.processingDetails.linguisticFeatures}
                        </div>
                        <div className="text-sm text-muted-foreground">Linguistic Features</div>
                      </div>
                    </div>
                  )}

                  {/* Core Style Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {styleAnalysis.styleProfile.wordCount && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold">{styleAnalysis.styleProfile.wordCount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Words</div>
                      </div>
                    )}
                    {styleAnalysis.styleProfile.sentenceCount && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold">{styleAnalysis.styleProfile.sentenceCount}</div>
                        <div className="text-xs text-muted-foreground">Sentences</div>
                      </div>
                    )}
                    {styleAnalysis.styleProfile.complexityScore && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold">{styleAnalysis.styleProfile.complexityScore}%</div>
                        <div className="text-xs text-muted-foreground">Complexity</div>
                      </div>
                    )}
                    {styleAnalysis.styleProfile.readingTimeMinutes && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold">{styleAnalysis.styleProfile.readingTimeMinutes}m</div>
                        <div className="text-xs text-muted-foreground">Read Time</div>
                      </div>
                    )}
                  </div>

                  {/* Style Characteristics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Communication Style</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Tone</span>
                          <span className="text-sm font-medium">{styleAnalysis.styleProfile.toneDescription}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Energy Level</span>
                          <span className="text-sm font-medium">{styleAnalysis.styleProfile.energyLevel || 'Dynamic'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Authority Level</span>
                          <span className="text-sm font-medium">{styleAnalysis.styleProfile.authorityLevel || 'Expert'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Addressing Style</span>
                          <span className="text-sm font-medium">{styleAnalysis.styleProfile.addressingStyle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Writing Mechanics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Vocabulary Level</span>
                          <span className="text-sm font-medium">{styleAnalysis.styleProfile.vocabularyLevel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sentence Structure</span>
                          <span className="text-sm font-medium">{styleAnalysis.styleProfile.sentenceStructure}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Pacing Pattern</span>
                          <span className="text-sm font-medium">{styleAnalysis.styleProfile.pacingPattern}</span>
                        </div>
                        {styleAnalysis.styleProfile.avgSentenceLength && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Avg Sentence Length</span>
                            <span className="text-sm font-medium">{styleAnalysis.styleProfile.avgSentenceLength} words</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Signature Elements */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Signature Elements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {styleAnalysis.styleProfile.catchphrases?.length > 0 && (
                        <div>
                          <div className="text-sm font-medium mb-2">Catchphrases & Key Terms</div>
                          <div className="flex flex-wrap gap-1">
                            {styleAnalysis.styleProfile.catchphrases.slice(0, 6).map((phrase, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {phrase}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {styleAnalysis.styleProfile.transitionWords?.length > 0 && (
                        <div>
                          <div className="text-sm font-medium mb-2">Transition Patterns</div>
                          <div className="flex flex-wrap gap-1">
                            {styleAnalysis.styleProfile.transitionWords.slice(0, 6).map((word, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {styleAnalysis.styleProfile.humorTypes?.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2">Humor & Engagement Style</div>
                        <div className="flex flex-wrap gap-1">
                          {styleAnalysis.styleProfile.humorTypes.map((type, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>                  {/* Detailed Analysis Summary */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">AI Analysis Summary</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
                        className="text-xs"
                      >
                        {isAnalysisExpanded ? (
                          <>
                            <ChevronUpIcon className="w-3 h-3 mr-1" />
                            Collapse
                          </>
                        ) : (
                          <>
                            <ChevronDownIcon className="w-3 h-3 mr-1" />
                            View Full Analysis
                          </>
                        )}
                      </Button>
                    </div>
                      {isAnalysisExpanded && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm leading-relaxed space-y-4">
                          {formatAnalysisText(styleAnalysis.detailedAnalysis)}
                        </div>
                      </div>
                    )}
                    
                    {!isAnalysisExpanded && (
                      <div className="p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                        <p className="text-sm text-muted-foreground text-center">
                          Click "View Full Analysis" to see the complete AI analysis summary
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}          {selectedTranscript && !styleAnalysis && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-purple-500 animate-pulse" />
                    Advanced AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Analyzing the creator's unique writing style and patterns...
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                        <Loader2Icon className="w-8 h-8 text-purple-600 animate-spin" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">AI Analysis in Progress</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Our advanced AI is analyzing linguistic patterns, tone, vocabulary, and writing style...
                        </p>
                      </div>
                      <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {completedTranscripts.length === 0 && (
            <Link to="/dashboard/youtube/transcribe">
              <Button className="w-full">
                Transcribe a Video First
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>      {/* Script Selection */}
      {selectedTranscriptId && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Script Source</CardTitle>
            <CardDescription>
              Select whether to refine a generated script or paste your own script
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Toggle between generated and custom script */}
            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="generated-script"
                  name="script-source"
                  checked={!useCustomScript}
                  onChange={() => setUseCustomScript(false)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="generated-script" className="text-sm font-medium">
                  Refine Generated Script
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="custom-script"
                  name="script-source"
                  checked={useCustomScript}
                  onChange={() => setUseCustomScript(true)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor="custom-script" className="text-sm font-medium">
                  Refine My Own Script
                </label>
              </div>
            </div>

            {/* Generated Script Selection */}
            {!useCustomScript && (
              <>
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
                            {script.inputTitle || "Untitled Script"}
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
                      <span className="font-medium">Topic:</span> {selectedScript.inputTitle}
                    </p>
                    <Textarea
                      value={selectedScript.outputScript?.substring(0, 300) + "..."}
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
              </>
            )}

            {/* Custom Script Input */}
            {useCustomScript && (
              <div className="space-y-2">
                <Label htmlFor="custom-script-input">Paste Your Script Here</Label>
                <Textarea
                  id="custom-script-input"
                  placeholder="Paste your script content here that you want to refine..."
                  value={customScript}
                  onChange={(e) => setCustomScript(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Paste the script content you want to refine using the selected creator's style
                </p>              </div>
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
            )}            <Button
              onClick={handleRefine}
              disabled={
                !refinementInstructions.trim() || 
                isRefining || 
                !styleAnalysis ||
                (useCustomScript ? !customScript.trim() : !selectedScriptId)
              }
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
      )}      {/* Refined Script Display */}
      {refinedScript && (
        <Card>
          <CardHeader>
            <CardTitle>Refined Script</CardTitle>
            <CardDescription>
              Your script transformed to match the reference style
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">            {/* Script Cleaning Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="clean-refined-script-toggle"
                  checked={useCleanScript}
                  onChange={(e) => setUseCleanScript(e.target.checked)}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="clean-refined-script-toggle" className="text-sm font-medium cursor-pointer">
                  Basic clean (removes timestamps, symbols)
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <input
                  type="checkbox"
                  id="ai-clean-script-toggle"
                  checked={useAIClean}
                  onChange={(e) => setUseAIClean(e.target.checked)}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="ai-clean-script-toggle" className="text-sm font-medium cursor-pointer flex items-center">
                  <SparklesIcon className="w-4 h-4 mr-1 text-purple-600" />
                  AI Enhanced Clean (intelligent cleaning for perfect voice-over)
                </Label>
                {useAIClean && (
                  <Button
                    onClick={handleAIClean}
                    disabled={isAICleaningInProgress}
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                  >
                    {isAICleaningInProgress ? (
                      <>
                        <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                        Cleaning...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="w-4 h-4 mr-2" />
                        Clean with AI
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
              <Textarea
              value={
                useAIClean && aiCleanedScript ? aiCleanedScript :
                useCleanScript ? cleanScriptForReading(refinedScript) : 
                refinedScript
              }
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex gap-2">              <Button
                onClick={() => {
                  const scriptContent = 
                    useAIClean && aiCleanedScript ? aiCleanedScript :
                    useCleanScript ? cleanScriptForReading(refinedScript) : 
                    refinedScript;
                  copyToClipboard(scriptContent);
                }}
                variant="outline"
                size="sm"
                title={
                  useAIClean && aiCleanedScript ? "Copy AI-Cleaned Script (Premium quality)" :
                  useCleanScript ? "Copy Clean Script (AI voice-over ready)" : 
                  "Copy Original Script"
                }
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>              <Button
                onClick={() => {
                  const scriptContent = 
                    useAIClean && aiCleanedScript ? aiCleanedScript :
                    useCleanScript ? cleanScriptForReading(refinedScript) : 
                    refinedScript;
                  const filename = `refined-script${useAIClean && aiCleanedScript ? '_ai-clean' : useCleanScript ? '_clean' : ''}.txt`;
                  downloadScript(scriptContent, filename);
                }}
                variant="outline"
                size="sm"
                title={
                  useAIClean && aiCleanedScript ? "Download AI-Cleaned Script (Premium quality)" :
                  useCleanScript ? "Download Clean Script (AI voice-over ready)" : 
                  "Download Original Script"
                }
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download
              </Button>            </div>
            {useCleanScript && !useAIClean && (
              <div className="text-xs text-muted-foreground p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <span className="font-medium">Basic clean mode:</span> Timestamps, symbols, and formatting removed for AI voice-over.
              </div>
            )}
            {useAIClean && (
              <div className="text-xs text-muted-foreground p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded border border-purple-200 dark:border-purple-800">
                <div className="flex items-center mb-2">
                  <SparklesIcon className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">AI Enhanced Cleaning:</span>
                </div>
                <ul className="text-xs space-y-1 ml-6">
                  <li>• Intelligent context understanding</li>
                  <li>• Natural human speech flow</li>
                  <li>• Perfect grammar and punctuation</li>
                  <li>• Preserves conversational tone</li>
                  <li>• Optimized for AI voice-over</li>
                </ul>
                {!aiCleanedScript && (
                  <div className="mt-2 text-orange-600 dark:text-orange-400">
                    Click "Clean with AI" to generate the enhanced version
                  </div>
                )}
              </div>
            )}
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
