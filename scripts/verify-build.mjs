import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []

function fail(code, message) {
  failures.push(`[${code}] ${message}`)
}

const monacoPkgPath = path.join(root, 'node_modules/monaco-editor/package.json')
const monacoMetaPath = path.join(
  root,
  'node_modules/monaco-editor/esm/vs/languages/features/typescript/lib/typescriptServicesMetadata.js'
)

const monacoPkg = JSON.parse(fs.readFileSync(monacoPkgPath, 'utf8'))
const monacoMeta = fs.readFileSync(monacoMetaPath, 'utf8')
const bundledTsMatch = monacoMeta.match(/typescriptVersion\s*=\s*"([^"]+)"/)
const bundledTsVersion = bundledTsMatch ? bundledTsMatch[1] : null

const versionsFile = path.join(root, 'app/monaco/versions.ts')
if (!fs.existsSync(versionsFile)) {
  fail(
    'ts-versions-source-of-truth',
    'Missing app/monaco/versions.ts. Define SUPPORTED_TS_VERSIONS in app/monaco/versions.ts instead of hand-syncing app/stores/ui.ts and app/monaco/setup.ts.'
  )
} else {
  const versionsSrc = fs.readFileSync(versionsFile, 'utf8')
  if (bundledTsVersion && !versionsSrc.includes(`BUNDLED_TS_VERSION = '${bundledTsVersion}'`)) {
    fail(
      'ts-versions-bundled-mismatch',
      `app/monaco/versions.ts BUNDLED_TS_VERSION does not match bundled TypeScript ${bundledTsVersion} from monaco-editor@${monacoPkg.version}.`
    )
  }
  if (!versionsSrc.includes(`BUNDLED_MONACO_VERSION = '${monacoPkg.version}'`)) {
    fail(
      'ts-versions-monaco-mismatch',
      `app/monaco/versions.ts BUNDLED_MONACO_VERSION does not match installed monaco-editor@${monacoPkg.version}.`
    )
  }
}

for (const rel of ['app/composables/useChallengeTester.ts', 'app/components/challenge/ChallengeEditor.client.vue', 'app/pages/index.vue']) {
  const full = path.join(root, rel)
  if (fs.existsSync(full)) {
    const src = fs.readFileSync(full, 'utf8')
    if (src.includes('languages.typescript')) {
      fail(
        'monaco-ts-namespace',
        `${rel} accesses monaco.languages.typescript directly (undefined in monaco-editor 0.56+). Use getMonacoTypeScript(monaco) from ~/monaco/setup.`
      )
    }
  }
}

const swPath = path.join(root, '.output/public/sw.js')
if (!fs.existsSync(swPath)) {
  fail('build-output-missing', 'Missing .output/public/sw.js. Run pnpm run build before verification.')
} else {
  const sw = fs.readFileSync(swPath, 'utf8')
  const hasRootFallback = sw.includes('createHandlerBoundToURL("/")') || sw.includes('createHandlerBoundToURL(\'/\')')
  const hasRootPrecache = /precacheAndRoute\(\[[^\]]*url:\s*["'](\/|index\.html)["']/.test(sw)
  if (hasRootFallback && !hasRootPrecache) {
    fail(
      'sw-navigate-fallback',
      '.output/public/sw.js binds NavigationRoute to "/" without "/" in precacheAndRoute. Set workbox.navigateFallback: null in nuxt.config.ts.'
    )
  }
}

const nuxtAssetsDir = path.join(root, '.output/public/_nuxt')
if (fs.existsSync(nuxtAssetsDir)) {
  const files = fs.readdirSync(nuxtAssetsDir).filter(f => f.endsWith('.js'))
  for (const file of files) {
    const content = fs.readFileSync(path.join(nuxtAssetsDir, file), 'utf8')
    if (
      content.includes('importScripts(')
      && (content.includes(`monaco-editor@${monacoPkg.version}`) || content.includes(`monaco-editor%40${monacoPkg.version}`))
    ) {
      fail(
        'monaco-esm-worker',
        `.output/public/_nuxt/${file} loads bundled monaco-editor@${monacoPkg.version} worker via importScripts() inside a module worker. Use Vite ?worker imports in MonacoEnvironment.getWorker in app/monaco/setup.ts.`
      )
    }
  }

  for (const workerPrefix of ['editor.worker', 'ts.worker', 'json.worker']) {
    if (!files.some(f => f.startsWith(workerPrefix))) {
      fail(
        'monaco-worker-chunks',
        `Missing bundled Vite worker chunk "${workerPrefix}-*.js" in .output/public/_nuxt/. Use ?worker imports in app/monaco/setup.ts.`
      )
    }
  }
}

if (failures.length > 0) {
  for (const msg of failures) {
    console.error(msg)
  }
  process.exit(1)
}

console.log(`Verified build invariants for monaco-editor@${monacoPkg.version} (bundled TypeScript ${bundledTsVersion}).`)
