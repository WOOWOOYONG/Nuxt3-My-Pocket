<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type UserData, type ApiResponse } from '~/types'

const router = useRouter()
const { apiBaseUrl } = useApiConfig()
const { isLogin, authToken } = storeToRefs(useUserStore())

definePageMeta({
  layout: 'signin'
})

const userName = ref('')
const email = ref('')
const password = ref('')
const checkPassword = ref('')

const signup = async () => {
  try {
    const res = await $fetch<ApiResponse<UserData>>(`${apiBaseUrl}/signup`, {
      method: 'POST',
      body: {
        userName: userName.value,
        email: email.value,
        password: password.value
      }
    })
    if (res.ok) {
      alert('註冊成功')
      authToken.value = `Bearer ${res.token}`
      isLogin.value = true
      router.push('/login')
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
        ><Icon name="material-symbols:person-2-outline" size="20" class="text-stone-500"
      /></span>
      <input
        ref="firstInput"
        v-model="userName"
        type="email"
        class="base-input pl-8"
        placeholder="使用者名稱"
      />
    </div>
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:mail-outline" size="20" class="text-stone-500"
      /></span>
      <input v-model="email" type="email" class="base-input pl-8" placeholder="電子郵件" />
    </div>
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:lock-outline" size="20" class="text-stone-500"
      /></span>
      <input v-model="password" type="password" class="base-input pl-8" placeholder="密碼" />
    </div>
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:lock-outline" size="20" class="text-stone-500"
      /></span>
      <input
        v-model="checkPassword"
        type="password"
        class="base-input pl-8"
        placeholder="再次輸入密碼"
      />
    </div>
    <button
      class="mt-5 block w-full rounded-md border border-gray-500 bg-stone-500 py-2 text-gray-100 transition-colors hover:bg-stone-600"
      type="button"
      @click="signup"
    >
      註冊
    </button>
  </form>
</template>

<style scoped></style>
