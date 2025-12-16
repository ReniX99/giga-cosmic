<script setup lang="ts">
  import type { TJwst } from '../types'
  import JwstItem from './JwstItem.vue'

  defineProps<{
    jwstList: TJwst[]
  }>()
</script>

<template>
  <article class="grid grid-cols-4 gap-x-4 gap-y-5">
    <JwstItem v-for="(item, id) in jwstList" :key="id" :jwst="item" />
  </article>
</template>
