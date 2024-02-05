<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="grow px-3 py-16 text-center">
      <div class="container">
        <h1 class="mb-10 text-4xl font-bold">My Pocket</h1>
        <section class="flex">
          <div class="min-w-[20%] pr-10">
            <SideBar />
          </div>
          <slot />
        </section>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
