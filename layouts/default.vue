<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="grow py-16 text-center">
      <div class="container">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
