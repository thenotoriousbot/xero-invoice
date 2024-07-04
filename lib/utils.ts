import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const invoiceNanoId = customAlphabet("0123456789", 5);

export function generateInvoiceNumber() {
  // Generate a random 5-character string using nanoid
  const randomNumber = invoiceNanoId();
  // Concatenate the prefix "INV-" with the random string
  const invoiceNumber = `INV-${randomNumber}`;
  return invoiceNumber;
}
