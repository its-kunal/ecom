// rollup.config.mjs
import path from "path";
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const customResolver = resolve({
  extensions: [".mjs", ".js", ".jsx", ".json", ".sass", ".scss"],
});
const projectRootDir = path.resolve(__dirname);

export default {
  input: "server.js",
  output: {
    file: "dist/server.js",
    format: "mjs",
  },
  plugins: [
    alias({
      entries: [
        { find: "@/*", replacement: path.resolve(projectRootDir, "./") },
      ],
      customResolver,
    }),
    resolve(),
    typescript(),
  ],
};
