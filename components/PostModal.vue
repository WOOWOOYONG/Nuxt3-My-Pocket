<script setup lang="ts">
defineProps<{ showPostModal: boolean }>()
const emits = defineEmits(['close-modal'])
const closePostModal = (value: boolean) => {
  emits('close-modal', value)
}
const shopNameInput = ref<null | HTMLInputElement>(null)
onMounted(() => {
  shopNameInput.value?.focus()
})
</script>
<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-stone-700 bg-opacity-20"
    @click.self="closePostModal(false)"
  >
    <div class="min-w-[300px] rounded-md border-stone-700 bg-gray-200 p-6 md:min-w-[540px]">
      <div class="mb-4 flex items-center justify-between">
        <span
          class="w-10 cursor-pointer rounded-full px-1 py-2 hover:bg-gray-300"
          @click="closePostModal(false)"
        >
          <Icon name="ri:close-line" size="26" />
        </span>
        <ul class="flex gap-4">
          <li class="cursor-pointer text-xl">分類1</li>
          <li class="cursor-pointer text-xl">分類2</li>
        </ul>
      </div>

      <form class="flex flex-col items-start gap-3">
        <div class="w-full">
          <label for="name" class="form-label">店舖名稱</label>
          <input id="name" ref="shopNameInput" type="text" class="base-input" />
        </div>
        <div class="w-full">
          <label for="region" class="form-label">地區</label>
          <select id="region" name="region" class="base-select">
            <option value="north">北部</option>
            <option value="middle">中部</option>
            <option value="south">南部</option>
          </select>
        </div>
        <div class="w-full">
          <label for="target" class="form-label">目標品項</label>
          <div class="flex items-center gap-2">
            <input type="text" class="base-input w-3/4" />
            <div class="flex w-1/4 items-center gap-1">
              <span><Icon name="material-symbols:attach-money-rounded" size="24" /></span>
              <input type="number" class="base-input" />
            </div>
            <span class="cursor-pointer">
              <Icon
                name="material-symbols:add-circle-outline-rounded"
                size="30"
                class="text-emerald-700"
              />
            </span>
          </div>
        </div>
        <div class="w-full">
          <label for="memo" class="form-label">備忘錄</label>
          <textarea
            id="memo"
            name="memo"
            rows="4"
            class="base-textarea"
            placeholder="有什麼要記錄嗎？"
          ></textarea>
        </div>
        <div class="mt-2 flex w-full justify-end">
          <button type="button" class="base-btn">POST</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
