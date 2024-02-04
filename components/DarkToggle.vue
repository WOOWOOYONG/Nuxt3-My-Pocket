<script lang="ts" setup>
const color = useColorMode()

function toggleColorMode() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button type="button" @click="toggleColorMode">
      <Icon v-if="color.value === 'dark'" name="ri:moon-line" size="24" />
      <Icon v-else name="ri:sun-line" size="24" />
    </button>
  </ClientOnly>
</template>

<style scoped></style>
