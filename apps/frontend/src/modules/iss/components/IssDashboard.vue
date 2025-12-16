<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import IssTrend from './IssTrend.vue'
  import LastIss from './LastIss.vue'
  import leaflet from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  import type { TIss } from '../types'
  import { fetchLastIss } from '../api'
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js'
  ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

  const lastIss = ref<TIss>()

  const issSpeedLabels = ref<string[]>([])
  const issSpeedData = ref<number[]>([])
  const issAltLabels = ref<string[]>([])
  const issAltData = ref<number[]>([])

  const map = ref<leaflet.Map>()
  const trail = ref<leaflet.Polyline>()
  const marker = ref<leaflet.Marker>()

  const issChartSpeedData = computed(() => ({
    labels: issSpeedLabels.value,
    datasets: [
      { label: 'Скорость', data: issSpeedData.value, borderColor: 'red', backgroundColor: 'red' },
    ],
  }))
  const issChartAltData = computed(() => ({
    labels: issAltLabels.value,
    datasets: [
      { label: 'Высота', data: issAltData.value, borderColor: 'red', backgroundColor: 'red' },
    ],
  }))

  async function loadLastIss() {
    try {
      lastIss.value = await fetchLastIss()
      const latitude = lastIss.value.payload.latitude
      const longitude = lastIss.value.payload.longitude
      const velocity = lastIss.value.payload.velocity

      trail.value.addLatLng([latitude, longitude])
      marker.value.setLatLng([latitude, longitude])

      const time = new Date(lastIss.value.fetchedAt).toLocaleTimeString()

      issSpeedLabels.value.push(time)
      issSpeedData.value.push(velocity)

      issAltLabels.value.push(time)
      issAltData.value.push(lastIss.value.payload.altitude)
    } catch (err) {
      console.log(err)
    }
  }

  onMounted(async () => {
    try {
      lastIss.value = await fetchLastIss()
    } catch (err) {
      console.log(err)
    }

    map.value = leaflet
      .map('map', { attributionControl: false })
      .setView([lastIss.value?.payload.latitude, lastIss.value?.payload.longitude], 3)
    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', { noWrap: true })
      .addTo(map.value)

    trail.value = leaflet.polyline([], { weight: 3 }).addTo(map.value)
    marker.value = leaflet
      .marker([lastIss.value?.payload.latitude, lastIss.value?.payload.longitude])
      .addTo(map.value)
      .bindPopup('МКС')

    await loadLastIss()
    setInterval(async () => {
      await loadLastIss()
    }, 120000)
  })
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <LastIss :iss="lastIss" />
      <IssTrend />
    </div>
    <div id="map" class="w-lg h-86.5 border rounded-md self-center my-20"></div>
    <div class="flex justify-between">
      <div class="w-125">
        <Line
          :data="JSON.parse(JSON.stringify(issChartSpeedData))"
          :options="{ responsive: true, scales: { x: { display: false } } }"
        />
      </div>
      <div class="w-125">
        <Line
          :data="JSON.parse(JSON.stringify(issChartAltData))"
          :options="{ responsive: true, scales: { x: { display: false } } }"
        />
      </div>
    </div>
  </div>
</template>
