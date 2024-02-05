export const useUiStore = defineStore('ui', () => {
  const showDeleteBtnId = ref<null | string>(null)
  const toggleDeleteBtn = (pocketId: string) => {
    showDeleteBtnId.value = showDeleteBtnId.value === pocketId ? null : pocketId
  }
  return { showDeleteBtnId, toggleDeleteBtn }
})
