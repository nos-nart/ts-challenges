<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  colorMode: {
    type: String,
    default: 'dark'
  }
})

const isDark = computed(() => props.colorMode === 'dark')
</script>

<template>
  <div
    class="w-full h-full flex flex-col p-16 justify-between relative"
    :style="{ backgroundColor: isDark ? '#030712' : '#ffffff', color: isDark ? '#ffffff' : '#111827' }"
  >
    <!-- Background Decor -->
    <div class="absolute inset-0 flex overflow-hidden opacity-20">
      <div 
        class="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-blue-500" 
        style="filter: blur(120px);"
      />
      <div 
        class="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] rounded-full bg-green-500" 
        style="filter: blur(120px);"
      />
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between relative">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-lg">
          <span class="text-white font-mono font-bold text-xl">TS</span>
        </div>
        <h2 class="text-2xl font-mono font-bold tracking-tight flex">
          TYPE<span class="text-blue-500" style="text-decoration: underline; text-underline-offset: 4px;">CHALLENGES</span>[]
        </h2>
      </div>
      <div 
        class="px-4 py-1.5 flex rounded-full border border-white/10 bg-white/5 text-sm font-medium opacity-80"
      >
        typescript-challenges.app
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col gap-6 relative">
      <h1 class="text-7xl font-bold leading-tight tracking-tight max-w-[90%]">
        {{ title }}
      </h1>
      <p 
        v-if="description" 
        class="text-3xl font-medium leading-relaxed text-gray-400 max-w-[80%]"
      >
        {{ description }}
      </p>
    </div>

    <!-- Footer -->
    <div class="flex items-center gap-8 relative">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-green-500" />
        <span class="text-xl font-medium text-gray-400">Interactive Practice</span>
      </div>
      <div class="w-[1px] h-6 bg-white/10" />
      <div class="text-xl font-medium text-blue-400">
        Master the Type System
      </div>
    </div>
  </div>
</template>
