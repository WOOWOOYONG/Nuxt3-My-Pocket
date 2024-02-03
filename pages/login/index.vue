<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type UserData, type ApiResponse } from '~/types'

const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const apiBaseUrl = runtimeConfig.public.apiBaseUrl
const { isLogin, authToken } = storeToRefs(useUserStore())
const { setUserInfo } = useUserStore()

const userInput = ref({
  email: '',
  password: ''
})

const login = async () => {
  try {
    const res = await $fetch<ApiResponse<UserData>>(`${apiBaseUrl}/login`, {
      method: 'POST',
      credentials: 'include',
      body: userInput.value
    })
    if (res.ok) {
      setUserInfo(res.data)
      authToken.value = `Bearer ${res.token}`
      isLogin.value = true
      router.push('/')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section>
    <div class="mx-auto max-w-sm">
      <form class="mb-4">
        <div class="mb-2">
          <input
            v-model="userInput.email"
            type="email"
            class="w-full rounded-md"
            placeholder="電子郵件"
          />
        </div>
        <div class="mb-2">
          <input
            v-model="userInput.password"
            type="password"
            class="w-full rounded-md"
            placeholder="密碼"
          />
        </div>
        <button
          class="mt-5 block w-full rounded-md border border-gray-500 bg-stone-500 py-2 text-gray-100 transition-colors hover:bg-stone-600"
          type="button"
          @click="login"
        >
          登入
        </button>
      </form>
      <ul>
        <li>
          <a
            href="http://localhost:8080/auth/google"
            class="flex items-center justify-center gap-3 rounded-md border border-gray-500 bg-slate-100 py-2 dark:bg-slate-900"
          >
            <img src="/icons/google.svg" />
            <p>透過Google繼續</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
