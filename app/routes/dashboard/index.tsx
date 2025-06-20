"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { 
  Plus, 
  Youtube, 
  FileText, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowRight,
  Video,
  Zap,
  Brain,
  PenTool,
  Copy,
  PlayCircle,
  BarChart3,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Sparkles
} from "lucide-react";
import { Link } from "react-router";

export default function Page() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with real data later
  const recentScripts = [
    {
      id: 1,
      title: "10 Mind-Blowing AI Tools That Will Change Your Life",
      creator: "MrBeast Style",
      status: "completed",
      createdAt: "2 hours ago",
      views: "15.2K",
      engagement: "8.5%"
    },
    {
      id: 2,
      title: "Why 99% of People Fail at YouTube (And How to Fix It)",
      creator: "Ali Abdaal Style",
      status: "in-progress",
      createdAt: "5 hours ago",
      views: "8.7K",
      engagement: "12.3%"
    },
    {
      id: 3,
      title: "I Tried Every Productivity Hack for 30 Days",
      creator: "Thomas Frank Style",
      status: "completed",
      createdAt: "1 day ago",
      views: "23.1K",
      engagement: "15.7%"
    }
  ];

  const creators = [
    { name: "MrBeast", style: "High-energy, storytelling", scripts: 12 },
    { name: "Ali Abdaal", style: "Educational, conversational", scripts: 8 },
    { name: "Thomas Frank", style: "Productivity-focused", scripts: 5 },
    { name: "Emma Chamberlain", style: "Casual, authentic", scripts: 3 }
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back! 👋</h1>
          <p className="text-muted-foreground">
            Ready to create your next viral script? Let's turn your ideas into YouTube gold.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
            <Link to="/dashboard/youtube">
              <Plus className="w-4 h-4 mr-2" />
              New Script
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Scripts Created</CardDescription>
              <FileText className="w-4 h-4 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold">28</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12 this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Avg. Engagement</CardDescription>
              <ThumbsUp className="w-4 h-4 text-orange-500" />
            </div>
            <CardTitle className="text-2xl font-bold">12.4%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+2.1% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Views</CardDescription>
              <Eye className="w-4 h-4 text-purple-500" />
            </div>
            <CardTitle className="text-2xl font-bold">284K</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+47K this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Creator Styles</CardDescription>
              <Users className="w-4 h-4 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold">4</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Sparkles className="w-3 h-3" />
              <span>Mastered</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scripts">Recent Scripts</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <CardTitle>Quick Actions</CardTitle>
                </div>
                <CardDescription>
                  Jump into your most common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start h-12">
                  <Link to="/dashboard/youtube">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                        <Youtube className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Create New Script</div>
                        <div className="text-xs text-muted-foreground">Clone any creator's style</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start h-12">
                  <Link to="/dashboard/youtube">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                        <Brain className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Analyze Creator</div>
                        <div className="text-xs text-muted-foreground">Study new writing styles</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start h-12">
                  <Link to="/dashboard/youtube">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <Copy className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Improve Script</div>
                        <div className="text-xs text-muted-foreground">Enhance existing content</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <CardTitle>Recent Activity</CardTitle>
                </div>
                <CardDescription>
                  Your latest script creations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentScripts.slice(0, 3).map((script) => (
                  <div key={script.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`p-1.5 rounded-full ${script.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'}`}>
                      {script.status === 'completed' ? (
                        <FileText className="w-3 h-3 text-green-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{script.title}</p>
                      <p className="text-xs text-muted-foreground">{script.creator} • {script.createdAt}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground">{script.views} views</span>
                        <span className="text-xs text-green-600">{script.engagement} engagement</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link to="/dashboard/youtube">
                    View All Scripts
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Scripts</CardTitle>
                  <CardDescription>
                    All your created scripts and their performance
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link to="/dashboard/youtube">
                    <Plus className="w-4 h-4 mr-2" />
                    New Script
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScripts.map((script) => (
                  <div key={script.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${script.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'}`}>
                        {script.status === 'completed' ? (
                          <PlayCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{script.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{script.creator}</span>
                          <span>•</span>
                          <span>{script.createdAt}</span>
                          <Badge variant={script.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                            {script.status === 'completed' ? 'Ready' : 'Processing'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{script.views}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-green-600">{script.engagement}</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mastered Creator Styles</CardTitle>
                  <CardDescription>
                    YouTube creators whose writing style you've learned
                  </CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link to="/dashboard/youtube">
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze New Creator
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {creators.map((creator, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{creator.name}</h3>
                        <p className="text-sm text-muted-foreground">{creator.style}</p>
                      </div>
                      <Badge variant="secondary">{creator.scripts} scripts</Badge>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <PenTool className="w-3 h-3 mr-2" />
                      Create in {creator.name}'s Style
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
