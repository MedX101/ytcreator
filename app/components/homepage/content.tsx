import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
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
  MessageSquare
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
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-red-500">❌ What Other AI Tools Give You:</h3>
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
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-500">✅ What YTCreator Gives You:</h3>
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-muted/20 to-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="px-4 py-2 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Dominate YouTube
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From viral video analysis to script generation - we've got every part of your content creation workflow covered.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Youtube className="w-12 h-12 text-red-500" />}
              title="Any Video, Any Creator"
              description="Paste any YouTube URL from any niche - gaming, finance, cooking, beauty - and instantly analyze their style"
              stats="10M+ videos analyzed"
            />
            
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-purple-500" />}
              title="Advanced Style Cloning"
              description="Our AI studies tone, pacing, word choice, hooks, and storytelling patterns unique to each creator"
              stats="99% accuracy rate"
            />
            
            <FeatureCard
              icon={<Copy className="w-12 h-12 text-blue-500" />}
              title="Unlimited Script Generation"
              description="Generate endless scripts in any creator's style about YOUR topics and ideas. No limits."
              stats="Truly unlimited"
            />
            
            <FeatureCard
              icon={<TrendingUp className="w-12 h-12 text-green-500" />}
              title="Viral Hook Templates"
              description="Extract the exact hooks and intros that made videos go viral and apply them to your content"
              stats="1000+ viral hooks"
            />
            
            <FeatureCard
              icon={<PlayCircle className="w-12 h-12 text-orange-500" />}
              title="Multi-Format Support"
              description="Perfect for long-form, shorts, podcasts, and even social media posts. One style, every format."
              stats="All formats supported"
            />
            
            <FeatureCard
              icon={<Users className="w-12 h-12 text-pink-500" />}
              title="Faceless Channel Ready"
              description="Specifically designed for faceless channels. Clone successful faceless creators' styles effortlessly"
              stats="Faceless-optimized"
            />
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" asChild>
              <Link to="/sign-up">
                <Zap className="w-5 h-5 mr-2" />
                Start Creating Better Scripts Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
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
