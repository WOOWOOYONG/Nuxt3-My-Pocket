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

const showEditModal = ref(false)
const handleCloseEditModal = (value: boolean) => {
  showEditModal.value = value
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

const editPocketItem = ref<null | Pocket>(null)
const handleEditPocket = (pocketId: string) => {
  if (!pocketList.value?.data) {
    return
  }
  const foundPocket = pocketList.value.data.find((item) => item._id === pocketId)
  if (foundPocket) {
    editPocketItem.value = foundPocket
    showEditModal.value = true
  }
}
</script>

<template>
  <div>
    <div class="mb-10 flex items-center gap-2">
      <div
        class="w-1/2 cursor-pointer rounded-lg py-4 text-xl transition-colors hover:bg-sand-600"
        @click="setShowStatus(false)"
      >
        <span :class="{ 'border-b-4 border-sand-800 px-3 pb-2': !showPocketStatus }">
          <Icon name="material-symbols-light:mountain-flag-outline" size="28" class="pb-1" />
          待冒險
        </span>
      </div>
      <div
        class="w-1/2 cursor-pointer rounded-lg py-4 text-xl transition-colors hover:bg-sand-600"
        @click="setShowStatus(true)"
      >
        <span :class="{ 'border-b-4 border-sand-800 px-3 pb-2': showPocketStatus }">
          <Icon name="material-symbols-light:mountain-flag-rounded" size="28" class="pb-1" />
          已探勘
        </span>
      </div>
    </div>
    <div class="mb-6 cursor-pointer border border-black py-3 text-xl" @click="togglePostModal">
      新增探險地點
    </div>
    <ul v-if="pocketList!.data" class="flex flex-col gap-3 border border-stone-400">
      <li v-for="pocket in filteredPocketList" :key="pocket._id">
        <PockItem
          :pocket="pocket"
          @pocket-updated="handlePocketRefresh"
          @pocket-edit-id="handleEditPocket"
        />
      </li>
    </ul>
    <p v-else class="pt-4 text-2xl">目前還沒有資料</p>
    <PostPocketModal
      v-if="showPostModal"
      :show-post-modal="showPostModal"
      @close-modal="handleClosePostModal"
      @pocket-updated="handlePocketRefresh"
    />
    <EditPocketModal
      v-if="showEditModal"
      :edit-pocket-item="editPocketItem"
      @close-modal="handleCloseEditModal"
      @pocket-updated="handlePocketRefresh"
    />
  </div>
</template>

<style scoped></style>
