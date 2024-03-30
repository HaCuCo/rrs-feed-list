import serve from "rollup-plugin-serve";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import fs from "fs";

export default {
  input: ["src/rss-feed-list.js"],
  output: {
    format: "es",
    file: "./dist/rss-feed-list-dev.js",
  },
  plugins: [
    nodeResolve(),
    serve({
      contentBase: "./dist",
      host: "0.0.0.0",
      port: 5000,
      allowCrossOrigin: true,
      https: {
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem"),
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
  ],
};
