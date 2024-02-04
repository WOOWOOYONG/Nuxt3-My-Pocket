<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const { userInfo, isLogin } = storeToRefs(useUserStore())
const { logout } = useUserStore()
const showUserDropdown = ref(false)
const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}
</script>

<template>
  <header class="py-4">
    <nav class="container">
      <div class="flex items-center justify-between">
        <NuxtLink to="/"> LOGO </NuxtLink>
        <div class="flex items-center gap-3">
          <div v-if="isLogin" class="relative cursor-pointer sm:hidden" @click="toggleUserDropdown">
            <img :src="userInfo.thumbnail" class="h-10 w-10 rounded-full" />
            <!-- Dropdown menu -->
            <div
              v-if="showUserDropdown"
              class="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-gray-50 shadow dark:divide-gray-600 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
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
          <div v-else>
            <NuxtLink
              to="/login"
              class="mr-4 rounded-full bg-sand-800 px-4 py-2 tracking-wider text-gray-100 shadow-sm transition-colors hover:bg-gray-800"
            >
              開始使用
            </NuxtLink>
          </div>
          <div>
            <LangSwitcher />
          </div>
          <div>
            <DarkToggle />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
