import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayDateAU(date: Date | string): string {

  if (typeof date === "string") {
    date = new Date(date);
  }
  
  const displayDate = date.toLocaleDateString("en-AU", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return displayDate;
}
