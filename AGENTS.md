# Repository Rules

| Rule | Enforced by |
| --- | --- |
| Access Monaco TypeScript services through `getMonacoTypeScript(monaco)` from `~/monaco/setup`, never `monaco.languages.typescript` | `eslint.config.mjs` (`no-restricted-syntax`), `scripts/verify-build.mjs` (`monaco-ts-namespace`) |
| Load bundled `monaco-editor` workers through Vite `?worker` constructors (`~/monaco/ts.worker?worker`, `monaco-editor/editor/editor.worker?worker`, `monaco-editor/language/json/json.worker?worker`), never `importScripts()` inside module workers | `eslint.config.mjs` (`no-restricted-syntax`), `scripts/verify-build.mjs` (`monaco-esm-worker`, `monaco-worker-chunks`) |
| Keep `pwa.workbox.navigateFallback: null` in `nuxt.config.ts` while `ssr: true` is active | `eslint.config.mjs` (`no-restricted-syntax`), `scripts/verify-build.mjs` (`sw-navigate-fallback`) |
| Define supported TypeScript and Monaco versions once in `app/monaco/versions.ts`, keeping `BUNDLED_TS_VERSION` and `BUNDLED_MONACO_VERSION` synced with installed `monaco-editor` | `eslint.config.mjs` (`no-restricted-syntax`), `scripts/verify-build.mjs` (`ts-versions-*`) |
| Keep `devDependencies.typescript` on `6.x` until `vue-tsc` and `monaco-editor` ship browser and language-service support for TypeScript 7 (`tsgo` native binaries do not expose `./lib/tsc` or a browser worker language service) | `pnpm run typecheck` (`vue-tsc`), `scripts/verify-build.mjs` |
