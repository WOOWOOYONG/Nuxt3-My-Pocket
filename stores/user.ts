import { type UserData } from '~/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const apiBaseUrl = runtimeConfig.public.apiBaseUrl
    const isLogin = ref(false)
    const userInfo = reactive({
      userName: '',
      userEmail: '',
      userId: '',
      thumbnail: ''
    })
    const setUserInfo = (user: UserData) => {
      userInfo.userName = user.userName
      userInfo.userEmail = user.userEmail
      userInfo.userId = user.userId
      userInfo.thumbnail = user.thumbnail
    }

    const logout = () => {
      try {
        const res = $fetch(`${apiBaseUrl}/logout`)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      userInfo,
      isLogin,
      setUserInfo,
      logout
    }
  },
  {
    persist: true
  }
)

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
