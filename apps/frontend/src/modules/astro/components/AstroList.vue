<script setup lang="ts">
  import AstroItem from './AstroItem.vue'
  import type { TAstro } from '../types'

  defineProps<{
    astroList: TAstro[]
  }>()
</script>

<template>
  <div>
    <AstroItem v-for="item in astroList" :key="item.id" :astro="item" />
  </div>
</template>
