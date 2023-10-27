// rollup.config.mjs
import typescript from "@rollup/plugin-typescript";

export default {
  input: "server.ts",
  output: {
    file: "dist/server.js",
    format: "cjs",
  },
  plugins: [typescript()],
};
