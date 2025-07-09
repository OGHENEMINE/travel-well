import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownProps {
  trigger: ReactNode; // can be string, icon, or any JSX
  children: ReactNode; // dropdown menu items or groups
  align?: "start" | "center" | "end";
  className?: string;
}

export function Dropdown({ trigger, children, align = "start", className }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center gap-2">
          {trigger}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
