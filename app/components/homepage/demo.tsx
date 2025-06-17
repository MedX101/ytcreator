import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { 
  Play, 
  Youtube, 
  Brain, 
  PenTool, 
  ArrowRight, 
  Video,
  Sparkles
} from "lucide-react";
import { Link } from "react-router";

export default function DemoSection() {
  return (
    <section id="demo" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 mb-6">
            <Video className="w-4 h-4 mr-2" />
            See It In Action
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Watch How Easy It Is to{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Clone Any Style
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See a real example of how we transform a popular creator's video into a script template you can use for your own content.
          </p>
        </div>

        {/* Demo Video Placeholder */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-200 dark:border-red-800">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">2-Minute Demo Video</h3>
                  <p className="text-muted-foreground">See YTCreator clone MrBeast's style in real-time</p>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          <DemoStep
            number="1"
            icon={<Youtube className="w-8 h-8 text-red-500" />}
            title="Paste MrBeast Video"
            description="We take a popular MrBeast video about entrepreneurship"
            time="5 seconds"
          />
          <DemoStep
            number="2"
            icon={<Brain className="w-8 h-8 text-purple-500" />}
            title="AI Analyzes Style"
            description="Our AI studies his energy, hooks, storytelling patterns, and word choice"
            time="30 seconds"
          />
          <DemoStep
            number="3"
            icon={<PenTool className="w-8 h-8 text-green-500" />}
            title="Generate Your Script"
            description="Get a script about YOUR topic that sounds exactly like MrBeast"
            time="15 seconds"
          />
        </div>


        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all" asChild>
            <Link to="/sign-up">
              <Sparkles className="w-6 h-6 mr-3" />
              Try It Free - Clone Any Creator's Style
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </Button>
          <p className="text-muted-foreground mt-4">No credit card required • 3 free scripts to start</p>
        </div>
      </div>
    </section>
  );
}

function DemoStep({ 
  number, 
  icon, 
  title, 
  description, 
  time 
}: { 
  number: string; 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  time: string;
}) {
  return (
    <div className="text-center space-y-4 p-6 rounded-xl bg-background border hover:shadow-lg transition-all">
      <div className="relative">
        <div className="absolute -top-2 -right-2">
          <Badge variant="secondary" className="text-xs">
            {time}
          </Badge>
        </div>
        <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-muted-foreground">{number}</span>
        </div>
        <div className="flex justify-center mb-4">{icon}</div>
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
