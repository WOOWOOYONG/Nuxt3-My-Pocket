<script setup lang="ts">
import { useField, useForm, useFieldArray } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { type ApiResponse, type Pocket } from '~/types'

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

// const targets = ref([{ name: '', price: 0, temporyId: nanoid() }])

// const addTarget = () => {
//   targets.value.push({ name: '', price: 0, temporyId: nanoid() })
// }

// const removeTarget = (targetId: string) => {
//   targets.value = targets.value.filter((target) => target.temporyId !== targetId)
// }

const postRegion = ref('北區')
const selectRegion = (region: string) => {
  postRegion.value = region
}

const postData = ref<Partial<Pocket>>({
  shopName: '',
  category: 'tw',
  memo: ''
})

const validationSchema = toTypedSchema(
  zod.object({
    shopName: zod.string().min(1, { message: '此為必填欄位' }).max(20),
    targets: zod
      .array(
        zod.object({
          name: zod.string().min(1, '品項名稱不能為空'),
          price: zod
            .union([zod.string(), zod.number()])
            .refine((val) => val !== '', { message: '此為必填欄位' })
            .transform((val) => Number(val))
            .refine((val) => val > 0, { message: '請輸入正確價格' })
        })
      )
      .min(1, '至少需要一個品項')
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    targets: [{ name: '', price: 0 }]
  }
})

interface Target {
  name: string
  price: number
}

const { value: shopName } = useField('shopName')
const { fields: targets, remove: removeTarget, push: addTarget } = useFieldArray<Target>('targets')

const getErrorMessage = (index: number, fieldName: string): string | undefined => {
  const errorKey = `targets[${index}].${fieldName}`

  return (errors.value as any)[errorKey]
}
interface FormValues {
  shopName: string
  targets: Array<{ name: string; price: number | string }>
}

const addPocketItem = async (formValue: FormValues) => {
  if (!authToken.value) {
    return
  }
  // const postTargets = targets.value.map(({ temporyId: _temporyId, ...rest }) => rest)
  try {
    const res = await $fetch<ApiResponse<Pocket>>(`${apiBaseUrl}/pocket`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken.value}`
      },
      body: {
        ...postData.value,
        ...formValue,
        region: postRegion.value
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
const onSubmit = handleSubmit((values: FormValues) => {
  addPocketItem(values)
  emits('close-modal', false)
})
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
          <li
            class="cursor-pointer rounded-lg bg-slate-300 px-3 py-2 text-xl"
            :class="{ 'bg-slate-700 text-gray-50': postRegion === '北區' }"
            @click="selectRegion('北區')"
          >
            北區
          </li>
          <li
            class="cursor-pointer rounded-lg bg-slate-300 px-3 py-2 text-xl"
            :class="{ 'bg-slate-800 text-gray-50': postRegion === '中區' }"
            @click="selectRegion('中區')"
          >
            中區
          </li>
          <li
            class="cursor-pointer rounded-lg bg-slate-300 px-3 py-2 text-xl"
            :class="{ 'bg-slate-800 text-gray-50': postRegion === '南區' }"
            @click="selectRegion('南區')"
          >
            南區
          </li>
        </ul>
      </div>
      <form class="flex flex-col items-start gap-3" @submit="onSubmit">
        <div class="w-full">
          <label for="shopName" class="form-label">*店舖名稱</label>
          <input
            id="shopName"
            ref="shopNameInput"
            v-model="shopName"
            name="shopName"
            type="text"
            class="base-input"
            maxlength="20"
            placeholder="店舖名稱"
          />
        </div>
        <span v-if="errors.shopName" class="mb-2 block w-full pl-2 text-left text-red-600">{{
          errors.shopName
        }}</span>
        <div class="relative w-full">
          <label for="category" class="form-label">*種類</label>
          <select id="category" v-model="postData.category" name="category" class="base-select">
            <option value="tw">台式</option>
            <option value="jp">日式</option>
            <option value="cn">中式</option>
            <option value="ita">義式</option>
          </select>
          <span class="absolute bottom-0 right-3 top-10 flex items-center"
            ><Icon name="material-symbols:arrow-drop-down-rounded" size="28"
          /></span>
        </div>
        <div class="w-full">
          <label for="target" class="form-label">*目標品項</label>
          <div
            v-for="(target, index) in targets"
            :key="target.key"
            class="mb-2 flex items-center gap-2"
          >
            <div class="w-3/5">
              <input
                v-model="target.value.name"
                type="text"
                class="base-input"
                placeholder="想吃什麼？"
              />
              <div
                v-if="getErrorMessage(index, 'name')"
                class="mt-2 block w-full pl-2 text-left text-red-600"
              >
                {{ getErrorMessage(index, 'name') }}
              </div>
              <div v-else class="h-6"></div>
            </div>
            <div class="w-2/5">
              <div class="relative">
                <span class="absolute left-0 top-2"
                  ><Icon name="material-symbols:attach-money-rounded" size="24"
                /></span>
                <input v-model.number="target.value.price" type="number" class="base-input pl-8" />
              </div>
              <div
                v-if="getErrorMessage(index, 'price')"
                class="mt-2 block w-full pl-2 text-left text-red-600"
              >
                {{ getErrorMessage(index, 'price') }}
              </div>
              <div v-else class="h-6"></div>
            </div>
            <button v-if="index > 0" type="button" class="pb-8" @click="removeTarget(index)">
              <Icon name="ic:outline-remove-circle-outline" size="24" class="text-red-600" />
            </button>
            <div v-else class="w-6"></div>
          </div>
          <button
            type="button"
            class="mt-4 cursor-pointer"
            @click="addTarget({ name: '', price: 0 })"
          >
            <Icon
              name="material-symbols:add-circle-outline-rounded"
              size="30"
              class="text-emerald-700"
            />
          </button>
          <span v-if="errors.targets" class="mb-2 block w-full pl-2 text-left text-red-600">{{
            errors.targets
          }}</span>
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
          <button type="submit" class="base-btn" @click="onSubmit">POST</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
