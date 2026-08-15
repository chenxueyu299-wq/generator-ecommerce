# Gemirels Cloudflare Pages build

This directory is an isolated static build of the Gemirels storefront for
Cloudflare Pages. It reuses the validated storefront component and styles from
the repository root without changing the currently deployed site.

## Cloudflare Pages settings

- Root directory: `cloudflare-pages`
- Production branch: `codex/gemirels-store-pages`
- Framework preset: `Vite`
- Build command: `pnpm run build`
- Build output directory: `dist`
- Node.js version: `22.13.0` or newer

Verify the generated `*.pages.dev` URL before moving `gemirels.ai` away from
the existing `gemirels-robotics` project.
