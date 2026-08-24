import type { Concept } from '~/types/challenge'

// Map of challenge slugs to their concept IDs
export const challengeMapping: Record<string, string[]> = {
  '2-medium-return-type': [
    'generic-constraints',
    'infer-keyword'
  ],
  '3-medium-omit': [
    'mapped-types',
    'key-remapping'
  ],
  '4-easy-pick': [
    'mapped-types',
    'indexed-access',
    'generic-constraints'
  ],
  '5-extreme-readonly-keys': [
    'mapped-types',
    'key-remapping',
    'readonly-modifier'
  ],
  '6-hard-simple-vue': [
    'generic-constraints',
    'mapped-types'
  ],
  '7-easy-readonly': [
    'readonly-modifier',
    'mapped-types'
  ],
  '8-medium-readonly-2': [
    'mapped-types',
    'intersection-types'
  ],
  '9-medium-deep-readonly': [
    'mapped-types',
    'recursive-types'
  ],
  '10-medium-tuple-to-union': [
    'indexed-access'
  ],
  '11-easy-tuple-to-object': [
    'indexed-access',
    'mapped-types'
  ],
  '12-medium-chainable-options': [
    'generic-constraints',
    'intersection-types',
    'mapped-types'
  ],
  '13-warm-hello-world': [
    'conditional-types'
  ],
  '14-easy-first': [
    'indexed-access',
    'conditional-types',
    'infer-keyword'
  ],
  '15-medium-last': [
    'variadic-tuple-types',
    'infer-keyword'
  ],
  '16-medium-pop': [
    'variadic-tuple-types',
    'infer-keyword'
  ],
  '17-hard-currying-1': [
    'infer-keyword',
    'variadic-tuple-types',
    'recursive-types'
  ],
  '18-easy-tuple-length': [
    'indexed-access'
  ],
  '20-medium-promise-all': [
    'variadic-tuple-types',
    'infer-keyword',
    'mapped-types'
  ],
  '43-easy-exclude': [
    'distributive-conditional-types'
  ],
  '55-hard-union-to-intersection': [
    'union-to-intersection',
    'distributive-conditional-types'
  ],
  '57-hard-get-required': [
    'mapped-types',
    'key-remapping'
  ],
  '59-hard-get-optional': [
    'mapped-types',
    'key-remapping'
  ],
  '62-medium-type-lookup': [
    'distributive-conditional-types',
    'union-types'
  ],
  '89-hard-required-keys': [
    'mapped-types',
    'key-remapping'
  ],
  '90-hard-optional-keys': [
    'mapped-types',
    'key-remapping'
  ],
  '106-medium-trimleft': [
    'template-literal-types',
    'recursive-types'
  ],
  '108-medium-trim': [
    'template-literal-types',
    'recursive-types'
  ],
  '110-medium-capitalize': [
    'template-literal-types',
    'infer-keyword'
  ],
  '112-hard-capitalizewords': [
    'template-literal-types',
    'recursive-types'
  ],
  '114-hard-camelcase': [
    'template-literal-types',
    'recursive-types'
  ],
  '116-medium-replace': [
    'template-literal-types',
    'infer-keyword'
  ],
  '119-medium-replaceall': [
    'template-literal-types',
    'recursive-types'
  ],
  '147-hard-c-printf-parser': [
    'template-literal-types',
    'recursive-types'
  ],
  '151-extreme-query-string-parser': [
    'template-literal-types',
    'mapped-types',
    'recursive-types'
  ],
  '189-easy-awaited': [
    'recursive-types',
    'infer-keyword',
    'generic-constraints'
  ],
  '191-medium-append-argument': [
    'infer-keyword',
    'variadic-tuple-types'
  ],
  '213-hard-vue-basic-props': [
    'generic-constraints',
    'mapped-types'
  ],
  '216-extreme-slice': [
    'variadic-tuple-types',
    'tuple-length-arithmetic'
  ],
  '223-hard-isany': [
    'any-type',
    'conditional-types'
  ],
  '268-easy-if': [
    'conditional-types'
  ],
  '270-hard-typed-get': [
    'indexed-access',
    'recursive-types',
    'template-literal-types'
  ],
  '274-extreme-integers-comparator': [
    'tuple-length-arithmetic',
    'template-literal-types'
  ],
  '296-medium-permutation': [
    'distributive-conditional-types',
    'never-type',
    'recursive-types'
  ],
  '298-medium-length-of-string': [
    'template-literal-types',
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '300-hard-string-to-number': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '399-hard-tuple-filter': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '459-medium-flatten': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '462-extreme-currying-2': [
    'infer-keyword',
    'variadic-tuple-types',
    'recursive-types'
  ],
  '472-hard-tuple-to-enum-object': [
    'mapped-types',
    'tuple-length-arithmetic'
  ],
  '476-extreme-sum': [
    'tuple-length-arithmetic',
    'template-literal-types',
    'recursive-types'
  ],
  '517-extreme-multiply': [
    'tuple-length-arithmetic',
    'template-literal-types',
    'recursive-types'
  ],
  '527-medium-append-to-object': [
    'mapped-types',
    'property-key'
  ],
  '529-medium-absolute': [
    'template-literal-types',
    'infer-keyword'
  ],
  '531-medium-string-to-union': [
    'template-literal-types',
    'union-types',
    'recursive-types'
  ],
  '533-easy-concat': [
    'variadic-tuple-types'
  ],
  '545-hard-printf': [
    'template-literal-types',
    'recursive-types'
  ],
  '553-hard-deep-object-to-unique': [
    'mapped-types',
    'recursive-types'
  ],
  '599-medium-merge': [
    'mapped-types',
    'property-key'
  ],
  '612-medium-kebabcase': [
    'template-literal-types',
    'recursive-types'
  ],
  '645-medium-diff': [
    'mapped-types',
    'key-remapping'
  ],
  '651-hard-length-of-string-2': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '697-extreme-tag': [
    'mapped-types',
    'recursive-types'
  ],
  '730-hard-union-to-tuple': [
    'union-to-tuple',
    'union-to-intersection'
  ],
  '734-extreme-inclusive-range': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '741-extreme-sort': [
    'tuple-length-arithmetic',
    'recursive-types',
    'variadic-tuple-types'
  ],
  '847-hard-string-join': [
    'template-literal-types',
    'generic-constraints'
  ],
  '869-extreme-distributeunions': [
    'distributive-conditional-types',
    'recursive-types'
  ],
  '898-easy-includes': [
    'recursive-types',
    'conditional-types'
  ],
  '925-extreme-assert-array-index': [
    'variadic-tuple-types',
    'tuple-length-arithmetic'
  ],
  '949-medium-anyof': [
    'conditional-types',
    'indexed-access'
  ],
  '956-hard-deeppick': [
    'union-to-intersection',
    'mapped-types',
    'recursive-types'
  ],
  '1042-medium-isnever': [
    'never-type',
    'conditional-types'
  ],
  '1097-medium-isunion': [
    'distributive-conditional-types',
    'never-type'
  ],
  '1130-medium-replacekeys': [
    'mapped-types',
    'distributive-conditional-types'
  ],
  '1290-hard-pinia': [
    'generic-constraints',
    'mapped-types'
  ],
  '1367-medium-remove-index-signature': [
    'mapped-types',
    'key-remapping'
  ],
  '1383-hard-camelize': [
    'mapped-types',
    'recursive-types',
    'template-literal-types'
  ],
  '1978-medium-percentage-parser': [
    'template-literal-types',
    'infer-keyword'
  ],
  '2059-hard-drop-string': [
    'template-literal-types',
    'recursive-types'
  ],
  '2070-medium-drop-char': [
    'template-literal-types',
    'recursive-types'
  ],
  '2257-medium-minusone': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '2595-medium-pickbytype': [
    'mapped-types',
    'key-remapping'
  ],
  '2688-medium-startswith': [
    'template-literal-types'
  ],
  '2693-medium-endswith': [
    'template-literal-types'
  ],
  '2757-medium-partialbykeys': [
    'mapped-types',
    'intersection-types'
  ],
  '2759-medium-requiredbykeys': [
    'mapped-types',
    'intersection-types'
  ],
  '2793-medium-mutable': [
    'modifier-manipulation',
    'mapped-types'
  ],
  '2822-hard-split': [
    'template-literal-types',
    'recursive-types'
  ],
  '2828-hard-classpublickeys': [
    'mapped-types',
    'key-remapping'
  ],
  '2852-medium-omitbytype': [
    'mapped-types',
    'key-remapping'
  ],
  '2857-hard-isrequiredkey': [
    'mapped-types',
    'conditional-types'
  ],
  '2946-medium-objectentries': [
    'mapped-types',
    'key-remapping'
  ],
  '2949-hard-objectfromentries': [
    'union-to-intersection',
    'mapped-types'
  ],
  '3057-easy-push': [
    'variadic-tuple-types'
  ],
  '3060-easy-unshift': [
    'variadic-tuple-types'
  ],
  '3062-medium-shift': [
    'variadic-tuple-types',
    'infer-keyword'
  ],
  '3188-medium-tuple-to-nested-object': [
    'recursive-types',
    'mapped-types'
  ],
  '3192-medium-reverse': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '3196-medium-flip-arguments': [
    'infer-keyword',
    'variadic-tuple-types'
  ],
  '3243-medium-flattendepth': [
    'variadic-tuple-types',
    'recursive-types',
    'tuple-length-arithmetic'
  ],
  '3312-easy-parameters': [
    'infer-keyword'
  ],
  '3326-medium-bem-style-string': [
    'template-literal-types',
    'union-types'
  ],
  '3376-medium-inordertraversal': [
    'recursive-types',
    'conditional-types'
  ],
  '4037-hard-ispalindrome': [
    'template-literal-types',
    'recursive-types'
  ],
  '4179-medium-flip': [
    'mapped-types',
    'key-remapping',
    'property-key'
  ],
  '4182-medium-fibonacci-sequence': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '4260-medium-nomiwase': [
    'template-literal-types',
    'union-types'
  ],
  '4425-medium-greater-than': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '4471-medium-zip': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '4484-medium-istuple': [
    'variadic-tuple-types',
    'never-type'
  ],
  '4499-medium-chunk': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '4518-medium-fill': [
    'variadic-tuple-types',
    'tuple-length-arithmetic'
  ],
  '4803-medium-trim-right': [
    'template-literal-types',
    'recursive-types'
  ],
  '5117-medium-without': [
    'variadic-tuple-types',
    'distributive-conditional-types'
  ],
  '5140-medium-trunc': [
    'template-literal-types'
  ],
  '5153-medium-indexof': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '5181-hard-mutable-keys': [
    'modifier-manipulation',
    'conditional-types'
  ],
  '5310-medium-join': [
    'template-literal-types',
    'recursive-types'
  ],
  '5317-medium-lastindexof': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '5360-medium-unique': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '5423-hard-intersection': [
    'variadic-tuple-types',
    'distributive-conditional-types'
  ],
  '5821-medium-maptypes': [
    'mapped-types',
    'key-remapping'
  ],
  '6141-hard-binary-to-decimal': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '6228-extreme-json-parser': [
    'template-literal-types',
    'recursive-types',
    'mapped-types'
  ],
  '7258-hard-object-key-paths': [
    'mapped-types',
    'template-literal-types',
    'recursive-types'
  ],
  '7544-medium-construct-tuple': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '7561-extreme-subtract': [
    'tuple-length-arithmetic',
    'template-literal-types',
    'recursive-types'
  ],
  '8640-medium-number-range': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '8767-medium-combination': [
    'template-literal-types',
    'union-types'
  ],
  '8804-hard-two-sum': [
    'tuple-length-arithmetic',
    'variadic-tuple-types'
  ],
  '8987-medium-subsequence': [
    'variadic-tuple-types',
    'union-types'
  ],
  '9142-medium-checkrepeatedchars': [
    'template-literal-types',
    'recursive-types'
  ],
  '9155-hard-validdate': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '9160-hard-assign': [
    'mapped-types',
    'recursive-types'
  ],
  '9286-medium-firstuniquecharindex': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '9384-hard-maximum': [
    'tuple-length-arithmetic',
    'variadic-tuple-types'
  ],
  '9616-medium-parse-url-params': [
    'template-literal-types',
    'union-types'
  ],
  '9775-hard-capitalize-nest-object-keys': [
    'mapped-types',
    'recursive-types'
  ],
  '9896-medium-get-middle-element': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '9898-medium-zhao-chu-mu-biao-shu-zu-zhong-zhi-chu-xian-guo-yi-ci-de-yuan-su': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '9989-medium-tong-ji-shu-zu-zhong-de-yuan-su-ge-shu': [
    'mapped-types',
    'tuple-length-arithmetic'
  ],
  '10969-medium-integer': [
    'template-literal-types',
    'conditional-types'
  ],
  '13580-hard-replace-union': [
    'distributive-conditional-types',
    'union-types'
  ],
  '14080-hard-fizzbuzz': [
    'tuple-length-arithmetic',
    'template-literal-types'
  ],
  '14188-hard-run-length-encoding': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '15260-hard-tree-path-array': [
    'recursive-types',
    'variadic-tuple-types'
  ],
  '16259-medium-to-primitive': [
    'mapped-types',
    'recursive-types'
  ],
  '17973-medium-deepmutable': [
    'modifier-manipulation',
    'recursive-types'
  ],
  '18142-medium-all': [
    'variadic-tuple-types',
    'conditional-types'
  ],
  '18220-medium-filter': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '19458-hard-snakecase': [
    'template-literal-types',
    'recursive-types'
  ],
  '19749-medium-isequal': [
    'conditional-types',
    'any-type'
  ],
  '21104-medium-findall': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '21106-medium-zu-he-jian-lei-xing-combination-key-type': [
    'template-literal-types',
    'union-types'
  ],
  '21220-medium-permutations-of-tuple': [
    'variadic-tuple-types',
    'union-types'
  ],
  '25170-medium-replace-first': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '25270-medium-transpose': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '25747-hard-isnegativenumber': [
    'template-literal-types',
    'conditional-types'
  ],
  '26401-medium-json-schema-to-typescript': [
    'mapped-types',
    'recursive-types'
  ],
  '27133-medium-square': [
    'tuple-length-arithmetic',
    'template-literal-types'
  ],
  '27152-medium-triangular-number': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '27862-medium-cartesianproduct': [
    'union-types',
    'distributive-conditional-types'
  ],
  '27932-medium-mergeall': [
    'mapped-types',
    'recursive-types'
  ],
  '27958-medium-checkrepeatedtuple': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '28143-hard-optionalundefined': [
    'mapped-types',
    'key-remapping'
  ],
  '28333-medium-public-type': [
    'mapped-types',
    'key-remapping'
  ],
  '29650-medium-extracttoobject': [
    'mapped-types',
    'key-remapping'
  ],
  '29785-medium-deep-omit': [
    'mapped-types',
    'recursive-types'
  ],
  '30178-hard-unique-items': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '30301-medium-isodd': [
    'template-literal-types',
    'conditional-types'
  ],
  '30430-medium-tower-of-hanoi': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '30575-hard-bitwisexor': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '30958-medium-pascals-triangle': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '30970-medium-shitariteraru': [
    'template-literal-types',
    'recursive-types'
  ],
  '31447-extreme-countreversepairs': [
    'tuple-length-arithmetic',
    'variadic-tuple-types'
  ],
  '31797-hard-sudoku': [
    'tuple-length-arithmetic',
    'recursive-types'
  ],
  '31824-hard-length-of-string-3': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '31997-extreme-parameter-intersection': [
    'union-to-intersection',
    'infer-keyword'
  ],
  '32427-hard-unbox': [
    'infer-keyword',
    'recursive-types'
  ],
  '32532-hard-binary-addition': [
    'template-literal-types',
    'tuple-length-arithmetic'
  ],
  '33345-extreme-dynamic-route': [
    'template-literal-types',
    'recursive-types',
    'mapped-types'
  ],
  '33763-hard-union-to-object-from-key': [
    'union-to-intersection',
    'mapped-types'
  ],
  '34007-medium-compare-array-length': [
    'variadic-tuple-types',
    'tuple-length-arithmetic'
  ],
  '34286-hard-take-elements': [
    'variadic-tuple-types',
    'tuple-length-arithmetic'
  ],
  '34857-medium-defined-partial-record': [
    'mapped-types',
    'key-remapping'
  ],
  '35045-medium-longest-common-prefix': [
    'template-literal-types',
    'recursive-types'
  ],
  '35191-medium-trace': [
    'variadic-tuple-types',
    'tuple-length-arithmetic'
  ],
  '35252-medium-isalphabet': [
    'template-literal-types',
    'conditional-types'
  ],
  '35314-hard-valid-sudoku': [
    'variadic-tuple-types',
    'recursive-types'
  ],
  '35991-medium-myuppercase': [
    'template-literal-types',
    'mapped-types'
  ]
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
  'mapped-types': {
    id: 'mapped-types',
    title: 'Mapped Types'
  },
  'indexed-access': {
    id: 'indexed-access',
    title: 'Indexed Access'
  },
  'generic-constraints': {
    id: 'generic-constraints',
    title: 'Generic Constraints'
  },
  'readonly-modifier': {
    id: 'readonly-modifier',
    title: 'Readonly Modifier'
  },
  'infer-keyword': {
    id: 'infer-keyword',
    title: 'The infer Keyword'
  },
  'key-remapping': {
    id: 'key-remapping',
    title: 'Key Remapping (as)'
  },
  'intersection-types': {
    id: 'intersection-types',
    title: 'Intersection Types (&)'
  },
  'recursive-types': {
    id: 'recursive-types',
    title: 'Recursive Types'
  },
  'conditional-types': {
    id: 'conditional-types',
    title: 'Conditional Types'
  },
  'distributive-conditional-types': {
    id: 'distributive-conditional-types',
    title: 'Distributive Conditional Types'
  },
  'variadic-tuple-types': {
    id: 'variadic-tuple-types',
    title: 'Variadic Tuple Types'
  },
  'template-literal-types': {
    id: 'template-literal-types',
    title: 'Template Literal Types'
  },
  'never-type': {
    id: 'never-type',
    title: 'The never Type'
  },
  'any-type': {
    id: 'any-type',
    title: 'The any & unknown Types'
  },
  'tuple-length-arithmetic': {
    id: 'tuple-length-arithmetic',
    title: 'Tuple Length Arithmetic'
  },
  'union-to-intersection': {
    id: 'union-to-intersection',
    title: 'Union to Intersection'
  },
  'union-to-tuple': {
    id: 'union-to-tuple',
    title: 'Union to Tuple'
  },
  'property-key': {
    id: 'property-key',
    title: 'PropertyKey & Object Keys'
  },
  'modifier-manipulation': {
    id: 'modifier-manipulation',
    title: 'Mapping Modifiers (+ / -)'
  },
  'union-types': {
    id: 'union-types',
    title: 'Union Types'
  },
  'const-type-parameters': {
    id: 'const-type-parameters',
    title: 'Const Type Parameters (const T)'
  }
}

export const getHintContent = async (slug: string): Promise<string | undefined> => {
  const res = await fetch(`/data/hints/${slug}.md`)
  return res.ok ? await res.text() : undefined
}

export const getConceptContent = async (id: string): Promise<string | undefined> => {
  const res = await fetch(`/data/concepts/${id}.md`)
  return res.ok ? await res.text() : undefined
}

export const getConcept = async (id: string): Promise<Concept | undefined> => {
  const meta = conceptMetadata[id]
  if (!meta) return undefined

  return {
    ...meta,
    content: (await getConceptContent(id)) || 'Content coming soon...'
  }
}
