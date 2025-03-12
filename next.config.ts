/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const path = require("path");

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: '@use "./app/shared/styles/_variables.scss" as *;',
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      resourceQuery: /url/, // *.svg?url
    });

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /svgr/, // *.svg?svgr
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    if (typeof config.webpack === "function") {
      return config.webpack(config, options);
    }
    if (!options.isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
        "supports-color": "supports-color",
      });
    }

    return config;
  },
};

export default nextConfig;
