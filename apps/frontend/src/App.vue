<script setup lang="ts"></script>

<template>
  <main>
    <header class="border-b border-b-black">
      <div class="h-19 max-w-300 mx-auto flex justify-between items-center">
        <h1 class="font-medium tracking-widest text-[24px] uppercase">Giga Cosmic</h1>
        <nav>
          <ul class="flex gap-14 text-[16px] font-medium">
            <li class="cursor-pointer">Секция 1</li>
            <router-link :to="{ name: 'jwst' }">
              <li class="hover:underline underline-offset-4">JWST</li>
            </router-link>
            <router-link :to="{ name: 'osdr' }">
              <li class="hover:underline underline-offset-4">OSDR</li>
            </router-link>
            <router-link :to="{ name: 'iss' }">
              <li class="hover:underline underline-offset-4">ISS</li>
            </router-link>
          </ul>
        </nav>
      </div>
    </header>
    <router-view></router-view>
  </main>
</template>

<style>
  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
  }
</style>
