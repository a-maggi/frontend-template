import resolveConfig from "tailwindcss/resolveConfig";

const tailwindConfig = require("./../tailwind.config.js");

const theme = resolveConfig(tailwindConfig).theme;

export default theme;
