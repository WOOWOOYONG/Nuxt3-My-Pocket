<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type ApiResponse, type UserData } from '~/types'

const { isLogin, authToken } = storeToRefs(useUserStore())
const { setUserInfo } = useUserStore()
const router = useRouter()
const route = useRoute()
const getUserData = async () => {
  if (!authToken.value) {
    return
  }
  try {
    const res = await $fetch<ApiResponse<UserData>>('http://localhost:8080/api/userInfo', {
      method: 'POST',
      headers: {
        Authorization: authToken.value
      }
    })
    if (res.ok) {
      setUserInfo(res.data)
      isLogin.value = true
      router.push('/')
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  authToken.value = `Bearer ${route.query.token}` as string
  getUserData()
})
</script>

<template>
  <div>登入中</div>
</template>

<style scoped></style>
