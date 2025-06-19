import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  RotateCcw, 
  ArrowLeft,
  Clock,
  CreditCard,
  DollarSign,
  AlertCircle,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";

export function meta() {
  return [
    { title: "Refund Policy - YTCreator" },
    { name: "description", content: "YTCreator refund policy. Learn about our refund process and eligibility criteria." },
  ];
}

export default function Refunds() {
  const lastUpdated = "December 19, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">              <Button asChild variant="ghost" size="sm">
                <Link to="/support">
                  <ArrowLeft className="w-4 h-4 mr-0 sm:mr-2" />                  <span className="hidden sm:inline-block">Back to Support</span>
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
            <RotateCcw className="w-4 h-4 mr-2" />
            Refund Policy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Refund</span> Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            We want you to be satisfied with YTCreator. Learn about our refund process and what's covered.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mb-12">
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <CreditCard className="w-5 h-5" />
                Refund Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">60-Day Window</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Requests must be made within 60 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Discretionary Review</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Each case reviewed individually</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Refund Policy Content */}
        <div className="space-y-12">
          {/* General Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-green-500" />
                Our Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                YTCreator processes payments through Polar Software Inc., our merchant of record. While our service fees are generally non-refundable to cover operational costs, we understand that exceptional circumstances may arise.
              </p>
              <p className="text-muted-foreground">
                We offer discretionary refunds on a case-by-case basis for legitimate concerns raised within 60 days of purchase. Each refund request is carefully reviewed based on individual circumstances.
              </p>
            </CardContent>
          </Card>

          {/* Eligible Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                When Refunds May Be Considered
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We may consider refunds in the following circumstances:
              </p>
              <div className="bg-green-50/50 dark:bg-green-900/10 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Technical issues that prevent service access for extended periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Billing errors or duplicate charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Service not functioning as described due to our error</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Unauthorized charges due to account security issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Other exceptional circumstances reviewed on individual merit</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Non-Eligible Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                When Refunds Are Not Available
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Refunds are generally not provided in these situations:
              </p>
              <div className="bg-red-50/50 dark:bg-red-900/10 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm">Change of mind or no longer needing the service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm">Partial billing periods (subscriptions used for part of billing cycle)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm">Account termination due to terms of service violations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm">Dissatisfaction with AI-generated content quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm">External factors affecting YouTube success or monetization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                    <span className="text-sm">Requests made after 60 days from original purchase</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How to Request */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                How to Request a Refund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you believe your situation qualifies for a refund consideration, please follow these steps:
              </p>
              <div className="bg-muted/50 rounded-lg p-4">
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center">1</span>
                    <span>Contact our support team through the contact form or email</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center">2</span>
                    <span>Provide your account details and purchase information</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center">3</span>
                    <span>Explain the specific circumstances and reason for your refund request</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center">4</span>
                    <span>Include any relevant screenshots or documentation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center">5</span>
                    <span>Wait for our team to review and respond within 2-3 business days</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Processing Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Refund Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If your refund request is approved, here's what to expect:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Review Timeline</h4>
                  <p className="text-sm text-muted-foreground">We review all refund requests within 2-3 business days and will email you our decision.</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Processing Time</h4>
                  <p className="text-sm text-muted-foreground">Approved refunds are processed within 5-10 business days back to your original payment method.</p>
                </div>
              </div>
              <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200">Important Note</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Since payments are processed through Polar Software Inc., refunds are subject to their merchant policies and processing procedures.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternatives to Refunds */}
          <Card>
            <CardHeader>
              <CardTitle>Alternatives to Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Before requesting a refund, consider these alternatives that might resolve your concerns:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Technical Support</h4>
                  <p className="text-sm text-muted-foreground">Our team can help resolve technical issues and answer questions about using the service effectively.</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Account Pause</h4>
                  <p className="text-sm text-muted-foreground">Consider pausing your subscription temporarily if you need a break but plan to return later.</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Feature Guidance</h4>
                  <p className="text-sm text-muted-foreground">Learn about features you might have missed through our tutorials and help documentation.</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Plan Changes</h4>
                  <p className="text-sm text-muted-foreground">Switch to a different plan that better matches your needs and usage patterns.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Questions about our refund policy or need to request a refund? Our support team is here to help.
              </p>              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="mailto:hello@ytcreator.me?subject=YTCreator Refund Request">
                    Request Refund
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/help">
                    Get Technical Help
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Notice */}
        <div className="mt-16 bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Refunds?</h2>
          <p className="text-muted-foreground mb-6">
            We're committed to customer satisfaction. Contact us to discuss your situation and explore options.
          </p>          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="mailto:hello@ytcreator.me?subject=YTCreator Refund Request">
                Contact Support
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/terms">
                View Terms of Service
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
