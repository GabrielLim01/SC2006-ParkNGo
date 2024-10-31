import type { Config } from "tailwindcss";

const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      mainBlue : "#04266C",
      secBlue : "#2541B2",
      dGrey : "#716E77",
      lGrey : "#E2E4EF",
      lightBlue : "#06BEE1",
      lighterBlue : "#C9F2F4",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'oswald' : ['var(--font-oswald)'],
        'sans-serif-3' : ['var(--font-source-sans-3)']
      },
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
