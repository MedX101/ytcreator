import { 
  BarChart3, 
  PenTool, 
  Youtube, 
  Brain,
  FileText,
  Users,
  Sparkles,
  type LucideIcon
} from "lucide-react";
import { IconSettings } from "@tabler/icons-react";
import { Link } from "react-router";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3 as LucideIcon,
    },
    {
      title: "Create Scripts",
      url: "/dashboard/youtube",
      icon: PenTool as LucideIcon,
    },
    {
      title: "Analyze Creators",
      url: "/dashboard/youtube",
      icon: Brain as LucideIcon,
    },
    {
      title: "My Scripts",
      url: "/dashboard/youtube",
      icon: FileText as LucideIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({
  variant,
  user,
}: {
  variant: "sidebar" | "floating" | "inset";
  user: any;
}) {
  return (
    <Sidebar collapsible="offcanvas" variant={variant}>      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" prefetch="viewport" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">YT</span>
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                YTCreator
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
