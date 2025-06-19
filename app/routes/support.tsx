import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Users, 
  Mail, 
  FileText,
  ChevronRight,
  Headphones,
  Clock,
  Zap
} from "lucide-react";

export function meta() {
  return [
    { title: "Support - YTCreator" },
    { name: "description", content: "Get help with YTCreator. Find answers, contact support, and join our community." },
  ];
}

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-lg font-semibold">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold">YT</span>
              </div>
              <span>YTCreator</span>
            </Link>
            <Button asChild variant="outline">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Headphones className="w-4 h-4 mr-2" />
            Support Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Can We <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Help You?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get the support you need to create viral YouTube scripts and grow your channel.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/help">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Help Center</CardTitle>
                    <CardDescription>Find answers to common questions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Browse FAQs and guides</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </div>
              </CardContent>
            </Link>
          </Card>          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <a href="mailto:hello@ytcreator.me?subject=YTCreator Support Request">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Contact Support</CardTitle>
                    <CardDescription>Get personalized help from our team</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Response within 24 hours</span>
                </div>
              </CardContent>
            </a>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/tutorials">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Video Tutorials</CardTitle>
                    <CardDescription>Learn with step-by-step videos</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Watch and learn</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Popular Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Popular Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-500" />
                  Quick Start Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get up and running with YTCreator in under 5 minutes. Learn how to create your first viral script.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/help#quick-start">
                    Read Guide <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Join Our Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Connect with other creators, share tips, and get community support on Reddit.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/community">
                    Join Community <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you succeed with YTCreator.
          </p>          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="mailto:hello@ytcreator.me?subject=YTCreator Support Request">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/help">
                <FileText className="w-4 h-4 mr-2" />
                Browse Help Center
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
