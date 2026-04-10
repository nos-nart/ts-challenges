<script setup lang="ts">
useSeoMeta({
  title: 'TypeScript Challenges',
  ogTitle: 'TypeScript Challenges',
  description: 'A platform to practice and master TypeScript with interactive challenges.',
  ogDescription: 'A platform to practice and master TypeScript with interactive challenges.',
  ogImage: 'https://ts-challenges.vercel.app/__og-image__/static/og.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://ts-challenges.vercel.app/__og-image__/static/og.png'
})

defineOgImage({
  component: 'Takumi',
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
