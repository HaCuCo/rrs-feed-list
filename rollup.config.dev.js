import serve from "rollup-plugin-serve";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: ["src/rss-feed-list.js"],
  output: {
    dir: "./dist",
    format: "es",
  },
  plugins: [
    nodeResolve(),
    serve({
      contentBase: "./dist",
      host: "0.0.0.0",
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
  ],
};
