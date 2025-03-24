"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "../theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchModal from "./general-search";
import { Button } from "@/components/ui/button";

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

export const HeaderTitle = ({ title, subtitle }: HeaderTitleProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        {/* Responsive Search */}
        <div className="relative hidden sm:flex w-64 max-sm:w-auto">
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search assets... (⌘ + K)"
            className="pl-8 hidden md:block"
            onFocus={() => setIsSearchOpen(true)}
            readOnly
          />
          {/* Medium Screen - Show Button with ⌘K */}
          <Button
            variant="outline"
            className="md:hidden px-3 flex items-center gap-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:block">⌘K</span>
          </Button>
        </div>

        {/* Small Screen - Just a Search Icon Button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <ThemeToggle />
          </TooltipTrigger>
          <TooltipContent side="left" align="center">
            Toggle Light/Dark Mode
          </TooltipContent>
        </Tooltip>

        {/* Search Modal */}
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderTitle;
