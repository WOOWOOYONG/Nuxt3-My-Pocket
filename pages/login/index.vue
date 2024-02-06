<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { type UserData, type ApiResponse } from '~/types'
import { useUserStore } from '~/stores/user'

definePageMeta({
  layout: 'signin'
})

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().email({ message: '請輸入有效的電子郵件' }),
    password: zod.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
      message: '請輸入 8 位以上大小寫英數字組合'
    })
  })
)
const { handleSubmit, errors } = useForm({
  validationSchema
})
const { value: email } = useField('email')
const { value: password } = useField('password')

const router = useRouter()
const { apiBaseUrl } = useApiConfig()
const { isLogin, authToken } = storeToRefs(useUserStore())
const { setUserInfo } = useUserStore()

interface LoginState {
  email: string
  password: string
}

const login = async (loginState: LoginState) => {
  try {
    const res = await $fetch<ApiResponse<UserData>>(`${apiBaseUrl}/login`, {
      method: 'POST',
      body: loginState
    })
    if (res.ok) {
      setUserInfo(res.data)
      authToken.value = res.token
      isLogin.value = true
      router.push('/')
    }
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = handleSubmit((values: LoginState) => {
  login(values)
})

const firstInput = ref<null | HTMLInputElement>(null)
onMounted(() => {
  firstInput.value?.focus()
})
</script>

<template>
  <form class="mb-4" @submit="onSubmit">
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:mail-outline" size="20" class="text-stone-500"
      /></span>
      <input
        ref="firstInput"
        v-model="email"
        name="email"
        type="email"
        class="base-input pl-8"
        placeholder="電子郵件"
        :class="{ 'focus:border-red-500': errors.email }"
      />
    </div>
    <span v-if="errors.email" class="mb-2 inline-block w-full pl-8 text-left text-red-600">{{
      errors.email
    }}</span>
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:lock-outline" size="20" class="text-stone-500"
      /></span>
      <input
        v-model="password"
        name="password"
        type="password"
        class="base-input pl-8"
        placeholder="密碼"
        :class="{ 'focus:border-red-500': errors.password }"
      />
    </div>
    <span v-if="errors.password" class="inline-block w-full pl-8 text-left text-red-600">{{
      errors.password
    }}</span>
    <button
      class="mt-5 block w-full rounded-md border border-gray-500 bg-stone-500 py-2 text-gray-100 transition-colors hover:bg-stone-600"
      type="submit"
    >
      登入
    </button>
  </form>
</template>

<style scoped></style>
