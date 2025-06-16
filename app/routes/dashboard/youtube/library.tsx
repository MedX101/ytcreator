"use client";
import { useState } from "react";
import { useAuth } from "@clerk/react-router";
import { useQuery } from "convex/react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { 
  VideoIcon, 
  FileTextIcon, 
  ArrowLeftIcon,
  ExternalLinkIcon,
  CopyIcon,
  DownloadIcon,
  SearchIcon,
  CalendarIcon,
  PlusIcon
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";

export default function LibraryPage() {
  const { userId } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const userTranscripts = useQuery(api.youtube.getUserTranscripts);
  const userScripts = useQuery(api.youtube.getUserScripts);

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to access your script library.</p>
      </div>
    );
  }

  const filteredTranscripts = userTranscripts?.filter(transcript =>
    transcript.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transcript.youtubeUrl.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredScripts = userScripts?.filter(script =>
    script.inputTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.outputScript.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadText = (content: string, filename: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/youtube">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to YouTube Tools
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Script Library</h1>
          <p className="text-muted-foreground">
            Manage all your transcripts and generated scripts
          </p>
        </div>
        <Link to="/dashboard/youtube/transcribe">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Transcript
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search transcripts and scripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="transcripts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transcripts" className="flex items-center gap-2">
            <VideoIcon className="w-4 h-4" />
            Transcripts ({filteredTranscripts.length})
          </TabsTrigger>
          <TabsTrigger value="scripts" className="flex items-center gap-2">
            <FileTextIcon className="w-4 h-4" />
            Generated Scripts ({filteredScripts.length})
          </TabsTrigger>
        </TabsList>

        {/* Transcripts Tab */}
        <TabsContent value="transcripts" className="space-y-4">
          {filteredTranscripts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <VideoIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No transcripts found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Start by transcribing a YouTube video"}
                </p>
                {!searchTerm && (
                  <Link to="/dashboard/youtube/transcribe">
                    <Button>
                      <VideoIcon className="w-4 h-4 mr-2" />
                      Transcribe Video
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredTranscripts.map((transcript) => (
                <Card key={transcript._id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-lg">
                          {transcript.title || "Untitled Video"}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(transcript._creationTime)}
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(transcript.status)}>
                            {transcript.status}
                          </Badge>
                          <a 
                            href={transcript.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            View Video
                            <ExternalLinkIcon className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => copyToClipboard(transcript.originalScript)}
                          variant="outline"
                          size="sm"
                          disabled={!transcript.originalScript}
                        >
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => downloadText(
                            transcript.originalScript, 
                            `${transcript.title || 'transcript'}.txt`
                          )}
                          variant="outline"
                          size="sm"
                          disabled={!transcript.originalScript}
                        >
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {transcript.originalScript && (
                    <CardContent>
                      <div className="bg-muted/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                        <p className="text-sm whitespace-pre-wrap">
                          {transcript.originalScript.substring(0, 300)}
                          {transcript.originalScript.length > 300 && "..."}
                        </p>
                      </div>
                      {transcript.status === 'completed' && (
                        <div className="flex gap-2 mt-4">
                          <Link to={`/dashboard/youtube/generate?transcript=${transcript._id}`}>
                            <Button size="sm">
                              Generate New Script
                            </Button>
                          </Link>
                          <Link to={`/dashboard/youtube/refine?transcript=${transcript._id}`}>
                            <Button size="sm" variant="outline">
                              Refine Existing Script
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Generated Scripts Tab */}
        <TabsContent value="scripts" className="space-y-4">
          {filteredScripts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileTextIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No scripts found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Generate your first script from a transcribed video"}
                </p>
                {!searchTerm && (
                  <Link to="/dashboard/youtube/generate">
                    <Button>
                      <FileTextIcon className="w-4 h-4 mr-2" />
                      Generate Script
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredScripts.map((script) => (
                <Card key={script._id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-lg">
                          {script.inputTitle || (script.type === 'refined' ? 'Refined Script' : 'Generated Script')}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(script._creationTime)}
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(script.status)}>
                            {script.status}
                          </Badge>
                          <Badge variant="outline">
                            {script.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => copyToClipboard(script.outputScript)}
                          variant="outline"
                          size="sm"
                          disabled={!script.outputScript}
                        >
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => downloadText(
                            script.outputScript, 
                            `${script.inputTitle || 'script'}.txt`
                          )}
                          variant="outline"
                          size="sm"
                          disabled={!script.outputScript}
                        >
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {script.outputScript && (
                    <CardContent>
                      <div className="bg-muted/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                        <p className="text-sm whitespace-pre-wrap">
                          {script.outputScript.substring(0, 300)}
                          {script.outputScript.length > 300 && "..."}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}