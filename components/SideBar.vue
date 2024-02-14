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
    name: '我的收藏',
    link: '/saved',
    icon: 'material-symbols:bookmark-outline'
  },
  {
    name: '設定',
    link: '/',
    icon: 'material-symbols:settings-outline'
  }
]

const { userInfo, isLogin } = storeToRefs(useUserStore())
</script>

<template>
  <div class="fixed top-40 w-32 lg:w-56">
    <div
      v-if="isLogin"
      class="relative mb-8 cursor-pointer rounded-full p-2 transition-colors hover:bg-sand-600"
    >
      <div class="flex items-center gap-4">
        <img :src="userInfo.thumbnail" class="h-12 w-12 rounded-full" />
        <span class="hidden text-lg font-medium xl:block">{{ userInfo.userName }}</span>
      </div>
    </div>
    <ul class="flex flex-col gap-2">
      <li v-for="(menu, index) in menuList" :key="index">
        <NuxtLink
          :to="menu.link"
          class="flex items-start rounded-full p-3 transition-colors hover:bg-sand-600"
        >
          <Icon :name="menu.icon" size="24" class="mr-3" />
          <span class="hidden md:block">{{ menu.name }}</span></NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
