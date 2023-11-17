import localFont from "next/font/local";
import {
  Montserrat,
  Open_Sans,
} from "next/font/google";

export const monserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-monserrat",
});

export const open = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open",
});

export const kaisei = localFont({
  src: "../../public/fonts/kaisei-tokumin-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-kaisei",
  display: "swap",
});
