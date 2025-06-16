"use client";
import { useAuth } from "@clerk/react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { 
  VideoIcon, 
  FileTextIcon, 
  PenToolIcon, 
  LibraryIcon,
  ArrowRightIcon,
  SparklesIcon
} from "lucide-react";

export default function YouTubeDashboard() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to access the YouTube Script tools.</p>
      </div>
    );
  }

  const features = [
    {
      title: "Transcribe Video",
      description: "Extract scripts from YouTube videos with AI-powered transcription",
      icon: VideoIcon,
      href: "/dashboard/youtube/transcribe",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Generate Script", 
      description: "Create new scripts that match your reference style perfectly",
      icon: PenToolIcon,
      href: "/dashboard/youtube/generate",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "Refine Script",
      description: "Transform existing scripts to match your desired writing style",
      icon: SparklesIcon, 
      href: "/dashboard/youtube/refine",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Script Library",
      description: "View and manage all your transcripts and generated scripts",
      icon: LibraryIcon,
      href: "/dashboard/youtube/library", 
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          YouTube Script Creator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transcribe videos, analyze writing styles, and create perfectly matched scripts 
          for your YouTube content with AI-powered precision.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20"
          >
            <CardHeader className="pb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color} mb-3`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={feature.href}>
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  Get Started
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Process Overview */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">How It Works</CardTitle>
          <CardDescription>
            Create scripts that perfectly match any YouTube creator's style in 3 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold">Transcribe & Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Upload a YouTube URL and let AI transcribe the video and analyze the writing style in detail
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold">Choose Your Method</h3>
              <p className="text-sm text-muted-foreground">
                Generate a new script from a title, or refine your existing script to match the style
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold">Perfect Match</h3>
              <p className="text-sm text-muted-foreground">
                Get a script that perfectly replicates the original creator's voice, tone, and style
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-bold">Ready to Create Amazing Scripts?</h2>
        <p className="text-muted-foreground">
          Start by transcribing a YouTube video to analyze its unique writing style
        </p>
        <Link to="/dashboard/youtube/transcribe">
          <Button size="lg" className="text-lg px-8 py-3">
            Start Transcribing
            <VideoIcon className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
