<script setup lang="ts"></script>

<template>
  <section>
    <div class="mx-auto max-w-md">
      <form class="mb-4">
        <div class="mb-2">
          <input type="email" class="w-full rounded-md" placeholder="電子郵件" />
        </div>
        <div class="mb-2">
          <input type="password" class="w-full rounded-md" placeholder="密碼" />
        </div>
        <button class="mt-5 block w-full rounded-md border border-gray-500 py-2" type="button">
          登入
        </button>
      </form>
      <ul>
        <li>
          <a
            href="http://localhost:8080/auth/google"
            class="flex items-center justify-center gap-3 rounded-md border border-gray-500 py-2"
          >
            <img src="/icons/google.svg" />
            <p>透過Google繼續</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
