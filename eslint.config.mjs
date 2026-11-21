// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['app/data/challenges/**']
  },
  {
    files: ['nuxt.config.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Property[key.name="navigateFallback"][value.value="/"]',
          message: 'Set workbox.navigateFallback to null in nuxt.config.ts when ssr is true (/ is not precached).'
        }
      ]
    }
  },
  {
    files: ['app/**/*.ts', 'app/**/*.vue'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MemberExpression[property.name="typescript"][object.property.name="languages"], MemberExpression[property.name="typescript"][object.name="languages"]',
          message: 'Use getMonacoTypeScript(monaco) from ~/monaco/setup instead of monaco.languages.typescript (moved to monaco.typescript in monaco-editor 0.56+).'
        },
        {
          selector: 'VariableDeclarator[id.name="supportedTsVersions"][init.type="ArrayExpression"]',
          message: 'Import SUPPORTED_TS_VERSIONS from ~/monaco/versions instead of defining an inline version list.'
        },
        {
          selector: 'VariableDeclarator[id.name="versionMap"]',
          message: 'Import resolveTsVersion from ~/monaco/versions instead of defining a duplicate versionMap.'
        },
        {
          selector: 'Literal[value=/^monaco-editor\\/esm\\/vs\\//]',
          message: 'Use "monaco-editor/<path>?worker" instead of "monaco-editor/esm/vs/<path>?worker" (monaco-editor 0.56+ exports map "./*" to "./esm/vs/*.js").'
        }
      ]
    }
  }
)
