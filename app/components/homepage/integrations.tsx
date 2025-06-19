import { memo } from "react";
import { Link } from "react-router";
import { LogoIcon } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { Navbar } from "./navbar";
import { 
  Play, 
  Sparkles, 
  Zap, 
  Youtube, 
  Mic, 
  PenTool, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Video, 
  Brain, 
  FileText, 
  TrendingUp,
  Star,
  Copy,
  Wand2
} from "lucide-react";

export default function IntegrationsSection({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean; hasActiveSubscription: boolean };
}) {
  return (
    <section id="hero" className="relative">
      <Navbar loaderData={loaderData} />
        {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-red-500/5 dark:from-background dark:via-background/95 dark:to-red-500/10">
        
        {/* Floating Icons Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <Youtube className="w-12 h-12 text-red-500/30" />
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <Sparkles className="w-8 h-8 text-primary/30" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float">
            <Video className="w-10 h-10 text-blue-500/30" />
          </div>
          <div className="absolute bottom-20 right-10 animate-float-delayed">
            <Brain className="w-9 h-9 text-purple-500/30" />
          </div>
          <div className="absolute top-1/2 left-1/4 animate-float">
            <FileText className="w-7 h-7 text-green-500/20" />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-float-delayed">
            <Wand2 className="w-8 h-8 text-orange-500/20" />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-48">
          <div className="text-center space-y-10">            {/* Badge */}
            <div className="flex justify-center">
              <Badge variant="secondary" className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                <Youtube className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">#1 AI Viral Script Writer for YouTube Creators</span>
                <span className="sm:hidden">#1 AI Viral Script Writer</span>
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                Stop Writing{" "}
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent">
                  Boring Scripts
                </span>
                <br />
                <span className="text-4xl sm:text-5xl lg:text-6xl text-muted-foreground">
                  Clone Any Creator's Style
                </span>
              </h1>              <p className="mx-auto max-w-4xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Stop spending hours writing scripts that sound like <strong className="text-foreground">boring robots</strong>. 
                Copy the exact writing style of any viral creator and watch your views explode.
              </p>
            </div>            {/* Sales-Focused Value Props */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-lg text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-background flex items-center justify-center">
                    <PenTool className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-background flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-background flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span><strong>Stop Writing</strong> Boring Scripts</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-500" />
                <span><strong>Start Getting</strong> Real Views</span>
              </div>
              <div className="flex items-center gap-3">
                <Copy className="w-6 h-6 text-purple-500" />
                <span><strong>Clone Any</strong> Viral Creator</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button size="lg" className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all" asChild>
                <Link
                  to={
                    loaderData?.isSignedIn
                      ? loaderData?.hasActiveSubscription
                        ? "/dashboard"
                        : "/pricing"
                      : "/sign-up"
                  }
                  prefetch="viewport"
                >                  <Zap className="w-6 h-6 mr-3" />
                  {loaderData?.isSignedIn
                    ? loaderData?.hasActiveSubscription
                      ? "Start Creating Now"
                      : "Choose Your Plan"
                    : "Get Started Today"}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </Button>
          </div>
          </div>
        </div>
      </div>      {/* What Makes Us Different */}
      <div className="relative bg-gradient-to-b from-muted/20 to-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Why Creators Choose YTCreator
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Not Just Another{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                AI Writing Tool
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We go deeper than generic AI - we capture the subtle nuances that make each creator unique
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <UniqueFeatureCard
              icon={<Brain className="w-12 h-12 text-purple-500" />}
              title="Psychological Pattern Recognition"
              description="Our AI identifies emotional triggers, storytelling arcs, and persuasion techniques used by top creators"
              example="Detects how MrBeast builds suspense before big reveals"
              accent="purple"
            />
            <UniqueFeatureCard
              icon={<Wand2 className="w-12 h-12 text-orange-500" />}
              title="Hook & Retention Mastery"
              description="Extract the exact opening lines, transitions, and retention tactics that keep viewers watching"
              example="Clone Emma Chamberlain's authentic conversational style"
              accent="orange"
            />
            <UniqueFeatureCard
              icon={<TrendingUp className="w-12 h-12 text-green-500" />}
              title="Viral Formula Extraction"
              description="Reverse-engineer what made videos go viral and apply those patterns to your content"
              example="Replicate PewDiePie's comedy timing and energy"
              accent="green"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const UniqueFeatureCard = memo(({
  icon,
  title,
  description,
  example,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
  accent: 'purple' | 'orange' | 'green';
}) => {
  const accentColors = {
    purple: 'border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/20',
    orange: 'border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950/20',
    green: 'border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/20'
  };

  return (
    <div className={cn(
      "text-center space-y-6 p-8 rounded-2xl bg-background/60 border backdrop-blur-sm transition-all hover:shadow-xl hover:scale-105 group",
      accentColors[accent]
    )}>
      <div className="flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <div className="bg-muted/50 rounded-lg p-3 text-sm italic text-muted-foreground border-l-4 border-current">
          Example: {example}
        </div>
      </div>
    </div>
  );
});

const CreatorExample = memo(({
  name,
  style,
  hook,
  views,
}: {
  name: string;
  style: string;
  hook: string;
  views: string;
}) => {
  return (
    <div className="bg-background rounded-xl p-6 border hover:shadow-lg transition-all group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg">{name}</h4>
          <Badge variant="secondary" className="text-xs">{views} views</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{style}</p>
        <div className="bg-muted/50 rounded p-3 text-sm italic">
          "{hook}"
        </div>
        <div className="flex items-center gap-2 text-xs text-green-600">
          <CheckCircle className="w-3 h-3" />
          <span>Style mastered</span>
        </div>
      </div>
    </div>
  );
});

const CreatorNiche = memo(({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-background/50 border border-border/50 backdrop-blur-sm">
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
});

const ProcessCard = memo(({
  step,
  icon,
  title,
  description,
  highlight,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}) => {
  return (
    <div className="relative text-center space-y-6 p-8 rounded-2xl bg-background/60 border border-border/50 backdrop-blur-sm transition-all hover:shadow-xl hover:scale-105 group">
      <div className="absolute -top-4 left-8">
        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 text-sm font-bold">
          Step {step}
        </Badge>
      </div>
      <div className="flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
      <div className="space-y-3">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <div className="text-sm font-semibold text-green-600">{highlight}</div>
      </div>
    </div>
  );
});

const TechCard = memo(({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-lg bg-background/50 border border-border/50 backdrop-blur-sm transition-all hover:scale-105 hover:bg-background/80",
        className
      )}
    >
      <div className="relative z-20 *:h-6 *:w-6">{children}</div>
    </div>
  );
});

const FeatureCard = memo(({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center space-y-4 p-6 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm transition-all hover:shadow-lg hover:scale-105">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
});
