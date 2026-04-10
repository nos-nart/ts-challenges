import type { Concept } from '~/types/challenge'

// Map of challenge slugs to their concept IDs
export const challengeMapping: Record<string, string[]> = {
  '4-easy-pick': ['mapped-types', 'indexed-access', 'generic-constraints'],
  '7-easy-readonly': ['readonly-modifier', 'mapped-types'],
  '11-easy-tuple-to-object': ['indexed-access', 'mapped-types'],
  '14-easy-first': ['indexed-access', 'conditional-types', 'infer-keyword'],
  '18-easy-tuple-length': ['indexed-access'],
  '43-easy-exclude': ['distributive-conditional-types'],
  '189-easy-awaited': ['recursive-types', 'infer-keyword', 'generic-constraints'],
  '268-easy-if': ['conditional-types'],
  '533-easy-concat': ['variadic-tuple-types'],
  '898-easy-includes': ['recursive-types', 'conditional-types'],
  '3057-easy-push': ['variadic-tuple-types'],
  '3060-easy-unshift': ['variadic-tuple-types'],
  '3312-easy-parameters': ['infer-keyword'],
  '2-medium-return-type': ['generic-constraints', 'infer-keyword'],
  '3-medium-omit': ['mapped-types', 'key-remapping'],
  '8-medium-readonly-2': ['mapped-types', 'intersection-types'],
  '9-medium-deep-readonly': ['mapped-types', 'recursive-types'],
  '10-medium-tuple-to-union': ['indexed-access']
}

// Titles that need manual overrides
export const titleOverrides: Record<string, string> = {
  'zhao-chu-mu-biao-shu-zu-zhong-zhi-chu-xian-guo-yi-ci-de-yuan-su': 'Appear Only Once',
  'tong-ji-shu-zu-zhong-de-yuan-su-ge-shu': 'Count Element Number To Object',
  'zu-he-jian-lei-xing-combination-key-type': 'Combination Key Type',
  'sui-ji-shu-zu': 'Random Array',
  'huo-qu-shu-zu-de-zhong-jian-yuan-su': 'Get Middle Element',
  'shu-zu-zhong-yuan-su-de-chu-xian-ci-shu': 'Element Appearance Count',
  'currying1': 'Currying 1',
  'camelcase': 'CamelCase',
  'kebabcase': 'KebabCase',
  'snakecase': 'SnakeCase',
  'pascalcase': 'PascalCase',
  'currying-1': 'Currying 1',
  'union-to-intersection': 'Union to Intersection',
  'defined-partial-record': 'Defined Partial Record',
  'my-uppercase': 'MyUppercase',
  'string-to-number': 'String to Number',
  'vue-basic-props': 'Vue Basic Props',
  'c-printf-parser': 'C Printf Parser',
  'maptypes': 'MapTypes',
  'indexof': 'IndexOf',
  'subsequence': 'Subsequence',
  'firstuniquecharindex': 'FirstUniqueCharIndex',
  'checkrepeatedchars': 'CheckRepeatedChars',
  'isequal': 'IsEqual',
  'anyof': 'AnyOf',
  'allof': 'AllOf',
  'isunion': 'IsUnion',
  'isnever': 'IsNever',
  'lastindexof': 'LastIndexOf',
  'replacekeys': 'ReplaceKeys',
  'startswith': 'StartsWith',
  'endswith': 'EndsWith',
  'minusone': 'MinusOne',
  'pickbytype': 'PickByType',
  'omitbytype': 'OmitByType',
  'partialbykeys': 'PartialByKeys',
  'requiredbykeys': 'RequiredByKeys',
  'mutablebykeys': 'MutableByKeys',
  'readonly2': 'Readonly 2',
  'deepreadonly': 'DeepReadonly',
  'deeppartial': 'DeepPartial',
  'tupletoobject': 'TupleToObject',
  'tupletointersections': 'TupleToIntersection',
  'tupletounion': 'TupleToUnion',
  'stringtointersections': 'StringToIntersection',
  'stringtounion': 'StringToUnion',
  'cartesianproduct': 'CartesianProduct',
  'checkrepeatedtuple': 'CheckRepeatedTuple',
  'extracttoobject': 'ExtractToObject',
  'capitalizewords': 'CapitalizeWords',
  'deeppick': 'DeepPick',
  'classpublickeys': 'ClassPublicKeys',
  'isrequiredkey': 'IsRequiredKey',
  'objectfromentries': 'ObjectFromEntries',
  'ispalindrome': 'IsPalindrome',
  'isnegativenumber': 'IsNegativeNumber',
  'optionalundefined': 'OptionalUndefined',
  'bitwisexor': 'BitwiseXor',
  'distributeunions': 'DistributeUnions',
  'countreversepairs': 'CountReversePairs',
  'replaceall': 'ReplaceAll',
  'objectentries': 'ObjectEntries',
  'inordertraversal': 'InOrderTraversal',
  'istuple': 'IsTuple',
  'myuppercase': 'MyUppercase'
}

// Concept metadata (excluding content)
export const conceptMetadata: Record<string, Omit<Concept, 'content'>> = {
  'mapped-types': { id: 'mapped-types', title: 'Mapped Types' },
  'indexed-access': { id: 'indexed-access', title: 'Indexed Access' },
  'generic-constraints': { id: 'generic-constraints', title: 'Generic Constraints' },
  'readonly-modifier': { id: 'readonly-modifier', title: 'Readonly Modifier' },
  'infer-keyword': { id: 'infer-keyword', title: 'The infer Keyword' },
  'key-remapping': { id: 'key-remapping', title: 'Key Remapping (as)' },
  'intersection-types': { id: 'intersection-types', title: 'Intersection Types (&)' },
  'recursive-types': { id: 'recursive-types', title: 'Recursive Types' },
  'conditional-types': { id: 'conditional-types', title: 'Conditional Types' },
  'distributive-conditional-types': { id: 'distributive-conditional-types', title: 'Distributive Conditional Types' },
  'variadic-tuple-types': { id: 'variadic-tuple-types', title: 'Variadic Tuple Types' }
}

// Dynamically load Markdown content
const hintFiles = import.meta.glob('./hints/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})
const conceptFiles = import.meta.glob('./concepts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

export const getHintContent = (slug: string): string | undefined => {
  const path = `./hints/${slug}.md`
  return (hintFiles[path] as string) || undefined
}

export const getConceptContent = (id: string): string | undefined => {
  const path = `./concepts/${id}.md`
  return (conceptFiles[path] as string) || undefined
}

export const getConcept = (id: string): Concept | undefined => {
  const meta = conceptMetadata[id]
  if (!meta) return undefined

  return {
    ...meta,
    content: getConceptContent(id) || 'Content coming soon...'
  }
}
