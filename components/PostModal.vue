<script setup lang="ts">
import { nanoid } from 'nanoid'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type ApiResponse, type Pocket } from '~/types'

defineProps<{ showPostModal: boolean }>()
const emits = defineEmits(['close-modal', 'pocket-updated'])
const { apiBaseUrl } = useApiConfig()
const { authToken } = storeToRefs(useUserStore())

const closePostModal = (value: boolean) => {
  emits('close-modal', value)
}
const shopNameInput = ref<null | HTMLInputElement>(null)
onMounted(() => {
  shopNameInput.value?.focus()
})

const targets = ref([{ name: '', price: 0, temporyId: nanoid() }])

const addTarget = () => {
  targets.value.push({ name: '', price: 0, temporyId: nanoid() })
}

const removeTarget = (targetId: string) => {
  targets.value = targets.value.filter((target) => target.temporyId !== targetId)
}

const postData = ref<Partial<Pocket>>({
  shopName: '',
  region: '北區',
  category: 'tw',
  memo: ''
})

const addPocketItem = async () => {
  if (!authToken.value) {
    return
  }
  const postTargets = targets.value.map(({ temporyId: _temporyId, ...rest }) => rest)
  try {
    const res = await $fetch<ApiResponse<Pocket>>(`${apiBaseUrl}/pocket`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken.value}`
      },
      body: {
        ...postData.value,
        targets: postTargets
      }
    })
    if (res.ok) {
      alert('新增成功')
      emits('pocket-updated', true)
    }
  } catch (error) {
    console.error(error)
  }
}
const handleAddPocket = async () => {
  await addPocketItem()
  emits('close-modal', false)
}
</script>
<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-stone-700 bg-opacity-20 px-3"
    @click.self="closePostModal(false)"
  >
    <div class="min-w-[300px] rounded-md border-stone-700 bg-gray-200 p-2 sm:p-6 md:min-w-[540px]">
      <div class="mb-4 flex items-center justify-between">
        <span
          class="w-10 cursor-pointer rounded-full px-1 py-2 hover:bg-gray-300"
          @click="closePostModal(false)"
        >
          <Icon name="ri:close-line" size="26" />
        </span>
        <ul class="flex gap-4">
          <li class="cursor-pointer text-xl">北區</li>
          <li class="cursor-pointer text-xl">中區</li>
          <li class="cursor-pointer text-xl">南區</li>
        </ul>
      </div>
      <form class="flex flex-col items-start gap-3">
        <div class="w-full">
          <label for="name" class="form-label">店舖名稱</label>
          <input
            id="name"
            ref="shopNameInput"
            v-model="postData.shopName"
            type="text"
            class="base-input"
            placeholder="店舖名稱"
          />
        </div>
        <div class="w-full">
          <label for="category" class="form-label">種類</label>
          <select id="category" v-model="postData.category" name="category" class="base-select">
            <option value="tw">台式</option>
            <option value="jp">日式</option>
            <option value="cn">中式</option>
            <option value="ita">義式</option>
          </select>
        </div>
        <div class="w-full">
          <label for="target" class="form-label">目標品項</label>
          <div
            v-for="target in targets"
            :key="target.temporyId"
            class="mb-2 flex items-center gap-2"
          >
            <input
              v-model="target.name"
              type="text"
              class="base-input w-3/4"
              placeholder="想吃什麼？"
            />
            <div class="flex w-1/4 items-center gap-1">
              <span><Icon name="material-symbols:attach-money-rounded" size="24" /></span>
              <input v-model.number="target.price" type="number" class="base-input" />
            </div>
            <button type="button" @click="removeTarget(target.temporyId)">
              <Icon name="ic:outline-remove-circle-outline" size="24" />
            </button>
          </div>
          <button type="button" class="mt-4 cursor-pointer" @click="addTarget">
            <Icon
              name="material-symbols:add-circle-outline-rounded"
              size="30"
              class="text-emerald-700"
            />
          </button>
        </div>
        <div class="w-full">
          <label for="memo" class="form-label">備忘錄</label>
          <textarea
            id="memo"
            v-model="postData.memo"
            name="memo"
            rows="4"
            class="base-textarea"
            placeholder="有什麼要記錄嗎？"
          ></textarea>
        </div>
        <div class="mt-2 flex w-full justify-end">
          <button type="button" class="base-btn" @click="handleAddPocket">POST</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
