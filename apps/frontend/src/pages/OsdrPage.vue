<script setup lang="ts">
  import OsdrList from '@/modules/osdr/components/OsdrList.vue'
</script>

<template>
  <section class="max-w-300 mx-auto py-8">
    <h1 class="font-medium uppercase text-[18px] pb-6">Nasa Osdr</h1>
    <div>
      <ul class="flex font-medium mb-3">
        <li class="basis-1/9">#</li>
        <li class="basis-1/9">dataset_id</li>
        <li class="basis-1/9">title</li>
        <li class="basis-1/9">REST_URL</li>
        <li class="basis-2/9">updated_at</li>
        <li class="basis-2/9">inserted_at</li>
        <li class="basis-1/9">raw</li>
      </ul>
      <OsdrList />
    </div>
  </section>
</template>
