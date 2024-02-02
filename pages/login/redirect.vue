<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type UserData } from '~/types'

const { userInfo, isLogin } = storeToRefs(useUserStore())
// const router = useRouter()
// const { data, error } = await useFetch<UserData>('http://localhost:8080/api/userInfo', {
//   method: 'POST'
// })
// if(data.value){
//   console.log(data.value)
//   userInfo.value = data.value
//   isLogin.value = true
//   router.push('/')
// }
// if(error.value){
//   console.error(error.value)
// }

const getUserData = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/userInfo', {
      method: 'POST',
      credentials: 'include'
    })
    const userData: UserData = await response.json()
    userInfo.value = userData
    isLogin.value = true
    console.log(userData)
  } catch (error) {
    console.error(error)
  }
}

onMounted(getUserData)
</script>

<template>
  <div>登入中</div>
</template>

<style scoped></style>
