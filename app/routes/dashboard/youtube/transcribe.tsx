"use client";
import { useState } from "react";
import { useAuth } from "@clerk/react-router";
import { useMutation, useQuery } from "convex/react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { 
  VideoIcon, 
  Loader2Icon, 
  CheckIcon, 
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";

export default function TranscribePage() {
  const { userId } = useAuth();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptResult, setTranscriptResult] = useState<any>(null);
  const [error, setError] = useState("");
  const transcribeVideo = useMutation(api.youtube.transcribeVideo);
  const analyzeStyle = useMutation(api.youtube.analyzeStyle);
  const userTranscripts = useQuery(api.youtube.getUserTranscripts);

  const handleTranscribe = async () => {
    if (!youtubeUrl.trim() || !userId) return;

    setIsTranscribing(true);
    setError("");
    setTranscriptResult(null);

    try {
      // Validate YouTube URL
      const urlPattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
      if (!urlPattern.test(youtubeUrl)) {
        throw new Error("Please enter a valid YouTube URL");
      }

      const result = await transcribeVideo({
        videoUrl: youtubeUrl.trim(),
        // title: "Optional title if you have one" // You can add a title input if needed
      });

      setTranscriptResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to transcribe video");
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleAnalyzeStyle = async () => {
    if (!transcriptResult?.transcriptId || !userId) return;

    try {
      await analyzeStyle({
        transcriptId: transcriptResult.transcriptId,
      });
      
      // Redirect to generate page
      window.location.href = `/dashboard/youtube/generate?transcript=${transcriptResult.transcriptId}`;
    } catch (err: any) {
      setError(err.message || "Failed to analyze style");
    }
  };

  const recentTranscripts = userTranscripts?.slice(0, 3) || [];

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
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <VideoIcon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold">Transcribe YouTube Video</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enter a YouTube URL to extract and analyze the script. AI will transcribe the content 
          and analyze the writing style for perfect replication.
        </p>
      </div>

      {/* Main Transcription Form */}
      <Card>
        <CardHeader>
          <CardTitle>Video Transcription</CardTitle>
          <CardDescription>
            Paste any YouTube URL to get started with AI transcription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              disabled={isTranscribing}
            />
            <p className="text-sm text-muted-foreground">
              Supports youtube.com/watch?v=, youtu.be/, and youtube.com/embed/ URLs
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {transcriptResult && (
            <Alert>
              <CheckIcon className="w-4 h-4" />
              <AlertDescription>
                Video transcribed successfully! Ready to analyze the writing style.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button
              onClick={handleTranscribe}
              disabled={!youtubeUrl.trim() || isTranscribing}
              className="flex-1"
            >
              {isTranscribing ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                  Transcribing...
                </>
              ) : (
                <>
                  <VideoIcon className="w-4 h-4 mr-2" />
                  Transcribe Video
                </>
              )}
            </Button>

            {transcriptResult && (
              <Button
                onClick={handleAnalyzeStyle}
                variant="secondary"
                className="flex-1"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Analyze Style & Continue
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transcripts */}
      {recentTranscripts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transcripts</CardTitle>
            <CardDescription>
              Your recently transcribed videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTranscripts.map((transcript: any) => (
                <div
                  key={transcript._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">
                      {transcript.title || "Untitled Video"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {transcript.youtubeUrl}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transcript.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : transcript.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transcript.status}
                      </span>
                    </div>
                  </div>
                  {transcript.status === 'completed' && (
                    <Link 
                      to={`/dashboard/youtube/generate?transcript=${transcript._id}`}
                    >
                      <Button size="sm" variant="outline">
                        Use This Style
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <Link to="/dashboard/youtube/library">
                <Button variant="ghost" className="w-full">
                  View All Transcripts
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>How Transcription Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">What happens during transcription:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI extracts all spoken content from the video</li>
                <li>• Text is formatted into clean paragraphs</li>
                <li>• No timestamps or sound effects included</li>
                <li>• Natural speech flow is preserved</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Style analysis includes:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Humor types and personality traits</li>
                <li>• Vocabulary level and sentence structure</li>
                <li>• Tone, pacing, and rhythm patterns</li>
                <li>• Catchphrases and transition words</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
