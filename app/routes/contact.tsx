import React from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { 
  Mail, 
  ArrowLeft
} from "lucide-react";

export function meta() {
  return [
    { title: "Contact Support - YTCreator" },
    { name: "description", content: "Contact YTCreator support team via email." },
  ];
}

export default function Contact() {
  // Redirect to email
  React.useEffect(() => {
    window.location.href = "mailto:hello@ytcreator.me?subject=YTCreator Support Request";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">              <Button asChild variant="ghost" size="sm">
                <Link to="/support">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Back to Support</span>
                  <span className="sm:hidden">Back</span>
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

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Redirecting Message */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Mail className="w-4 h-4 mr-2" />
            Redirecting to Email
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Opening Your <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Email Client</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We're redirecting you to your email client to contact our support team at hello@ytcreator.me
          </p>
          
          <div className="bg-muted/30 rounded-lg p-8">
            <p className="text-muted-foreground mb-4">
              If your email client didn't open automatically, you can:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="mailto:hello@ytcreator.me?subject=YTCreator Support Request">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/support">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Support
                </Link>
              </Button>
            </div>          </div>
        </div>
      </div>
    </div>
  );
}
