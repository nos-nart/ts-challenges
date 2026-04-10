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
    class="w-full h-full flex flex-col p-16 justify-between"
    :class="isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'"
  >
    <!-- Background Decor -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div class="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full blur-[120px] bg-blue-500/30" />
      <div class="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] rounded-full blur-[120px] bg-green-500/20" />
    </div>

    <!-- Header -->
    <div class="relative z-10 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
          <span class="text-white font-mono font-bold text-xl">TS</span>
        </div>
        <h2 class="text-2xl font-mono font-bold tracking-tight">
          TYPE<span class="text-blue-500 underline underline-offset-4 decoration-red-500 decoration-wavy">CHALLENGES</span>[]
        </h2>
      </div>
      <div class="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium opacity-80">
        typescript-challenges.app
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col gap-6">
      <h1 class="text-7xl font-bold leading-tight tracking-tight max-w-[90%]">
        {{ title }}
      </h1>
      <p v-if="description" class="text-3xl text-gray-400 font-medium max-w-[80%] leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- Footer -->
    <div class="relative z-10 flex items-center gap-8">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <span class="text-xl font-medium text-gray-400">Interactive Practice</span>
      </div>
      <div class="w-px h-6 bg-white/10" />
      <div class="text-xl font-medium text-blue-400">
        Master the Type System
      </div>
    </div>
  </div>
</template>

<style scoped>
.decoration-wavy {
  text-decoration-style: wavy;
}
</style>
