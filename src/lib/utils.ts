import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertMsToMinutesSeconds(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.round((milliseconds % 60000) / 1000);
  return { minutes, seconds };
}

/* String Utils */

/**
 * Util for Capitalizes first letter for every word separated by blank space
 * @param string
 * @returns string to be displayed to client
 */
export function capitalizeFirstLetter(string: String) {
  const words = string.toLowerCase().trim().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  return words.join(" ");
}

/**
 * Util for forming value for strings with separated blankspace
 * @param string
 * @returns joined lowercase string with no blankspaces
 */
export function joinBlankspacedStringLowercased(string: String) {
  return string.replace(" ", "").toLowerCase();
}

/* Date Utils */

/**
 * Formats Date object to MM/dd format
 * @param date Date
 * @returns MM/dd string
 */
export function mmddFormatter(date: Date) {
  return format(date, "MM/dd");
}

/**
 * Formats Date object to dd/MM/yyyy format
 * @param date Date
 * @returns MM/dd string
 */
export function ddmmyyyyFormatter(date: Date) {
  return format(date, "dd/MM/yyyy");
}

/**
 * Returns true if role is valid
 * @param role string
 * @returns boolean
 */
export function isValidRole(role: string) {
  return (
    role === "superuser" ||
    role === "donation-manager" ||
    role === "campaign-manager"
  );
}

export const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};
