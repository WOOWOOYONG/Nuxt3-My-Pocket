<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type ApiResponse, type Pocket } from '~/types'

const { authToken } = storeToRefs(useUserStore())
const { apiBaseUrl } = useApiConfig()

const {
  data: pocketList,
  error,
  refresh
} = await useFetch<ApiResponse<Pocket[]>>(`${apiBaseUrl}/pockets/collected`, {
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
</script>
<template>
  <div>
    <ul v-if="pocketList?.data" class="flex flex-col gap-3">
      <li v-for="pocket in pocketList.data" :key="pocket._id">
        <PockItem :pocket="pocket" @pocket-updated="handlePocketRefresh" />
      </li>
    </ul>
    <div v-else>目前還沒有收藏的Pocket</div>
  </div>
</template>

<style scoped></style>
