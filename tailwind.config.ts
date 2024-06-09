import type { Config } from "tailwindcss";

import plugin from 'tailwindcss/plugin';
import { blackA, mauve, violet, indigo, purple } from '@radix-ui/colors'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
      },
      fontFamily: {
        // <link href="https://fonts.googleapis.com/css2?family=  :ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        sans: ['Roboto', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif']
      },
      keyframes: {
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
    },
    animation: {
      scaleIn: 'scaleIn 200ms ease',
      scaleOut: 'scaleOut 200ms ease',
      fadeIn: 'fadeIn 200ms ease',
      fadeOut: 'fadeOut 200ms ease',
      enterFromLeft: 'enterFromLeft 250ms ease',
      enterFromRight: 'enterFromRight 250ms ease',
      exitToLeft: 'exitToLeft 250ms ease',
      exitToRight: 'exitToRight 250ms ease',
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
};

export default config;
