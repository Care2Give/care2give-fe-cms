import { format } from "date-fns";

/**
 * Formats Date object to MM/dd format
 * @param date Date
 * @returns MM/dd string
 */
export function mmddFormatter(date: Date) {
  return format(date, "MM/dd");
}

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
