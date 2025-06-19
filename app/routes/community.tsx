import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  ArrowLeft,
  ExternalLink,
  Heart,
  Star,
  Lightbulb,
  HelpCircle,
  Trophy,
  Zap,
  Share
} from "lucide-react";

export function meta() {
  return [
    { title: "Community - YTCreator" },
    { name: "description", content: "Join the YTCreator community on Reddit. Connect with other creators and share your success stories." },
  ];
}

export default function Community() {
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
            <Users className="w-4 h-4 mr-2" />
            Community
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Creator Community</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow YouTube creators, share your success stories, get feedback, and discover new strategies together.
          </p>
        </div>

        {/* Reddit Community */}
        <div className="mb-16">
          <Card className="border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <MessageSquare className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <CardTitle className="text-2xl">r/YouTubers Community</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of creators sharing tips, tricks, and success stories
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're building our presence in the popular r/YouTubers subreddit where creators gather to discuss 
                strategies, share wins, and help each other grow. When you mention YTCreator there, you're not just 
                getting help - you're also introducing other creators to a powerful tool!
              </p>
              <div className="grid gap-4 md:grid-cols-3 mb-8">
                <div className="text-center">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Share Success Stories</h3>
                  <p className="text-sm text-muted-foreground">Celebrate your viral scripts and view count wins</p>
                </div>
                <div className="text-center">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Get Creative Ideas</h3>
                  <p className="text-sm text-muted-foreground">Discover new creator styles and content strategies</p>
                </div>
                <div className="text-center">
                  <HelpCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Community Support</h3>
                  <p className="text-sm text-muted-foreground">Get help from fellow YTCreator users</p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <a 
                  href="https://www.reddit.com/r/YouTubers/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Join r/YouTubers
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Community Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Join Our Community?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Success Stories</CardTitle>
                    <CardDescription>Real results from real creators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See how other creators are using YTCreator to grow their channels, get more views, 
                  and create viral content. Get inspired by their journeys.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Creative Ideas</CardTitle>
                    <CardDescription>Discover new possibilities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn about new creator styles to clone, trending topics to cover, 
                  and creative ways to use YTCreator for your specific niche.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    <Share className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Free Marketing</CardTitle>
                    <CardDescription>Spread the word naturally</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When you share your YTCreator success in the community, you help other creators 
                  discover our tool while building your own reputation as a helpful community member.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Participate */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">How to Get Involved</CardTitle>
              <CardDescription className="text-center">
                Here's how you can make the most of our community presence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Share Your Wins
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Post before/after view count screenshots</li>
                    <li>• Share scripts that performed well</li>
                    <li>• Mention how YTCreator helped you</li>
                    <li>• Use relevant hashtags and flairs</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-500" />
                    Help Others
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Answer questions about YTCreator</li>
                    <li>• Share tips and best practices</li>
                    <li>• Recommend creator styles to try</li>
                    <li>• Provide feedback on scripts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Guidelines */}
        <div className="mb-16">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ Do:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Be helpful and supportive</li>
                    <li>• Share genuine experiences</li>
                    <li>• Follow subreddit rules</li>
                    <li>• Provide value to the community</li>
                    <li>• Use proper flairs and formatting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Don't:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Spam or over-promote</li>
                    <li>• Make exaggerated claims</li>
                    <li>• Break subreddit rules</li>
                    <li>• Be negative or toxic</li>
                    <li>• Share fake results</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Join the Movement?</CardTitle>
              <CardDescription className="text-lg">
                Become part of a growing community of successful YouTube creators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join the conversation, share your success, and help other creators discover the power of YTCreator. 
                Together, we're changing how YouTube content is created.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                  <a 
                    href="https://www.reddit.com/r/YouTubers/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Join r/YouTubers
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/dashboard">
                    <Zap className="w-5 h-5 mr-2" />
                    Create Your First Script
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
