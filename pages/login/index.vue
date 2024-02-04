<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type UserData, type ApiResponse } from '~/types'

const router = useRouter()
const { apiBaseUrl } = useApiConfig()
const { isLogin, authToken } = storeToRefs(useUserStore())
const { setUserInfo } = useUserStore()
definePageMeta({
  layout: 'signin'
})

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    const res = await $fetch<ApiResponse<UserData>>(`${apiBaseUrl}/login`, {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
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

const firstInput = ref<null | HTMLInputElement>(null)
onMounted(() => {
  firstInput.value?.focus()
})
</script>

<template>
  <form class="mb-4">
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:mail-outline" size="20" class="text-stone-500"
      /></span>
      <input
        ref="firstInput"
        v-model="email"
        type="email"
        class="base-input pl-8"
        placeholder="電子郵件"
      />
    </div>
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:lock-outline" size="20" class="text-stone-500"
      /></span>
      <input v-model="password" type="password" class="base-input pl-8" placeholder="密碼" />
    </div>
    <button
      class="mt-5 block w-full rounded-md border border-gray-500 bg-stone-500 py-2 text-gray-100 transition-colors hover:bg-stone-600"
      type="button"
      @click="login"
    >
      登入
    </button>
  </form>
</template>

<style scoped></style>
