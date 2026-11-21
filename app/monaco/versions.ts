export interface TsVersionOption {
  readonly label: string
  readonly value: string
  readonly bundled: boolean
}

export const BUNDLED_TS_VERSION = '5.9.3'
export const BUNDLED_MONACO_VERSION = '0.56.0'

export const SUPPORTED_TS_VERSIONS: TsVersionOption[] = [
  { label: 'v6.0.3 (Latest)', value: '6.0.3', bundled: false },
  { label: 'v5.9.3', value: BUNDLED_TS_VERSION, bundled: true },
  { label: 'v5.8.3', value: '5.8.3', bundled: false },
  { label: 'v5.7.3', value: '5.7.3', bundled: false },
  { label: 'v5.6.3', value: '5.6.3', bundled: false },
  { label: 'v5.5.4', value: '5.5.4', bundled: false },
  { label: 'v5.4.5', value: '5.4.5', bundled: false },
  { label: 'v5.3.3', value: '5.3.3', bundled: false },
  { label: 'v5.2.2', value: '5.2.2', bundled: false },
  { label: 'v5.1.6', value: '5.1.6', bundled: false },
  { label: 'v5.0.4', value: '5.0.4', bundled: false },
  { label: 'v4.9.5', value: '4.9.5', bundled: false },
  { label: 'v4.5.5', value: '4.5.5', bundled: false },
  { label: 'v4.0.8', value: '4.0.8', bundled: false }
]

export const DEFAULT_TS_VERSION: TsVersionOption = SUPPORTED_TS_VERSIONS[0]!

export function resolveTsVersion(value?: string | null): TsVersionOption {
  if (!value) return DEFAULT_TS_VERSION
  return SUPPORTED_TS_VERSIONS.find(v => v.value === value) ?? DEFAULT_TS_VERSION
}
