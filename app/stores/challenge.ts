import { defineStore } from "pinia";

export interface Challenge {
  name: string;
  path: string;
  difficulty: string;
  title: string;
  readme?: string;
  template?: string;
  tests?: string;
  concepts?: string[];
  hint?: string; // New property for hints
}

// Map of hints for challenges
const challengeHints: Record<string, string> = {
  "4-easy-pick": `
- Try using a **Mapped Type** to create the new object.
- You'll need to use \`keyof T\` to get all keys of the original object.
- Use a generic constraint (\`extends\`) to ensure the keys being picked actually exist on \`T\`.
  `,
  "7-easy-readonly": `
- Use a **Mapped Type** to iterate over the keys.
- Add the \`readonly\` modifier before the key mapping: \`{ readonly [P in keyof T]: ... }\`.
  `,
  "11-easy-tuple-to-object": `
- Remember that you can access all values of a tuple using \`T[number]\`.
- Use that union of values as the keys for your new Mapped Type.
  `,
  "14-easy-first": `
- You can check if an array is empty using a conditional type: \`T extends []\`.
- Alternatively, try accessing the first element via \`T[0]\`.
  `,
};

export interface Concept {
  id: string;
  title: string;
  content: string; // Full Markdown content
}

const conceptLibrary: Record<string, Concept> = {
  "mapped-types": {
    id: "mapped-types",
    title: "Mapped Types",
    content: `
Mapped types allow you to create new types based on the properties of existing ones. They are a powerful tool for transforming object structures.

#### Syntax
\`\`\`ts
type Mapped<T> = {
  [P in keyof T]: T[P]
}
\`\`\`

#### Key Modifiers
- **readonly**: Makes properties immutable.
- **?**: Makes properties optional.
- **-** (minus): Removes a modifier (e.g., \`-readonly\` or \`-?\`).

#### References
- [Official Handbook: Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Total TypeScript: Mapped Types](https://www.totaltypescript.com/concepts/mapped-types)
    `,
  },
  "indexed-access": {
    id: "indexed-access",
    title: "Indexed Access",
    content: `
Indexed access types allow you to look up a specific property on another type, similar to how you access an object property at runtime.

#### Example
\`\`\`ts
type Person = { age: number; name: string };
type Age = Person["age"]; // number
\`\`\`

#### Using with Unions
You can use a union of keys to get a union of values:
\`\`\`ts
type Values = Person["age" | "name"]; // string | number
\`\`\`

#### References
- [Official Handbook: Indexed Access](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
    `,
  },
  "generic-constraints": {
    id: "generic-constraints",
    title: "Generic Constraints",
    content: `
Constraints allow you to restrict the types that can be passed to a generic parameter using the \`extends\` keyword.

#### Why use them?
Sometimes you want to write a generic function that works on a set of types where you know a certain property exists.

#### Syntax
\`\`\`ts
function loggingIdentity<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

#### References
- [Official Handbook: Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
    `,
  },
};

const challengeMapping: Record<string, string[]> = {
  "4-easy-pick": ["mapped-types", "indexed-access", "generic-constraints"],
  "7-easy-readonly": ["readonly-modifier", "mapped-types"],
  "11-easy-tuple-to-object": ["indexed-access", "mapped-types"],
  "14-easy-first": ["indexed-access"],
};

