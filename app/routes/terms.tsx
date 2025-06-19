import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  FileText, 
  ArrowLeft,
  Scale,
  Clock,
  Shield,
  Users,
  Calendar,
  AlertTriangle
} from "lucide-react";

export function meta() {
  return [
    { title: "Terms of Service - YTCreator" },
    { name: "description", content: "Terms of Service for YTCreator. Read our terms and conditions for using our YouTube script creation service." },
  ];
}

export default function Terms() {
  const lastUpdated = "December 19, 2024";

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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <FileText className="w-4 h-4 mr-2" />
            Terms of Service
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using YTCreator services.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-12">
          <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <AlertTriangle className="w-5 h-5" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 dark:text-amber-300">
                By using YTCreator, you agree to these terms of service and our privacy policy. These terms include information about automatic renewals, payment processing through Polar Software Inc. as our merchant of record, and dispute resolution.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Terms Content */}
        <div className="space-y-12">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-500" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Welcome to YTCreator. By accessing or using our service, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access our service.
              </p>
              <p className="text-muted-foreground">
                These terms constitute a binding contract between you and YTCreator. Your use of the service in any way means that you agree to all of these terms.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                YTCreator provides AI-powered tools for creating YouTube video scripts and content. Our service helps content creators generate engaging scripts, titles, and descriptions for their YouTube videos.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Service Features Include:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• AI-powered script generation</li>
                  <li>• Video title optimization</li>
                  <li>• Description and tag suggestions</li>
                  <li>• Content analytics and insights</li>
                  <li>• Script library and management</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>User Accounts and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Account Requirements:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• You must be at least 16 years old to use our service</li>
                  <li>• Provide accurate and complete registration information</li>
                  <li>• Keep your login credentials secure</li>
                  <li>• Notify us immediately of any unauthorized use</li>
                  <li>• One account per person</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Payment Terms and Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                YTCreator uses Polar Software Inc. as our merchant of record for payment processing. All payments are subject to Polar's terms of service and privacy policy.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Billing Information:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Subscriptions are billed monthly or annually as selected</li>
                  <li>• Payments are processed automatically on renewal dates</li>
                  <li>• All prices are in USD unless otherwise specified</li>
                  <li>• Service fees may apply and are shown at checkout</li>
                  <li>• You must provide current, complete payment information</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                <strong>Auto-Renewal:</strong> Unless you cancel before your billing period ends, your subscription will automatically renew for successive periods of the same duration at the then-current rate.
              </p>
            </CardContent>
          </Card>

          {/* Cancellation */}
          <Card>
            <CardHeader>
              <CardTitle>Cancellation and Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cancellation Terms:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• No refunds for partial billing periods</li>
                  <li>• Access continues until the end of paid period</li>
                  <li>• Data may be deleted after account termination</li>
                  <li>• We may terminate accounts for terms violations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Acceptable Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                Acceptable Use Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You agree not to use YTCreator for any unlawful purposes or in ways that could harm our service or other users.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Prohibited Activities:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Creating content that violates platform policies</li>
                  <li>• Generating spam, misleading, or harmful content</li>
                  <li>• Attempting to reverse engineer our service</li>
                  <li>• Sharing accounts or access credentials</li>
                  <li>• Using the service for illegal activities</li>
                  <li>• Creating content that infringes copyrights</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You retain ownership of the content you create using YTCreator. We retain ownership of our software, algorithms, and service infrastructure.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Content Rights:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• You own the scripts and content you generate</li>
                  <li>• You're responsible for ensuring content doesn't infringe rights</li>
                  <li>• YTCreator retains rights to our technology and platform</li>
                  <li>• You grant us license to process your content to provide the service</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our service is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of our service.
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Service Disclaimers:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• No guarantee of service availability or uptime</li>
                  <li>• AI-generated content may require review and editing</li>
                  <li>• No guarantee of YouTube success or monetization</li>
                  <li>• Users responsible for compliance with platform policies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to These Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our service. Continued use after changes constitutes acceptance of new terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have questions about these Terms of Service, please contact us through our support channels.
              </p>              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" size="sm">
                  <a href="mailto:hello@ytcreator.me?subject=YTCreator Support Request">
                    Contact Support
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/help">
                    Visit Help Center
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help clarify any questions about our terms of service.
          </p>          <Button asChild>
            <a href="mailto:hello@ytcreator.me?subject=YTCreator Support - Terms Question">
              Get Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
