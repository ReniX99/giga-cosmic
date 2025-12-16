<script setup lang="ts">
  import type { TJwst } from '../types'

  defineProps<{
    jwst: TJwst
  }>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <a class="w-66 h-66" :href="jwst.url" target="_blank">
      <img
        :src="jwst.url"
        loading="lazy"
        class="rounded-md h-full"
        alt="Не удалось отобразить картинку"
      />
    </a>
    <p class="w-66 text-[11px] font-medium">{{ jwst.caption }}</p>
  </div>
</template>