// Clean mapping for challenges with weird/pinyin folder names or difficult formatting
const titleOverrides: Record<string, string> = {
  "zhao-chu-mu-biao-shu-zu-zhong-zhi-chu-xian-guo-yi-ci-de-yuan-su":
    "Appear Only Once",
  "tong-ji-shu-zu-zhong-de-yuan-su-ge-shu": "Count Element Number To Object",
  "zu-he-jian-lei-xing-combination-key-type": "Combination Key Type",
  "sui-ji-shu-zu": "Random Array",
  "huo-qu-shu-zu-de-zhong-jian-yuan-su": "Get Middle Element",
  "shu-zu-zhong-yuan-su-de-chu-xian-ci-shu": "Element Appearance Count",
  currying1: "Currying 1",
  camelcase: "CamelCase",
  kebabcase: "KebabCase",
  snakecase: "SnakeCase",
  pascalcase: "PascalCase",
  "currying-1": "Currying 1",
  "union-to-intersection": "Union to Intersection",
  "defined-partial-record": "Defined Partial Record",
  "my-uppercase": "MyUppercase",
  "string-to-number": "String to Number",
  "vue-basic-props": "Vue Basic Props",
  "c-printf-parser": "C Printf Parser",
  maptypes: "MapTypes",
  indexof: "IndexOf",
  subsequence: "Subsequence",
  firstuniquecharindex: "FirstUniqueCharIndex",
  checkrepeatedchars: "CheckRepeatedChars",
  isequal: "IsEqual",
  anyof: "AnyOf",
  allof: "AllOf",
  isunion: "IsUnion",
  isnever: "IsNever",
  lastindexof: "LastIndexOf",
  replacekeys: "ReplaceKeys",
  startswith: "StartsWith",
  endswith: "EndsWith",
  minusone: "MinusOne",
  pickbytype: "PickByType",
  omitbytype: "OmitByType",
  partialbykeys: "PartialByKeys",
  requiredbykeys: "RequiredByKeys",
  mutablebykeys: "MutableByKeys",
  readonly2: "Readonly 2",
  deepreadonly: "DeepReadonly",
  deeppartial: "DeepPartial",
  tupletoobject: "TupleToObject",
  tupletointersections: "TupleToIntersection",
  tupletounion: "TupleToUnion",
  stringtointersections: "StringToIntersection",
  stringtounion: "StringToUnion",
  cartesianproduct: "CartesianProduct",
  checkrepeatedtuple: "CheckRepeatedTuple",
  extracttoobject: "ExtractToObject",
  capitalizewords: "CapitalizeWords",
  deeppick: "DeepPick",
  classpublickeys: "ClassPublicKeys",
  isrequiredkey: "IsRequiredKey",
  objectfromentries: "ObjectFromEntries",
  ispalindrome: "IsPalindrome",
  isnegativenumber: "IsNegativeNumber",
  optionalundefined: "OptionalUndefined",
  bitwisexor: "BitwiseXor",
  distributeunions: "DistributeUnions",
  countreversepairs: "CountReversePairs",
  replaceall: "ReplaceAll",
  objectentries: "ObjectEntries",
  inordertraversal: "InOrderTraversal",
  istuple: "IsTuple",
  myuppercase: "MyUppercase",
};

function formatTitle(slug: string) {
  // 1. Check for manual overrides
  if (titleOverrides[slug]) return titleOverrides[slug];

  // 2. Standard formatting
  return slug
    .split("-")
    .map((part) => {
      // Special handling for common TS words that should remain capitalized
      const special = ["vue", "bem", "id", "ts", "js"];
      if (special.includes(part.toLowerCase())) return part.toUpperCase();

      // Capitalize first letter, keep rest as is
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

export const useChallengeStore = defineStore("challenge", () => {
  const challenges = ref<Challenge[]>([]);
  const currentChallenge = ref<Challenge | null>(null);
  const listLoading = ref(false);
  const detailsLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchChallenges() {
    listLoading.value = true;
    try {
      const response = await fetch(
        "https://api.github.com/repos/type-challenges/type-challenges/contents/questions",
      );
      const data = await response.json();
      challenges.value = data.map((item: any) => {
        const parts = item.name.split("-");
        const id = parts.shift();
        const difficulty = parts.shift();
        const slug = parts.join("-");

        return {
          name: item.name,
          path: item.path,
          difficulty,
          title: formatTitle(slug),
          concepts: challengeMapping[item.name] || [],
        };
      });
    } catch (e: any) {
      error.value = e.message;
    } finally {
      listLoading.value = false;
    }
  }

  async function selectChallenge(challenge: Challenge) {
    detailsLoading.value = true;
    try {
      const [readme, template, tests] = await Promise.all([
        fetch(
          `https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/${challenge.name}/README.md`,
        ).then((r) => r.text()),
        fetch(
          `https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/${challenge.name}/template.ts`,
        ).then((r) => r.text()),
        fetch(
          `https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/${challenge.name}/test-cases.ts`,
        ).then((r) => r.text()),
      ]);

      currentChallenge.value = {
        ...challenge,
        readme,
        template,
        tests,
        hint:
          challengeHints[challenge.name] ||
          `
- Think about the core TypeScript features that might apply here.
- Check the **Learn** tab for syntax deep-dives.
- Break the problem into smaller steps: what is the input, and what exactly is the expected output?
        `,
      };
    } catch (e: any) {
      error.value = e.message;
    } finally {
      detailsLoading.value = false;
    }
  }

  const activeConcepts = computed(() => {
    if (!currentChallenge.value?.concepts) return [];
    return currentChallenge.value.concepts
      .map((id) => conceptLibrary[id])
      .filter(Boolean);
  });

  return {
    challenges,
    currentChallenge,
    activeConcepts,
    listLoading,
    detailsLoading,
    error,
    fetchChallenges,
    selectChallenge,
  };
});
