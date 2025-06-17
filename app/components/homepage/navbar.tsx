"use client";
import { UserButton } from "@clerk/react-router";
import { Github, Menu, X } from "lucide-react";
import React, { useCallback } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const menuItems = [
  { name: "Home", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#demo" },
  { name: "Pricing", href: "#pricing" },
];

export const Navbar = ({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean; hasActiveSubscription: boolean };
}) => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setMenuState(false); // Close mobile menu
  }, []);

  // Simple computations don't need useMemo
  const dashboardLink = !loaderData?.isSignedIn 
    ? "/sign-up" 
    : loaderData.hasActiveSubscription ? "/dashboard" : "/pricing";

  const dashboardText = !loaderData?.isSignedIn 
    ? "Get Started"
    : loaderData.hasActiveSubscription ? "Dashboard" : "Subscribe";
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-99 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">              <Link
                to="/"
                aria-label="home"
                className="flex items-center space-x-2 font-semibold text-xl"
                prefetch="viewport"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">YT</span>
                </div>
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent font-bold">
                  YTCreator
                </span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <div
                      onClick={() => handleNavClick(item.href)}
                      className="hover:cursor-pointer text-muted-foreground block duration-150 transition-colors"
                    >
                      <span>{item.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">              <div className="lg:hidden w-full">
                <ul className="space-y-6 text-lg">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="text-muted-foreground hover:text-foreground hover:cursor-pointer block duration-150 transition-colors w-full text-left py-3 px-2 rounded-lg hover:bg-muted/50"
                      >
                        <span className="font-medium">{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                
                {/* Mobile CTA buttons */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  {loaderData?.isSignedIn ? (
                    <div className="space-y-3">
                      <Button asChild size="lg" className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                        <Link to={dashboardLink} prefetch="viewport">
                          <span>{dashboardText}</span>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full"
                      >
                        <Link to="/sign-in" prefetch="viewport">
                          <span>Login</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      >
                        <Link to="/sign-up" prefetch="viewport">
                          <span>Start Free</span>
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Desktop buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {loaderData?.isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <Button asChild size="sm">
                      <Link to={dashboardLink} prefetch="viewport">
                        <span>{dashboardText}</span>
                      </Link>
                    </Button>
                    <UserButton />
                  </div>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className={cn(isScrolled && "lg:hidden")}
                    >
                      <Link to="/sign-in" prefetch="viewport">
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn("bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700", isScrolled && "lg:hidden")}
                    >                      <Link to="/sign-up" prefetch="viewport">
                        <span>Start Free</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn("bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700", isScrolled ? "lg:inline-flex" : "hidden")}
                    >
                      <Link to="/sign-up" prefetch="viewport">
                        <span>{dashboardText}</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
