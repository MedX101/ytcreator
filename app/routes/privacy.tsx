import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Shield, 
  ArrowLeft,
  Lock,
  Eye,
  Database,
  Mail,
  Calendar
} from "lucide-react";

export function meta() {
  return [
    { title: "Privacy Policy - YTCreator" },
    { name: "description", content: "Learn how YTCreator protects your privacy and handles your data." },
  ];
}

export default function Privacy() {
  const lastUpdated = "December 19, 2024";

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

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Privacy Policy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Privacy Matters</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We're committed to protecting your privacy and being transparent about how we collect and use your data.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Privacy Summary */}
        <div className="mb-12">
          <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Lock className="w-5 h-5" />
                Quick Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-700 dark:text-green-300">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                  We only collect data necessary to provide our service
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                  We never sell your personal information to third parties
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                  You have full control over your data and can delete it anytime
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                  We use industry-standard security measures to protect your data
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-500" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Account Information</h3>
                <p className="text-muted-foreground mb-2">
                  When you create an account, we collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Email address</li>
                  <li>Name (if provided)</li>
                  <li>Authentication data from Clerk (our auth provider)</li>
                  <li>Subscription status and billing information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Usage Data</h3>
                <p className="text-muted-foreground mb-2">
                  To improve our service, we collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Scripts you generate and save</li>
                  <li>YouTube URLs you submit for analysis</li>
                  <li>Feature usage patterns</li>
                  <li>Error logs and performance data</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Technical Information</h3>
                <p className="text-muted-foreground mb-2">
                  We automatically collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Session data and cookies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-500" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Provision</h3>
                  <p className="text-muted-foreground">
                    We use your data to provide YTCreator's core functionality, including script generation, 
                    user authentication, and subscription management.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Service Improvement</h3>
                  <p className="text-muted-foreground">
                    We analyze usage patterns to improve our AI models, fix bugs, and develop new features 
                    that better serve our users.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Communication</h3>
                  <p className="text-muted-foreground">
                    We may send you service-related emails, important updates, and (with your consent) 
                    marketing communications about new features.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Legal Compliance</h3>
                  <p className="text-muted-foreground">
                    We may process your data to comply with legal obligations, resolve disputes, 
                    and enforce our terms of service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Data Sharing and Third Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We do not sell your personal information. We only share data with trusted service providers who help us operate YTCreator:
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Clerk (Authentication)</h4>
                    <p className="text-sm text-muted-foreground">
                      Handles user authentication and account management securely.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Convex (Database)</h4>
                    <p className="text-sm text-muted-foreground">
                      Stores your scripts and account data with enterprise-grade security.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Polar (Payments)</h4>
                    <p className="text-sm text-muted-foreground">
                      Processes payments and manages subscription billing securely.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Vercel (Hosting)</h4>
                    <p className="text-sm text-muted-foreground">
                      Hosts our application with industry-leading security standards.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You have the following rights regarding your personal data:
                </p>

                <div className="grid gap-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium">Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Request a copy of all personal data we have about you.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium">Correction</h4>
                      <p className="text-sm text-muted-foreground">
                        Update or correct any inaccurate personal information.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium">Deletion</h4>
                      <p className="text-sm text-muted-foreground">
                        Request deletion of your account and associated data.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium">Portability</h4>
                      <p className="text-sm text-muted-foreground">
                        Export your data in a machine-readable format.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    To exercise any of these rights, please contact us at privacy@ytcreator.me 
                    or use the account settings in your dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-500" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your data:
              </p>

              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  End-to-end encryption for data transmission
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Secure cloud infrastructure with regular security audits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Limited access controls and employee training
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Regular security updates and vulnerability assessments
                </li>
              </ul>

              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  While we implement strong security measures, no system is 100% secure. 
                  We encourage you to use strong passwords and keep your account credentials private.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
              </p>              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@ytcreator.me</p>
                <p><strong>Support:</strong> <a href="mailto:hello@ytcreator.me?subject=YTCreator Privacy Question" className="text-blue-600 hover:underline">Contact Support</a></p>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  We will respond to privacy-related inquiries within 30 days. For urgent matters, 
                  please include "URGENT - Privacy" in your subject line.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. When we do:
              </p>

              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>We'll update the "Last Updated" date at the top of this page</li>
                <li>For significant changes, we'll notify you via email</li>
                <li>We'll post a notice on our website for 30 days</li>
                <li>Continued use of our service constitutes acceptance of the updated policy</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Questions about our privacy practices? We're here to help.
            </p>            <Button asChild>
              <a href="mailto:hello@ytcreator.me?subject=YTCreator Privacy Question">
                <Mail className="w-4 h-4 mr-2" />
                Contact Privacy Team
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
