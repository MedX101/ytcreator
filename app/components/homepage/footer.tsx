import { Link } from "react-router";
import { Youtube, Mail, HelpCircle, FileText, Shield } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-br from-muted/30 to-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" aria-label="go home" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">YT</span>
              </div>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-bold text-xl">
                YTCreator
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The #1 AI tool for YouTube creators to clone any creator's writing style and generate viral scripts.
            </p>            <div className="flex space-x-3">
              <Link
                to="https://www.youtube.com/@SkynticSA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                to="mailto:hello@ytcreator.me"
                aria-label="Email"
                className="text-muted-foreground hover:text-green-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </Link>
              </li>              <li>
                <a href="mailto:hello@ytcreator.me?subject=YTCreator Support Request" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <Link to="/tutorials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Video Tutorials
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
              </li>              <li>
                <Link to="/refunds" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} YTCreator. All rights reserved.
            </span>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made for YouTube Creators</span>
              <span>•</span>
              <span>Built with ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
