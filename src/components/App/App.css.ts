import { keyframes, style } from "@vanilla-extract/css";

const logoSpin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const logo = style({
  height: "6em",
  padding: "1.5em",
  willChange: "filter",
  transition: "filter 300ms",
  ":hover": {
    filter: "drop-shadow(0 0 2em #646cffaa)",
  },
  selectors: {
    [`a:nth-of-type(2) &`]: {
      animation: `${logoSpin} infinite 20s linear`,
    },
  },
});

export const rLogo = style({
  selectors: {
    [`${logo}.&:hover`]: {
      filter: "drop-shadow(0 0 2em #61dafbaa)",
    },
  },
});

export const card = style({
  padding: "2em",
});

export const readTheDocs = style({
  color: "#888",
});
