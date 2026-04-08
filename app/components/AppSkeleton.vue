<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <div :class="{ 'skeleton-loading': loading }">
    <slot />
  </div>
</template>
