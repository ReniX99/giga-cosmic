<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import type { TTrendIss } from '../types'
  import { fetchTrendIss } from '../api'

  const trendIss = ref<TTrendIss>()

  onMounted(async () => {
    try {
      trendIss.value = await fetchTrendIss()
    } catch (err) {
      console.log(err)
    }
  })
</script>

<template>
  <article class="flex flex-col gap-4">
    <h2 class="text-[18px] font-medium underline underline-offset-[6px]">Тренд движения</h2>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Движение:</p>
      <p>{{ trendIss?.movement ? 'да' : 'нет' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Смещение (км):</p>
      <p>{{ Math.round(trendIss?.deltaKm) ?? 0 }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Интервал (сек):</p>
      <p>{{ Math.round(trendIss?.deltaSec) ?? 0 }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Скорость (км/ч):</p>
      <p>{{ Math.round(trendIss?.velocityKmH) ?? '-' }}</p>
    </div>
  </article>
</template>
