import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  ArrowLeft,
  Send,
  HelpCircle,
  Bug,
  CreditCard,
  Feature,
  AlertCircle
} from "lucide-react";

export function meta() {
  return [
    { title: "Contact Support - YTCreator" },
    { name: "description", content: "Get in touch with our support team. We're here to help you succeed with YTCreator." },
  ];
}

export default function Contact() {
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

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Personalized Help</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Our support team typically responds within 24 hours. We're here to help you succeed with YTCreator.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your full name" 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            General Question
                          </div>
                        </SelectItem>
                        <SelectItem value="bug">
                          <div className="flex items-center gap-2">
                            <Bug className="w-4 h-4" />
                            Bug Report
                          </div>
                        </SelectItem>
                        <SelectItem value="billing">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Billing Issue
                          </div>
                        </SelectItem>
                        <SelectItem value="feature">
                          <div className="flex items-center gap-2">
                            <Feature className="w-4 h-4" />
                            Feature Request
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your issue or question in detail..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 dark:text-blue-100">Before submitting:</p>
                        <ul className="text-blue-700 dark:text-blue-200 mt-1 space-y-1">
                          <li>• Check our <Link to="/help" className="underline">Help Center</Link> for quick answers</li>
                          <li>• Include your account email for faster support</li>
                          <li>• For bugs, describe steps to reproduce the issue</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Quick Links */}
          <div className="space-y-6">
            {/* Response Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">General Support</span>
                    <span className="font-medium">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing Issues</span>
                    <span className="font-medium">12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bug Reports</span>
                    <span className="font-medium">48 hours</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-200">
                    We typically respond much faster than these times!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
                <CardDescription>
                  Get instant answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link to="/help#getting-started">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Getting Started Guide
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link to="/help#features">
                    <Feature className="w-4 h-4 mr-2" />
                    Feature Documentation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link to="/help#billing">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Billing Questions
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full justify-start">
                  <Link to="/tutorials">
                    <Feature className="w-4 h-4 mr-2" />
                    Video Tutorials
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Alternative Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Direct Email</p>
                    <p className="text-sm text-muted-foreground">support@ytcreator.me</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">Community</p>
                    <Button asChild variant="link" size="sm" className="p-0 h-auto">
                      <Link to="/community">Join our Reddit community</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16">
          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertCircle className="w-5 h-5" />
                Need Immediate Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you're experiencing a critical issue that's preventing you from using YTCreator, 
                please email us directly at <strong>urgent@ytcreator.me</strong> with "URGENT" in the subject line.
              </p>
              <p className="text-sm text-muted-foreground">
                Please use this only for genuine emergencies. For general questions, use the form above.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
