import Image from "next/image";

import { cn } from "@/lib/utils";

interface LaunchUIProps {
  className?: string;
  width?: number;
  height?: number;
}

const LaunchUI = ({ className, width = 24, height = 24 }: LaunchUIProps) => (
  <Image
    src="/helix-logo.png"
    alt="Helix"
    width={width}
    height={height}
    className={cn("object-contain", className)}
    priority
  />
);

export default LaunchUI;
