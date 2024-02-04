<script setup lang="ts">
import { type Pocket } from '~/types'

defineProps<{ pocket: Pocket }>()
</script>

<template>
  <div class="rounded border border-gray-700">
    <header class="flex justify-end">
      <div class="mr-4">
        {{ formatDateString(pocket.createdAt) }}
      </div>
      <div class="mr-4">
        <button type="button" class="cursor-pointer"><Icon name="ri:more-fill" size="20" /></button>
      </div>
    </header>
    <h3 class="mb-4 text-xl font-medium">{{ pocket.shopName }}</h3>
    <div>狀態: {{ pocket.status }}</div>
    <p class="mb-4">地區： {{ pocket.region }}</p>
    <p class="mb-4">類型： {{ pocket.category }}</p>
    <ul v-if="pocket.targets.length > 0" class="mb-4 flex flex-col gap-2">
      <li v-for="item in pocket.targets" :key="item._id">
        {{ item.target }}
        <span>price</span>{{ item.price }}
      </li>
    </ul>
    <p v-if="pocket.memo.length > 0">
      {{ pocket.memo }}
    </p>
    <footer class="flex justify-end">
      <div class="mr-4">
        <button v-if="pocket.collect" type="button" class="cursor-pointer">
          <Icon name="material-symbols:bookmark-rounded" size="24" />
        </button>
        <button v-else type="button" class="cursor-pointer">
          <Icon name="material-symbols:bookmark-outline-rounded" size="24" />
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
