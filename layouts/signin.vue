<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="grow py-16 text-center">
      <div class="container">
        <section>
          <div class="mx-auto max-w-sm">
            <h2 class="mb-14 text-4xl font-bold">My Pocket</h2>
            <div class="mb-6 flex justify-between px-10">
              <NuxtLink class="block w-1/2 text-xl" to="/login">登入</NuxtLink>
              <NuxtLink class="block w-1/2 text-xl" to="/signup">註冊</NuxtLink>
            </div>
            <slot />
            <ul>
              <li>
                <a
                  href="http://localhost:8080/auth/google"
                  class="flex items-center justify-center gap-3 rounded-md border border-gray-500 bg-slate-100 py-2 dark:bg-slate-900"
                >
                  <img src="/icons/google.svg" />
                  <p>透過Google繼續</p>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
<style scoped>
.router-link-active {
  @apply border-b-2 border-stone-400 pb-2 font-medium;
}
</style>
