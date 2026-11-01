// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Netlify deployment target. Inside the Lovable sandbox the config keeps
  // its own Cloudflare preset for the preview; everywhere else (e.g. Netlify
  // CI) the server build uses Nitro's "netlify" preset, emitting dist/client
  // (static assets) + a Netlify Function for SSR.
  nitro: {
    preset: "netlify",
    // Keep static assets in dist/client so netlify.toml's publish dir matches
    // the official Netlify TanStack Start instructions.
    output: { publicDir: "dist/client" },
  },
  vite: {
    plugins: [netlify()],
  },
});
