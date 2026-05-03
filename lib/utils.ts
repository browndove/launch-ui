import { type ClassValue,clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Use on <a> when href may be an external origin. */
export function externalLinkProps(href: string) {
  return /^https?:\/\//i.test(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : ({} as const);
}
