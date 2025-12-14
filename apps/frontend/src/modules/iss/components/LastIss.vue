<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import type { TIss } from '../types'
  import { fetchLastIss } from '../api'

  const iss = ref<TIss>()

  onMounted(async () => {
    try {
      iss.value = await fetchLastIss()
    } catch (err) {
      console.log(err)
    }
  })
</script>

<template>
  <article class="flex flex-col gap-4">
    <h2 class="text-[18px] font-medium underline underline-offset-[6px]">
      Последнее местоположение
    </h2>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Широта:</p>
      <p>{{ iss?.payload!.latitude ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Долгота:</p>
      <p>{{ iss?.payload!.longitude ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Высота (км):</p>
      <p>{{ iss?.payload!.latitude ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Скорость (км/ч):</p>
      <p>{{ iss?.payload!.velocity ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Время:</p>
      <p>{{ iss?.fetchedAt ?? '-' }}</p>
    </div>
  </article>
</template>
