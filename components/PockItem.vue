<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useUiStore } from '~/stores/uiStore'

import { type ApiResponse, type Pocket } from '~/types'

const { apiBaseUrl } = useApiConfig()
const { authToken } = storeToRefs(useUserStore())

const categories = {
  tw: '台式',
  jp: '日式',
  cn: '中式',
  ita: '義式'
}

defineProps<{ pocket: Pocket }>()
const emits = defineEmits(['pocket-updated', 'pocket-edit-id'])

const togglePocketStatus = async (pocketId: string) => {
  try {
    const res = await $fetch<ApiResponse<Pocket>>(`${apiBaseUrl}/pocket/status/${pocketId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken.value}`
      }
    })
    if (res.ok) {
      alert('更新狀態成功')
      emits('pocket-updated', true)
    }
  } catch (error) {
    console.error(error)
  }
}

const togglePocketCollected = async (pocketId: string) => {
  try {
    const res = await $fetch<ApiResponse<Pocket>>(`${apiBaseUrl}/pocket/collect/${pocketId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authToken.value}`
      }
    })
    if (res.ok) {
      alert('更新狀態成功')
      emits('pocket-updated', true)
    }
  } catch (error) {
    console.error(error)
  }
}

const { showDeleteBtnId } = storeToRefs(useUiStore())
const { toggleDeleteBtn } = useUiStore()

const deletePocket = async (pocketId: string) => {
  try {
    const res = await $fetch<ApiResponse<Pocket>>(`${apiBaseUrl}/pocket/${pocketId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken.value}`
      }
    })
    if (res.ok) {
      alert('刪除成功')
      emits('pocket-updated', true)
    }
  } catch (error) {
    console.error(error)
  }
}
const handleDeletPocket = (pocketId: string) => {
  showDeleteBtnId.value = null
  deletePocket(pocketId)
}

const getEditPocketId = (pocketId: string) => {
  showDeleteBtnId.value = null
  emits('pocket-edit-id', pocketId)
}
</script>

<template>
  <div class="rounded border-b border-stone-400">
    <header class="flex items-center justify-between px-4 pt-4">
      <div>
        {{ formatDateString(pocket.createdAt) }}
      </div>
      <div class="delete-btn relative">
        <button type="button" class="cursor-pointer" @click.stop="toggleDeleteBtn(pocket._id)">
          <Icon name="ri:more-fill" size="24" />
        </button>
        <div
          v-if="showDeleteBtnId === pocket._id"
          class="absolute -left-8 cursor-pointer rounded-lg border border-sand-600 bg-sand-200 shadow"
        >
          <button
            type="button"
            class="flex w-32 items-center justify-center gap-2 border-b border-sand-600 py-2 pr-1 hover:bg-stone-300"
            @click="getEditPocketId(pocket._id)"
          >
            <Icon name="ph:pencil-simple-line" size="20" />編輯
          </button>
          <button
            type="button"
            class="flex w-32 items-center justify-center gap-2 py-2 pr-1 hover:bg-stone-300 hover:text-red-600"
            @click="handleDeletPocket(pocket._id)"
          >
            <Icon name="material-symbols:delete-outline" size="20" />刪除
          </button>
        </div>
      </div>
    </header>
    <h3 class="mb-4 text-xl font-medium">{{ pocket.shopName }}</h3>
    <p class="mb-4">地區： {{ pocket.region }}</p>
    <p class="mb-4">類型： {{ categories[pocket.category] }}</p>
    <ul v-if="pocket.targets.length > 0" class="mb-4 flex flex-col gap-2">
      <li v-for="item in pocket.targets" :key="item._id">
        {{ item.name }}
        <span>price</span>{{ item.price }}
      </li>
    </ul>
    <p>total price {{ pocket.totalPrice }}</p>
    <p v-if="pocket.memo.length > 0">
      {{ pocket.memo }}
    </p>
    <footer class="mb-4 flex justify-end">
      <div class="flex">
        <div class="mr-4">
          <button v-if="pocket.status" type="button" @click="togglePocketStatus(pocket._id)">
            <Icon name="material-symbols:flag-rounded" size="26" />
          </button>
          <button v-else type="button" @click="togglePocketStatus(pocket._id)">
            <Icon
              name="material-symbols:flag-outline-rounded"
              class="hover:text-sand-900"
              size="26"
            />
          </button>
        </div>
        <div class="mr-4">
          <button
            v-if="pocket.collect"
            type="button"
            class="cursor-pointer"
            @click="togglePocketCollected(pocket._id)"
          >
            <Icon name="material-symbols:bookmark-rounded" size="26" />
          </button>
          <button
            v-else
            type="button"
            class="cursor-pointer"
            @click="togglePocketCollected(pocket._id)"
          >
            <Icon
              name="material-symbols:bookmark-outline-rounded"
              size="26"
              class="hover:text-sand-900"
            />
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
