<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="grow px-3 pb-16 pt-8 text-center">
      <div class="container">
        <section class="grid-cols-12 sm:grid">
          <div class="col-span-3 hidden pr-16 sm:block">
            <SideBar />
          </div>
          <div class="col-span-6">
            <h1 class="mb-8 text-4xl font-bold">My Pocket</h1>
            <slot />
          </div>
        </section>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
