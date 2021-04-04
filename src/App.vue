<template>
  <main class="flex bg-gray-100">
    <SideBar class="min-h-screen" />
    <router-view class="flex-grow" />
  </main>
</template>

<script setup>
  import SideBar from '@/components/SideBar.vue'
</script>