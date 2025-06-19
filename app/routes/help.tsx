import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { 
  Search, 
  BookOpen, 
  Zap, 
  Youtube, 
  Settings, 
  CreditCard,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

export function meta() {
  return [
    { title: "Help Center - YTCreator" },
    { name: "description", content: "Find answers to frequently asked questions about YTCreator." },
  ];
}

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">              <Button asChild variant="ghost" size="sm">
                <Link to="/support">
                  <ArrowLeft className="w-4 h-4 mr-2" />                  <span className="hidden sm:inline-block">Back to Support</span>
                  <span className="inline-block sm:hidden">Back</span>
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

      {/* Hero Section */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Help Center
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about using YTCreator to create viral YouTube scripts.
          </p>
        </div>

        {/* FAQ Tabs */}
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-500" />
                  Getting Started
                </CardTitle>
                <CardDescription>
                  Learn the basics of YTCreator and create your first viral script.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create my first script?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p>Creating your first script is simple:</p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          <li>Go to the Dashboard after signing up</li>
                          <li>Click on "YouTube" then "Generate"</li>
                          <li>Paste a YouTube URL of a creator you want to clone</li>
                          <li>Enter your video topic</li>
                          <li>Click "Generate Script" and wait 15-30 seconds</li>
                        </ol>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-blue-900 dark:text-blue-100">Pro Tip</p>
                              <p className="text-blue-700 dark:text-blue-200">Start with popular creators like MrBeast, MKBHD, or Emma Chamberlain for best results.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What types of YouTube creators can I clone?</AccordionTrigger>
                    <AccordionContent>
                      <p>YTCreator works with virtually any YouTube creator across all niches:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li><strong>Entertainment:</strong> MrBeast, PewDiePie, Emma Chamberlain</li>
                        <li><strong>Tech:</strong> MKBHD, Unbox Therapy, Linus Tech Tips</li>
                        <li><strong>Education:</strong> Kurzgesagt, TED-Ed, Khan Academy</li>
                        <li><strong>Gaming:</strong> Ninja, Pokimane, Jacksepticeye</li>
                        <li><strong>Lifestyle:</strong> Casey Neistat, Peter McKinnon</li>
                        <li><strong>Business:</strong> Gary Vaynerchuk, Ali Abdaal</li>
                      </ul>
                      <p className="mt-3">The AI analyzes their speaking patterns, hooks, storytelling style, and personality to create authentic scripts in their voice.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How long does it take to generate a script?</AccordionTrigger>
                    <AccordionContent>
                      <p>Script generation typically takes:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li><strong>Standard scripts:</strong> 15-30 seconds</li>
                        <li><strong>Long-form scripts:</strong> 30-60 seconds</li>
                        <li><strong>Complex niches:</strong> Up to 90 seconds</li>
                      </ul>
                      <p className="mt-3">The AI needs time to analyze the creator's style and craft an authentic script that matches their voice perfectly.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I edit the generated scripts?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes! You have full control over your scripts:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li>Edit any part of the generated script</li>
                        <li>Add your own personal touches</li>
                        <li>Refine the hook or conclusion</li>
                        <li>Adjust the tone or style</li>
                        <li>Save multiple versions</li>
                      </ul>
                      <p className="mt-3">The generated script is your starting point - customize it to match your unique voice and message.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-red-500" />
                  Features & Capabilities
                </CardTitle>
                <CardDescription>
                  Discover what YTCreator can do for your content creation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="feature-1">
                    <AccordionTrigger>What makes YTCreator different from ChatGPT?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p>While ChatGPT creates generic content, YTCreator specializes in YouTube scripts:</p>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <h4 className="font-medium text-red-500">❌ ChatGPT</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Generic, robotic scripts</li>
                              <li>• No personality or style</li>
                              <li>• Requires detailed prompting</li>
                              <li>• Not YouTube-optimized</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-green-500">✅ YTCreator</h4>
                            <ul className="text-sm space-y-1">
                              <li>• Creator-specific voice & style</li>
                              <li>• Viral hooks and engagement</li>
                              <li>• One-click generation</li>
                              <li>• YouTube algorithm optimized</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="feature-2">
                    <AccordionTrigger>How accurate is the style cloning?</AccordionTrigger>
                    <AccordionContent>
                      <p>Our AI analyzes multiple aspects of a creator's style:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li><strong>Speech patterns:</strong> Sentence structure, word choice, rhythm</li>
                        <li><strong>Personality traits:</strong> Humor, energy level, enthusiasm</li>
                        <li><strong>Storytelling style:</strong> How they build narratives and tension</li>
                        <li><strong>Hook creation:</strong> Their unique way of grabbing attention</li>
                        <li><strong>Call-to-actions:</strong> How they engage with their audience</li>
                      </ul>
                      <p className="mt-3">The result is a script that sounds authentically like the creator you chose to clone.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="feature-3">
                    <AccordionTrigger>Can I save and organize my scripts?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes! YTCreator includes a comprehensive script library:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li>Save unlimited scripts</li>
                        <li>Organize by creator style or topic</li>
                        <li>Search through your script history</li>
                        <li>Export scripts in multiple formats</li>
                        <li>Share scripts with team members</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  Billing & Subscriptions
                </CardTitle>
                <CardDescription>
                  Information about pricing, payments, and subscription management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="billing-1">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      <p>We accept all major payment methods through our secure payment processor:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li>Credit Cards (Visa, Mastercard, American Express)</li>
                        <li>Debit Cards</li>
                        <li>Digital Wallets (Apple Pay, Google Pay)</li>
                        <li>PayPal</li>
                      </ul>
                      <p className="mt-3">All payments are processed securely and your card information is never stored on our servers.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="billing-2">
                    <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
                    <AccordionContent>
                      <p>Yes, you can cancel your subscription at any time:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li>Go to Dashboard → Settings → Subscription</li>
                        <li>Click "Cancel Subscription"</li>
                        <li>You'll retain access until your billing period ends</li>
                        <li>No cancellation fees or hidden charges</li>
                      </ul>
                      <p className="mt-3">You can reactivate your subscription at any time to regain full access.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="billing-3">
                    <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p>Our refund policy is designed to be fair and transparent:</p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-yellow-900 dark:text-yellow-100">Refund Policy</p>
                              <p className="text-yellow-700 dark:text-yellow-200">We offer refunds within 60 days of purchase on a case-by-case basis. Contact our support team to discuss your situation.</p>
                            </div>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to="/refunds">View Full Refund Policy</Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-500" />
                  Troubleshooting
                </CardTitle>
                <CardDescription>
                  Common issues and how to resolve them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="trouble-1">
                    <AccordionTrigger>My script generation is taking too long</AccordionTrigger>
                    <AccordionContent>
                      <p>If script generation is taking longer than expected:</p>
                      <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
                        <li>Wait up to 2 minutes - complex scripts take time</li>
                        <li>Check your internet connection</li>
                        <li>Try refreshing the page</li>
                        <li>Use a different YouTube URL</li>
                        <li>Contact support if the issue persists</li>
                      </ol>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-900 dark:text-green-100">Normal Wait Times</p>
                            <p className="text-green-700 dark:text-green-200">Generation typically takes 15-90 seconds depending on complexity.</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="trouble-2">
                    <AccordionTrigger>The generated script doesn't match the creator's style</AccordionTrigger>
                    <AccordionContent>
                      <p>If the script doesn't feel authentic:</p>
                      <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                        <li>Try using a different video from the same creator</li>
                        <li>Use videos that are at least 5 minutes long</li>
                        <li>Avoid music videos or heavily edited content</li>
                        <li>Choose videos where the creator talks directly to camera</li>
                        <li>Use recent videos (within the last year)</li>
                      </ul>
                      <p className="mt-3">The AI works best with clear, conversational content where the creator's personality shines through.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="trouble-3">
                    <AccordionTrigger>I can't access my subscription features</AccordionTrigger>
                    <AccordionContent>
                      <p>If you're having trouble accessing paid features:</p>
                      <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
                        <li>Check your subscription status in Settings</li>
                        <li>Verify your payment went through</li>
                        <li>Try logging out and logging back in</li>
                        <li>Clear your browser cache</li>
                        <li>Contact support with your account email</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Still Need Help */}
        <div className="mt-16 text-center">
          <div className="bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>            <Button asChild>
              <a href="mailto:hello@ytcreator.me?subject=YTCreator Support Request">Contact Support</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
