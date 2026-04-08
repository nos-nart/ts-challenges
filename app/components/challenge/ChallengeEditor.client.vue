<script setup lang="ts">
import type * as MonacoType from "monaco-editor";
import { setupMonaco } from "~/monaco/setup";

const props = defineProps<{
  modelValue: string;
  tests: string;
  readOnly?: boolean;
  path?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const editorRef = ref<HTMLDivElement | null>(null);
let monaco: typeof MonacoType;
let editor: MonacoType.editor.IStandaloneCodeEditor | null = null;
let model: MonacoType.editor.ITextModel | null = null;

defineExpose({
  getModel: () => model,
  format: () => {
    editor?.getAction("editor.action.formatDocument")?.run();
  },
});

const colorMode = useColorMode();

onMounted(async () => {
  const setup = await setupMonaco();
  monaco = setup.monaco;

  if (editorRef.value) {
    const uri = monaco.Uri.file(props.path || "challenge.ts");
    
    // Clean up existing model if it exists for this path
    const existingModel = monaco.editor.getModel(uri);
    if (existingModel) {
      existingModel.dispose();
    }

    model = monaco.editor.createModel(
      props.modelValue,
      "typescript",
      uri,
    );

    editor = monaco.editor.create(editorRef.value, {
      model,
      theme: colorMode.value === "dark" ? "vitesse-dark" : "vitesse-light",
      automaticLayout: true,
      fontSize: 14,
      readOnly: props.readOnly,
      domReadOnly: props.readOnly,
      minimap: { enabled: false },
      bracketPairColorization: {
        enabled: false,
      },
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      overviewRulerLanes: 0,
      fixedOverflowWidgets: true,
      fontFamily: "SF Mono, JetBrains Mono, Fira Code, monospace",
      padding: { top: 8 },
    });

    editor.onDidChangeModelContent(() => {
      emit("update:modelValue", editor?.getValue() || "");
    });
  }
});

watch(
  () => props.modelValue,
  (val) => {
    if (editor && val !== editor.getValue()) {
      editor.setValue(val);
    }
  },
);

watch(
  () => colorMode.value,
  (mode) => {
    if (monaco) {
      monaco.editor.setTheme(
        mode === "dark" ? "vitesse-dark" : "vitesse-light",
      );
    }
  },
);

onUnmounted(() => {
  editor?.dispose();
  model?.dispose();
});
</script>

<template>
  <div ref="editorRef" class="w-full h-full" />
</template>
