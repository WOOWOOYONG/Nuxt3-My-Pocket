<script lang="ts" setup>
const color = useColorMode()

function toggleColorMode() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button type="button" class="inline-block" @click="toggleColorMode">
    <Icon v-if="color.value === 'light'" name="pixelarticons:sun" size="24" />

    <Icon v-else name="pixelarticons:moon" size="24" />
  </button>
</template>

<style scoped></style>
