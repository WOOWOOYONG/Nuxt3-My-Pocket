import { type UserData } from '~/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    const authToken = useCookie('token')
    const isLogin = ref(false)
    const userInfo = ref({
      userName: '',
      email: '',
      id: '',
      thumbnail: ''
    })
    const setUserInfo = (user: UserData) => {
      userInfo.value = { ...user }
    }

    const logout = () => {
      isLogin.value = false
      userInfo.value = { userName: '', email: '', id: '', thumbnail: '' }
      authToken.value = null
      router.push('/login')
    }

    return {
      userInfo,
      isLogin,
      authToken,
      setUserInfo,
      logout
    }
  },
  {
    persist: {
      paths: ['isLogin', 'userInfo']
    }
  }
)

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
