"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Briefcase,
  ChartColumn,
  ChartPie,
  CreditCard,
  DollarSign,
  Home,
  Settings,
  TrendingUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/svg/findash-logo-light.svg"; // Light logo
import darkLogo from "@/public/svg/findash-logo.svg"; // Dark logo

import { usePathname } from "next/navigation";

const items = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
  },
  {
    title: "Stocks",
    url: "/stocks",
    icon: TrendingUp,
  },
  {
    title: "Cryptocurrencies",
    url: "/crypto",
    icon: DollarSign,
  },
  {
    title: "Portfolio",
    url: "/portfolio",
    icon: Briefcase,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartColumn,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ChartPie,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const { theme } = useTheme();

  // Avoid hydration issues by rendering only after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close the sidebar on mobile route change
  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpenMobile(false);
    }
  }, [pathname, setOpenMobile]);

  // Determine the logo to use:
  // If dark mode is active, use the light logo; otherwise use the dark logo.
  const currentLogo = mounted && theme === "dark" ? logo : darkLogo;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-8">
            <Image src={currentLogo} alt="FinDash Logo" className="w-auto h-auto mt-5" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
