<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useUiStore } from '~/stores/uiStore'
import { type ApiResponse, type Pocket } from '~/types'

const { authToken } = storeToRefs(useUserStore())
const { apiBaseUrl } = useApiConfig()

const showPostModal = ref(false)
const togglePostModal = () => {
  showPostModal.value = !showPostModal.value
}
const handleClosePostModal = (value: boolean) => {
  showPostModal.value = value
}

const showPocketStatus = ref(false)
const setShowStatus = (status: boolean) => {
  showPocketStatus.value = status
}

const { showDeleteBtnId } = storeToRefs(useUiStore())

onMounted(() => {
  const closeDeleteMenu = (event: MouseEvent) => {
    if (!(event.target as Element).closest('.delete-button')) {
      showDeleteBtnId.value = null
    }
  }

  window.addEventListener('click', closeDeleteMenu)

  onBeforeUnmount(() => {
    window.removeEventListener('click', closeDeleteMenu)
  })
})

const {
  data: pocketList,
  error,
  refresh
} = await useFetch<ApiResponse<Pocket[]>>(`${apiBaseUrl}/pockets`, {
  headers: {
    Authorization: `Bearer ${authToken.value}`
  }
})

if (error.value) {
  console.error(error.value)
}

const handlePocketRefresh = (value: boolean) => {
  if (value) {
    refresh()
  }
}

const filteredPocketList = computed(() => {
  if (showPocketStatus.value) {
    return pocketList.value?.data.filter((pocket: Pocket) => pocket.status === true)
  } else {
    return pocketList.value?.data.filter((pocket: Pocket) => pocket.status === false)
  }
})
</script>

<template>
  <div class="max-w-[60%] flex-grow">
    <div class="mb-10 flex items-center gap-6">
      <div class="text-xl" @click="setShowStatus(false)">待冒險</div>
      <div class="text-xl" @click="setShowStatus(true)">已探勘</div>
    </div>
    <div class="mb-6 cursor-pointer border border-black py-3 text-xl" @click="togglePostModal">
      新增探險地點
    </div>
    <ul v-if="pocketList?.data" class="flex flex-col gap-3">
      <li v-for="pocket in filteredPocketList" :key="pocket._id">
        <PockItem :pocket="pocket" @pocket-updated="handlePocketRefresh" />
      </li>
    </ul>
    <PostModal
      v-if="showPostModal"
      :show-post-modal="showPostModal"
      @close-modal="handleClosePostModal"
      @pocket-updated="handlePocketRefresh"
    />
  </div>
</template>

<style scoped></style>
