import { Cinzel, Plus_Jakarta_Sans, Kantumruy_Pro } from "next/font/google";
import collection from "../collection.config.js";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-khmer",
});

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakartaSans.variable} ${kantumruyPro.variable}`}
    >
      <body
        style={{
          margin: 0,
          backgroundColor: "#FAF6EC",
          color: "#2E3B2A",
          fontFamily:
            "var(--font-body), var(--font-khmer), 'Segoe UI', sans-serif",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
