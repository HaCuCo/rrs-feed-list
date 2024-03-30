import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: ["src/rss-feed-list.js"],
  output: {
    dir: "./dist",
    format: "es",
  },
  plugins: [nodeResolve(), terser(), uglify()],
};
