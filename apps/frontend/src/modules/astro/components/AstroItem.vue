<script setup lang="ts">
  import type { TAstro } from '../types'

  defineProps<{
    astro: TAstro
  }>()
</script>

<template>
  <div class="flex flex-col border-t border-t-gray-500">
    <div class="flex py-2.5 text-[15px]">
      <p class="basis-1/10">{{ astro.id }}</p>
      <p class="basis-2/10">{{ astro.body }}</p>
      <p class="basis-2/10">{{ astro.event }}</p>
      <p class="basis-2/10">{{ astro.date }}</p>
      <p class="basic-3/10">
        {{ JSON.stringify(astro.extra) }}
      </p>
    </div>
  </div>
</template>
