<script setup lang="ts">
  import { fetchOsdrList } from '@/modules/osdr/api'
  import { onMounted, ref } from 'vue'
  import type { TOsdrItem } from '../types'
  import OsdrItem from './OsdrItem.vue'

  const osdrList = ref<TOsdrItem[]>([])

  onMounted(async () => {
    try {
      osdrList.value = await fetchOsdrList()
    } catch (err) {
      console.log(err)
    }
  })
</script>

<template>
  <div class="flex flex-col">
    <OsdrItem v-for="item in osdrList" :key="item.id" :osdr="item" />
  </div>
</template>
