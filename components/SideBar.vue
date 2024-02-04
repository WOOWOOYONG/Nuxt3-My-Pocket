<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

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

const { userInfo, isLogin } = storeToRefs(useUserStore())
const { logout } = useUserStore()
const showUserDropdown = ref(false)
const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}
</script>

<template>
  <div>
    <div
      v-if="isLogin"
      class="relative mb-8 cursor-pointer rounded-full p-2 hover:bg-sand-600"
      @click="toggleUserDropdown"
    >
      <div class="flex items-center gap-4">
        <img :src="userInfo.thumbnail" class="h-12 w-12 rounded-full" />
        <span class="text-lg font-medium">{{ userInfo.userName }}</span>
      </div>
      <!-- Dropdown menu -->
      <div
        v-if="showUserDropdown"
        class="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-gray-50 shadow dark:divide-gray-600 dark:bg-gray-700"
      >
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Dashboard</a
            >
          </li>
        </ul>
        <div class="py-1">
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            @click.prevent="logout"
            >Sign out</a
          >
        </div>
      </div>
    </div>
    <ul class="flex flex-col gap-2">
      <li v-for="(menu, index) in menuList" :key="index">
        <NuxtLink :to="menu.link" class="flex items-start border border-black p-3">
          <Icon :name="menu.icon" size="24" class="mr-3" />
          <span>{{ menu.name }}</span></NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
