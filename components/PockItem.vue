<script setup lang="ts">
interface Restaurant {
  name: string
  id: string
  cover: string
  category: string
  tags: string[]
}

defineProps<{ restaurant: Restaurant }>()
</script>

<template>
  <div class="rounded border border-gray-700">
    <h3>{{ restaurant.name }}</h3>
    <ul class="flex items-center gap-2">
      <li v-for="(tag, index) in restaurant.tags" :key="index">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
