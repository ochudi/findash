import { ThemeToggle } from "../theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

export function HeaderTitle({ title, subtitle }: HeaderTitleProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Remove the extra button wrapper here */}
            <ThemeToggle />
          </TooltipTrigger>
          <TooltipContent side="left" align="center">
            Toggle Light/Dark Mode
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
