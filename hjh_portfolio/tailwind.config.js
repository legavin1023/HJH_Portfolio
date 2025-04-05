module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          p25: "#f5faf6",
          p50: "#e8f8e9",
          p75: "#a2e0a6",
          p100: "#66d26e",
          p200: "#43c14c",
          p250: "#39bf43",
          p300: "#01b236",
          p350: "#18a122",
          p400: "#147e1b",
          p500: "#116e18",
        },
        blue: {
          b50: "#e6f0ff",
          b75: "#96c0ff",
          b100: "#6ba6ff",
          b200: "#2b7fff",
          b250: "#236edf",
          b300: "#0065ff",
          b400: "#0047b3",
          b500: "#003e9c",
        },
        black: {
          b00: "#ffffff",
          b10: "#fafafa",
          b20: "#f5f5f5",
          b30: "#ececec",
          b35: "#eeeeee",
          b40: "#e0e0e0",
          b50: "#c3c3c3",
          b60: "#b5b5b5",
          b70: "#a9a9a9",
          b80: "#9a9a9a",
          b90: "#8c8c8c",
          b100: "#7d7d7d",
          b200: "#6f6f6f",
          b300: "#616161",
          b400: "#555555",
          b500: "#464646",
          b600: "#3a3a3a",
          b700: "#292929",
          b750: "#252525",
          b800: "#1b1b1b",
          b900: "#0f0f0f",
        },
        background: {
          g50: "#f3f4fa",
          blue: "#4a8cf0",
          green: "#2bbc57",
        },
      },
      fontWeight: {
        300: "300", // Light
        400: "400", // Regular
        700: "700", // Bold
        800: "800", // Extra Bold
        900: "900", // Heavy
      },
    },
  },
  plugins: [],
};
