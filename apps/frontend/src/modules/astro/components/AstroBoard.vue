<script setup lang="ts">
  import { ref } from 'vue'
  import AstroList from './AstroList.vue'
  import type { TAstro } from '../types'
  import { fetchAstro } from '../api'

  const filters = ref({
    body: 'sun',
    latitude: 55.7558,
    longitude: 37.6176,
    days: 7,
  })

  const astroList = ref<TAstro[]>([])

  const isLoading = ref<boolean>(false)
  async function search() {
    isLoading.value = true
    try {
      astroList.value = await fetchAstro(
        filters.value.body,
        filters.value.latitude,
        filters.value.longitude,
        filters.value.days,
      )
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-12 pb-12">
      <div class="flex flex-col gap-2">
        <label class="font-medium text-[16px]">Тело</label>
        <select v-model="filters.body" class="border rounded-md py-1 px-2">
          <option value="sun">Солнце</option>
          <option value="moon">Луна</option>
        </select>
      </div>
      <div class="flex gap-6">
        <div class="flex flex-col gap-2">
          <label class="font-medium text-[16px]">Широта</label>
          <input
            v-model="filters.latitude"
            type="number"
            step="0.0001"
            class="border rounded-md py-1 px-2"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-medium text-[16px]">Долгота</label>
          <input
            v-model="filters.longitude"
            type="number"
            step="0.0001"
            class="border rounded-md py-1 px-2"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-medium text-[16px]">Количество дней</label>
          <input v-model="filters.days" type="number" min="1" class="border rounded-md py-1 px-2" />
        </div>
      </div>
      <button
        @click="search"
        class="self-end cursor-pointer bg-blue-600 px-4 py-1.5 text-white rounded-md"
      >
        Показать
      </button>
    </div>
    <p v-if="isLoading" class="font-medium text-[24px]">Загрузка...</p>
    <div v-else-if="astroList.length > 0">
      <ul class="flex font-medium mb-3">
        <li class="basis-1/10">#</li>
        <li class="basis-2/10">Тело</li>
        <li class="basis-2/10">Событие</li>
        <li class="basis-2/10">Когда (UTC)</li>
        <li class="basis-3/10">Дополнительно</li>
      </ul>
      <AstroList :astro-list="astroList" />
    </div>
    <p v-else class="font-medium text-[24px]">По заданному фильтру ничего не найдено</p>
  </div>
</template>
