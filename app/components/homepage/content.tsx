import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "~/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { 
  ChevronRight, 
  Youtube, 
  TrendingUp, 
  Users, 
  Clock, 
  Zap, 
  Copy, 
  Brain,
  PlayCircle,
  Eye,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Video,
  Mic,
  FileText,
  Wand2,
  Target,
  BarChart3,
  Lightbulb,
  Shield,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router";

export default function ContentSection() {
  return (
    <>
      {/* Problem Section */}
      <section id="problem" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <Badge variant="destructive" className="px-4 py-2 mb-6">
              <Clock className="w-4 h-4 mr-2" />
              The YouTube Creator Struggle
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tired of <span className="text-red-500">Generic AI Scripts</span> That Kill Your Views?
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-4">                <h3 className="text-2xl font-bold text-red-500">❌ What Other AI Tools Give You:</h3>
                <ul className="space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Boring, robotic scripts that sound like everyone else</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Generic content that doesn't match your niche</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Scripts that feel obviously AI-generated to viewers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Zero personality or unique voice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Hours wasted rewriting and editing bland content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Low view counts and poor audience retention</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">                <h3 className="text-2xl font-bold text-green-500">✅ What YTCreator Gives You:</h3>
                <ul className="space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Scripts that sound exactly like your favorite creators</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Clone any creator's style from any niche instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Authentic, engaging content that hooks viewers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Unique personality that stands out from the crowd</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>10x faster content creation - ready to publish scripts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Higher engagement and viral potential for every video</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Interactive Features Section */}
      <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-muted/20 to-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Advanced AI Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Only Tool You Need to{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Dominate YouTube
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From analyzing viral creators to generating scripts that get views - discover how YTCreator transforms your content creation workflow.
            </p>
          </div>

          {/* Interactive Tabs for Features */}
          <Tabs defaultValue="analyze" className="w-full mb-16">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="analyze" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Analyze
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="optimize" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Optimize
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyze" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">AI-Powered Style Analysis</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our advanced AI dissects any creator's unique style, from their hooks to their storytelling patterns.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <InteractiveFeatureCard
                  icon={<Youtube className="w-8 h-8 text-red-500" />}
                  title="Any Creator, Any Niche"
                  description="Analyze videos from gaming, finance, cooking, beauty, or any other niche"
                  hoverContent="Works with MrBeast, Emma Chamberlain, PewDiePie, and 10M+ other creators"
                  stats="10M+ creators analyzed"
                />
                <InteractiveFeatureCard
                  icon={<Mic className="w-8 h-8 text-blue-500" />}
                  title="Voice & Tone Detection"
                  description="Identifies personality traits, energy levels, and speaking patterns"
                  hoverContent="Detects humor style, enthusiasm level, pacing, and emotional triggers"
                  stats="99% accuracy rate"
                />
                <InteractiveFeatureCard
                  icon={<FileText className="w-8 h-8 text-green-500" />}
                  title="Structure Mapping"
                  description="Breaks down their video structure, hooks, and storytelling flow"
                  hoverContent="Maps intro hooks, transition phrases, call-to-actions, and conclusion styles"
                  stats="12 key elements tracked"
                />
              </div>
            </TabsContent>

            <TabsContent value="generate" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Unlimited Script Generation</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Generate authentic scripts that sound exactly like your favorite creators, but about YOUR topics.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <InteractiveFeatureCard
                  icon={<Copy className="w-8 h-8 text-purple-500" />}
                  title="Perfect Style Cloning"
                  description="Scripts that capture their exact voice, energy, and personality"
                  hoverContent="Includes their catchphrases, speaking rhythm, and signature expressions"
                  stats="98% style accuracy"
                />
                <InteractiveFeatureCard
                  icon={<Lightbulb className="w-8 h-8 text-yellow-500" />}
                  title="Your Ideas, Their Voice"
                  description="Generate content about any topic in their unique style"
                  hoverContent="From productivity tips to product reviews - any topic becomes engaging"
                  stats="Unlimited topics"
                />
                <InteractiveFeatureCard
                  icon={<Video className="w-8 h-8 text-orange-500" />}
                  title="Multi-Format Support"
                  description="Perfect for long-form, shorts, podcasts, and social media"
                  hoverContent="Automatically adjusts length and format while maintaining style consistency"
                  stats="All formats supported"
                />
              </div>
            </TabsContent>

            <TabsContent value="optimize" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">Viral Content Optimization</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Leverage proven viral patterns and optimize your content for maximum engagement and reach.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <InteractiveFeatureCard
                  icon={<TrendingUp className="w-8 h-8 text-green-500" />}
                  title="Viral Hook Templates"
                  description="Extract and apply the exact hooks that made videos go viral"
                  hoverContent="Database of 1000+ proven hooks from videos with 1M+ views"
                  stats="1000+ viral hooks"
                />
                <InteractiveFeatureCard
                  icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
                  title="Engagement Prediction"
                  description="AI predicts which parts of your script will drive the most engagement"
                  hoverContent="Highlights high-retention moments, potential drop-off points, and viral potential"
                  stats="85% prediction accuracy"
                />
                <InteractiveFeatureCard
                  icon={<Shield className="w-8 h-8 text-red-500" />}
                  title="Faceless Channel Ready"
                  description="Optimized specifically for faceless channels and voiceover content"
                  hoverContent="Perfect for explainer videos, tutorials, and documentary-style content"
                  stats="Faceless-optimized"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Advanced Features Accordion */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Advanced Capabilities</h3>
              <p className="text-lg text-muted-foreground">
                Discover the powerful features that set YTCreator apart from generic AI tools.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-purple-500" />
                    How accurate is the style cloning compared to other AI tools?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-4 pt-4">
                    <p>
                      Unlike generic AI that produces robotic, templated content, YTCreator achieves 98% style accuracy by analyzing 12+ unique elements:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Speaking rhythm and pacing patterns</li>
                      <li>Signature phrases and catchwords</li>
                      <li>Emotional tone and energy levels</li>
                      <li>Story structure and transition styles</li>
                      <li>Hook patterns and attention-grabbing techniques</li>
                      <li>Call-to-action styles and positioning</li>
                    </ul>
                    <p className="text-green-600 font-medium">
                      Result: Scripts so authentic, your audience won't know they're AI-generated.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-500" />
                    Can I clone multiple creators for different types of content?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-4 pt-4">
                    <p>
                      Absolutely! Build your personal library of creator styles:
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Educational Content</h4>
                        <p className="text-sm">Clone Veritasium for science topics, Khan Academy for tutorials</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Entertainment</h4>
                        <p className="text-sm">Use MrBeast's style for challenges, Emma Chamberlain for vlogs</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Business Content</h4>
                        <p className="text-sm">Apply Graham Stephan for finance, Gary Vee for motivation</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Faceless Channels</h4>
                        <p className="text-sm">Clone top documentary or explainer channel styles</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    How fast can I generate scripts compared to writing manually?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-4 pt-4">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Manual Writing</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Research: 2-3 hours</li>
                            <li>• Writing: 4-6 hours</li>
                            <li>• Editing: 1-2 hours</li>
                            <li className="font-semibold border-t pt-2 mt-2">Total: 7-11 hours</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">With YTCreator</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Style analysis: 30 seconds</li>
                            <li>• Script generation: 15 seconds</li>
                            <li>• Minor tweaks: 10 minutes</li>
                            <li className="font-semibold border-t pt-2 mt-2">Total: 11 minutes</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-center font-bold text-lg mt-4 text-green-600">
                        🚀 40x faster than manual writing!
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>          <div className="text-center mt-16">
            <Button size="lg" className="px-6 sm:px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all max-w-full" asChild>
              <Link to="/sign-up" className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                <span className="whitespace-nowrap">Start Creating</span>
                <span className="hidden sm:inline whitespace-nowrap">Viral Scripts Now</span>
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </Button>
            <p className="text-muted-foreground mt-4 text-lg">
              Join 25,000+ creators • Start your journey today
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Join 25,000+ Creators Getting Better Results
            </h2>
            
            <div className="grid gap-8 md:grid-cols-4 mb-12">
              <StatCard
                icon={<Eye className="w-8 h-8 text-blue-500" />}
                number="500M+"
                label="Total Views Generated"
              />
              <StatCard
                icon={<ThumbsUp className="w-8 h-8 text-green-500" />}
                number="15M+"
                label="Likes from Our Scripts"
              />
              <StatCard
                icon={<MessageSquare className="w-8 h-8 text-purple-500" />}
                number="2M+"
                label="Engaging Comments"
              />
              <StatCard
                icon={<TrendingUp className="w-8 h-8 text-red-500" />}
                number="300%"
                label="Average CTR Increase"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InteractiveFeatureCard({ 
  icon, 
  title, 
  description, 
  hoverContent,
  stats 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  hoverContent: string;
  stats: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="group cursor-pointer p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl transition-all hover:scale-105">
          <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-lg font-bold mb-3 text-center">{title}</h3>
          <p className="text-muted-foreground text-center mb-4 text-sm leading-relaxed">{description}</p>
          <div className="text-center">
            <Badge variant="secondary" className="text-xs font-medium">
              {stats}
            </Badge>
          </div>
          <div className="text-center mt-3">
            <span className="text-xs text-muted-foreground">Hover for details</span>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {icon}
            <h4 className="font-semibold">{title}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {hoverContent}
          </p>
          <div className="flex items-center justify-between pt-2 border-t">
            <Badge variant="outline" className="text-xs">
              {stats}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span>Proven Results</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  stats 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  stats: string;
}) {
  return (
    <div className="group p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl transition-all hover:scale-105">
      <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
      <p className="text-muted-foreground text-center mb-4 leading-relaxed">{description}</p>
      <div className="text-center">
        <Badge variant="secondary" className="text-xs font-medium">
          {stats}
        </Badge>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  number, 
  label 
}: { 
  icon: React.ReactNode; 
  number: string; 
  label: string;
}) {
  return (
    <div className="text-center space-y-3">
      <div className="flex justify-center">{icon}</div>
      <div className="text-3xl font-bold">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}
