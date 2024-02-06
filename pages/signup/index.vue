<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { type UserData, type ApiResponse } from '~/types'

const router = useRouter()
const { apiBaseUrl } = useApiConfig()

definePageMeta({
  layout: 'signin'
})

const validationSchema = toTypedSchema(
  zod.object({
    userName: zod.string().min(3, { message: '最少需要3個字元' }).max(50),
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
const { value: userName } = useField('userName')

interface SignupState {
  userName: string
  email: string
  password: string
}

const signup = async (formValue: SignupState) => {
  try {
    const res = await $fetch<ApiResponse<UserData>>(`${apiBaseUrl}/signup`, {
      method: 'POST',
      body: formValue
    })
    if (res.ok) {
      alert('註冊成功')
      router.push('/login')
    }
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = handleSubmit((values: SignupState) => {
  signup(values)
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
        ><Icon name="material-symbols:person-2-outline" size="20" class="text-stone-500"
      /></span>
      <input
        ref="firstInput"
        v-model="userName"
        name="userName"
        type="text"
        class="base-input pl-8"
        placeholder="使用者名稱"
        maxlength="50"
        :class="{ 'focus:border-red-500': errors.userName }"
      />
    </div>
    <span v-if="errors.userName" class="mb-2 inline-block w-full pl-8 text-left text-red-600">{{
      errors.userName
    }}</span>
    <div class="relative mb-2">
      <span class="input-icon"
        ><Icon name="material-symbols:mail-outline" size="20" class="text-stone-500"
      /></span>
      <input
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
    <span v-if="errors.password" class="mb-2 inline-block w-full pl-8 text-left text-red-600">{{
      errors.password
    }}</span>
    <button
      class="mt-5 block w-full rounded-md border border-gray-500 bg-stone-500 py-2 text-gray-100 transition-colors hover:bg-stone-600"
      type="submit"
    >
      註冊
    </button>
  </form>
</template>

<style scoped></style>
