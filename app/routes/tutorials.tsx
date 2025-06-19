import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Play, 
  Clock, 
  ArrowLeft,
  ExternalLink,
  Youtube,
  Zap,
  Settings,
  BookOpen,
  Users,
  Star
} from "lucide-react";

export function meta() {
  return [
    { title: "Video Tutorials - YTCreator" },
    { name: "description", content: "Learn how to use YTCreator with step-by-step video tutorials." },
  ];
}

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/support">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Support
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <Link to="/" className="flex items-center space-x-2 text-lg font-semibold">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold">YT</span>
                </div>
                <span>YTCreator</span>
              </Link>
            </div>
            <Button asChild variant="outline">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Play className="w-4 h-4 mr-2" />
            Video Tutorials
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Learn with <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Step-by-Step Videos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch our comprehensive video tutorials to master YTCreator and start creating viral YouTube scripts like a pro.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-12">
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <Youtube className="w-5 h-5" />
                Fresh Content Coming Soon!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                We're currently creating comprehensive video tutorials for YTCreator. Our YouTube channel will feature:
              </p>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Complete beginner's guide to YTCreator
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Advanced script customization techniques
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Creator style analysis breakdowns
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  YouTube optimization strategies
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <a 
                    href="https://www.youtube.com/@SkynticSA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Subscribe to Our Channel
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Planned Tutorial Categories */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Getting Started</CardTitle>
                  <CardDescription>5 videos • ~20 minutes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn the basics of YTCreator and create your first viral script in under 5 minutes.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Account setup and dashboard tour</li>
                <li>• Your first script generation</li>
                <li>• Understanding creator styles</li>
                <li>• Basic editing and customization</li>
                <li>• Exporting and organizing scripts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Advanced Features</CardTitle>
                  <CardDescription>8 videos • ~35 minutes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Master advanced techniques for creating professional-grade scripts.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Custom style training</li>
                <li>• Script refinement techniques</li>
                <li>• Batch script generation</li>
                <li>• Team collaboration features</li>
                <li>• Advanced export options</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Creator Strategies</CardTitle>
                  <CardDescription>6 videos • ~25 minutes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn proven strategies from top YouTube creators and how to adapt them.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Analyzing viral video patterns</li>
                <li>• Hook creation masterclass</li>
                <li>• Storytelling frameworks</li>
                <li>• Engagement optimization</li>
                <li>• Niche-specific strategies</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Learning Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Learn While You Wait</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  Written Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Check out our comprehensive written documentation and step-by-step guides.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/help">
                    Browse Help Center
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Community Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join our community to learn from other creators and share your experiences.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/community">
                    Join Community
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* YouTube Channel Promotion */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-2xl">Don't Miss Our Launch!</CardTitle>
              <CardDescription className="text-lg">
                Be the first to watch our video tutorials when they go live
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Subscribe to our YouTube channel and turn on notifications to get instant access to new tutorials, 
                creator insights, and YouTube optimization strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                  <a 
                    href="https://www.youtube.com/@SkynticSA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Youtube className="w-5 h-5 mr-2" />
                    Subscribe Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/dashboard">
                    Start Creating Scripts
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
