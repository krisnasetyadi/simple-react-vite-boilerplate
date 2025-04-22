import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(callback: any, delay: number) {
  let timer: NodeJS.Timeout;

  return (args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delay);
  };
}
