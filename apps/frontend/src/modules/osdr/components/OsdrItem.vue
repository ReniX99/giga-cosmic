<script setup lang="ts">
  import type { TOsdrItem } from '../types'

  defineProps<{ osdr: TOsdrItem }>()
</script>

<template>
  <div class="flex flex-col border-t border-t-gray-500">
    <div class="flex py-2.5 text-[15px]">
      <p class="basis-1/9">{{ osdr.id }}</p>
      <p class="basis-1/9">{{ osdr.datasetId }}</p>
      <p class="basis-1/9">{{ osdr.title }}</p>
      <p class="basis-1/9">
        <a
          :href="osdr.raw!.REST_URL"
          class="text-[#003ab6] font-medium underline underline-offset-4"
          >Открыть</a
        >
      </p>
      <p class="basis-2/9">{{ osdr.updatedAt }}</p>
      <p class="basis-2/9">{{ osdr.insertedAt }}</p>
      <p
        class="basis-1/9 cursor-pointer text-[#003ab6] font-medium underline underline-offset-4"
        :title="JSON.stringify(osdr.raw)"
      >
        JSON
      </p>
    </div>
  </div>
</template>
