<script setup lang="ts">
  import { formatIsoUtcString } from '@/utils/date'
  import type { TIss } from '../types'

  defineProps<{
    iss: TIss
  }>()
</script>

<template>
  <article class="flex flex-col gap-4">
    <h2 class="text-[18px] font-medium underline underline-offset-[6px]">
      Последнее местоположение
    </h2>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Широта:</p>
      <p>{{ iss?.payload!.latitude.toFixed(4) ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Долгота:</p>
      <p>{{ iss?.payload!.longitude.toFixed(4) ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Высота (км):</p>
      <p>{{ Math.round(iss?.payload!.altitude) ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Скорость (км/ч):</p>
      <p>{{ Math.round(iss?.payload!.velocity) ?? '-' }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <p class="font-medium text-[17px]">Время:</p>
      <p>{{ iss?.fetchedAt ? formatIsoUtcString(new Date(iss.fetchedAt).toISOString()) : '-' }}</p>
    </div>
  </article>
</template>
