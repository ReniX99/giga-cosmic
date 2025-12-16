<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import JwstList from './JwstList.vue'
  import type { TJwst } from '../types'
  import { fetchJwst } from '../api'
  import Arrow from '@/assets/svg/Arrow.vue'

  const filters = ref({
    search: 'jpg',
    instrument: 'all',
    page: 1,
    perPage: '12',
    suffix: '_cal',
    program: '',
  })

  const jwstList = ref<TJwst[]>([])
  const isLoading = ref<boolean>(false)
  async function search() {
    isLoading.value = true
    try {
      jwstList.value = await fetchJwst(
        filters.value.page,
        +filters.value.perPage,
        filters.value.search,
        filters.value.instrument,
        filters.value.suffix,
        +filters.value.program,
      )
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  async function goToNextPage() {
    filters.value.page++
    search()
  }

  async function goToPreviousPage() {
    filters.value.page--
    search()
  }

  onMounted(async () => {
    await search()
  })
</script>

<template>
  <div class="flex flex-col">
    <div class="pb-6 flex gap-4">
      <select class="border p-1 rounded-md" v-model="filters.search">
        <option value="jpg">Все JPG</option>
        <option value="suffix">По суффиксу</option>
        <option value="program">По программе</option>
      </select>
      <select
        v-show="filters.search == 'suffix'"
        v-model="filters.suffix"
        class="border p-1 rounded-md"
      >
        <option value="_cal">_cal</option>
        <option value="_thumb">_thumb</option>
      </select>
      <input
        v-show="filters.search == 'program'"
        v-model="filters.program"
        class="border p-1 rounded-md"
      />
      <select class="border p-1 rounded-md" v-model="filters.instrument">
        <option value="all">Любой инструмент</option>
        <option value="NIRCam">NIRCam</option>
        <option value="MIRI">MIRI</option>
        <option value="NIRISS">NIRISS</option>
        <option value="NIRSpec">NIRSpec</option>
        <option value="FGS">FGS</option>
      </select>
      <select class="border p-1 rounded-md w-15" v-model="filters.perPage">
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
      </select>
      <button @click="search" class="cursor-pointer bg-blue-600 px-2 py-1 text-white rounded-md">
        Показать
      </button>
    </div>
    <p v-if="isLoading" class="font-medium text-[24px] pt-6">Загрузка...</p>
    <JwstList v-else-if="jwstList.length > 0" :jwst-list="jwstList"></JwstList>
    <p v-else class="font-medium text-[24px] pt-6">Нет данных, подходящих по фильтру</p>
    <div class="flex gap-6 self-center pt-6">
      <Arrow
        v-show="filters.page !== 1"
        @click="goToPreviousPage"
        class="rotate-180 cursor-pointer"
      />
      <p class="font-medium text-[18px]">Страница {{ filters.page }}</p>
      <Arrow v-show="filters.page !== 100" @click="goToNextPage" class="cursor-pointer" />
    </div>
  </div>
</template>
