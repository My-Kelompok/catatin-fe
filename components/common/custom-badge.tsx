import { LucideIcon } from "lucide-react";
import { Badge } from "../ui/badge";

interface CustomBadgeProps {
  icon: LucideIcon;
  label: string;
  iconColor?: string;
  bgColor?: string;
  bgBorderColor?: string;
  textColor?: string;
}

export default function CustomBadge({
  icon: Icon,
  label,
  iconColor,
  bgColor,
  bgBorderColor,
  textColor,
}: CustomBadgeProps) {
  return (
    <Badge
      className={`flex items-center justify-center gap-2 ${bgBorderColor ? bgBorderColor : "border-blue-300"} ${bgColor ? bgColor : "bg-blue-300/40"} ${textColor ? textColor : "text-blue-700"}`}
    >
      <Icon className={`h-4 w-4 animate-pulse ${iconColor}`} />
      {label}
    </Badge>
  );
}
