import { icons } from "lucide-react";

export const Icon = ({
  name,
  color,
  size,
  className,
}: {
  name: keyof typeof icons;
  color: string;
  size: number;
  className?: string;
}) => {
  // Fetch the icon from the icons object
  const LucideIcon = icons[name as keyof typeof icons];

  // Check if the icon exists, and if not, return a fallback (e.g., a default icon or null)
  if (!LucideIcon) {
    console.error(`Icon "${name}" does not exist in lucide-react icons.`);
    return null; // or return a default icon
  }

  return <LucideIcon color={color} size={size} className={className} />;
};
