import { vercelEdgeAdapter } from "@builder.io/qwik-city/adapters/vercel-edge/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.vercel-edge.tsx", "@qwik-city-plan"],
      },
      outDir: ".vercel/output/functions/_qwik-city.func",
    },
    plugins: [vercelEdgeAdapter()],
    resolve: {
      alias: {
        ".prisma/client/default": "./node_modules/.prisma/client/default.js",
        "./query_engine_bg.wasm?module": "./node_modules/.prisma/client/query_engine_bg.wasm?init",
      },
    },
  };
});
