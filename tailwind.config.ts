import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-quote-blue",
    "bg-quote-green",
    "bg-quote-yellow",
    "bg-quote-orange",
    "bg-quote-red",
    "bg-quote-purple",
    "bg-quote-gray",
    "bg-quote-sky-blue",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-orange-500",
    "text-red-500",
    "text-purple-500",
    "text-gray-500",
    "border-blue-500",
    "border-green-500",
    "border-yellow-500",
    "border-orange-500",
    "border-red-500",
    "border-purple-500",
    "border-gray-500",
    "border-blue-200",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
          },
        },
      },
      backgroundImage: {
        sun: 'url("/icons/sun.svg")',
        moon: 'url("/icons/moon.svg")',
      },
      backgroundSize: {
        "theme-icon": "1.75rem",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        quote: {
          blue: "hsl(var(--quote-blue))",
          green: "hsl(var(--quote-green))",
          yellow: "hsl(var(--quote-yellow))",
          orange: "hsl(var(--quote-orange))",
          red: "hsl(var(--quote-red))",
          purple: "hsl(var(--quote-purple))",
          gray: "hsl(var(--quote-gray))",
          "sky-blue": "hsl(var(--quote-sky-blue))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
