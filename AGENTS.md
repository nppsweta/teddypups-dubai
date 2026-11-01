<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules

- Deployment targets: the Lovable sandbox build keeps the Cloudflare Nitro preset (forced by @lovable.dev/vite-tanstack-config); external builds (Netlify CI) use `nitro: { preset: "netlify", output: { publicDir: "dist/client" } }` plus `@netlify/vite-plugin-tanstack-start` in vite.config.ts, with netlify.toml publishing `dist/client`. Do not remove the `nitro` option or the netlify() plugin — the sandbox override keeps the Lovable preview working regardless.
