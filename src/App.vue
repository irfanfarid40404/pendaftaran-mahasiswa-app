<template>
  <NavBar />
  <div class="container py-4">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
