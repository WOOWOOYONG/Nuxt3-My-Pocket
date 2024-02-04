<script lang="ts" setup>
import { type ApiResponse, type Pocket } from '~/types'

const menuList = [
  {
    name: '首頁',
    link: '/',
    icon: 'material-symbols:home-outline'
  },
  {
    name: '儲存標籤',
    link: '/',
    icon: 'material-symbols:bookmark-outline'
  },
  {
    name: '設定',
    link: '/',
    icon: 'material-symbols:settings-outline'
  }
]

const showPostModal = ref(false)
const togglePostModal = () => {
  showPostModal.value = !showPostModal.value
}
const handleClosePostModal = (value: boolean) => {
  showPostModal.value = value
}

const { apiBaseUrl } = useApiConfig()

const pocketList = ref<null | Pocket[]>(null)

const { data, error } = await useFetch<ApiResponse<Pocket[]>>(`${apiBaseUrl}/pockets`)

if (data.value) {
  pocketList.value = data.value.data
}

if (error.value) {
  console.error(error.value)
}
</script>

<template>
  <div>
    <h1 class="mb-10 text-4xl font-bold">My Pocket</h1>
    <section class="flex">
      <div class="min-w-[20%] pr-10">
        <ul class="flex flex-col gap-2">
          <li v-for="(menu, index) in menuList" :key="index">
            <NuxtLink :to="menu.link" class="flex items-start border border-black p-3">
              <Icon :name="menu.icon" size="24" class="mr-3" />
              <span>{{ menu.name }}</span></NuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="max-w-[60%] flex-grow">
        <div class="mb-10 flex items-center gap-6">
          <div class="text-xl">待冒險</div>
          <div class="text-xl">已探勘</div>
        </div>
        <div class="mb-6 cursor-pointer border border-black py-3 text-xl" @click="togglePostModal">
          新增探險地點
        </div>
        <ul v-if="pocketList" class="flex flex-col gap-3">
          <li v-for="pocket in pocketList" :key="pocket._id">
            <PockItem :pocket="pocket" />
          </li>
        </ul>
      </div>
    </section>
    <PostModal
      v-if="showPostModal"
      :show-post-modal="showPostModal"
      @close-modal="handleClosePostModal"
    />
  </div>
</template>

<style scoped></style>
