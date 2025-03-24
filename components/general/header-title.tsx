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

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

const HeaderTitle = ({ title, subtitle }: HeaderTitleProps) => {
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
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search assets... (Cmd + K)"
            className="pl-8"
            onFocus={() => setIsSearchOpen(true)}
            readOnly
          />
        </div>
        
        {/* Theme Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <ThemeToggle />
          </TooltipTrigger>
          <TooltipContent side="left" align="center">
            Toggle Light/Dark Mode
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Search Modal */}
      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
    </div>
  );
};

export default HeaderTitle;
