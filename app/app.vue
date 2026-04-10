<script setup lang="ts">
useSeoMeta({
  title: 'TypeScript Challenges',
  ogTitle: 'TypeScript Challenges',
  description: 'A platform to practice and master TypeScript with interactive challenges.',
  ogDescription: 'A platform to practice and master TypeScript with interactive challenges.',
  twitterCard: 'summary_large_image'
})

defineOgImage('NuxtSeo.takumi', {
  title: 'TS Challenges',
  description: 'Master TypeScript through interactive practice.',
  colorMode: 'dark'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
