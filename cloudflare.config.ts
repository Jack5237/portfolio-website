import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "jacksdevfolio",
    entrypoint: "vinext/server/fetch-handler",
    // Kept in sync with the dashboard config: `cf deploy` aborts on any drift.
    compatibilityDate: "2026-10-01",
    compatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"],
    observability: { enabled: true, logs: { enabled: true } },
    // Serve only via custom domains: keep the *.workers.dev and preview URLs off.
    workersDev: false,
    previewUrls: false,
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      NEXT_PUBLIC_SITE_URL: bindings.json("https://www.jacksdevfolio.com/"),
      NODE_VERSION: bindings.json("22"),
    },
  }),
});
