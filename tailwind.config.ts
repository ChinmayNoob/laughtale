import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)'],
        'geist-mono': ['var(--font-geist-mono)'],
        'impact': ['var(--font-impact)'],
        'old-london': ['var(--font-old-london)'],
        'canopee': ['var(--font-canopee)'],
        'pp-editorial': ['var(--font-pp-editorial)'],
        'times-new-roman': ['var(--font-times-new-roman)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
