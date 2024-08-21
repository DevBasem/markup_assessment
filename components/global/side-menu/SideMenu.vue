<template>
  <aside class="bg-secondaryBG min-h-screen rounded-br-3xl max-lg:hidden block">
    <div class="flex gap-2 items-center justify-center px-12 py-6">
      <NuxtImg
        width="30"
        height="30"
        src="/images/logo/logo.svg"
      />
      <h1 class="text-xl font-semibold tracking-tight">RoxCustody</h1>
    </div>
    <div>
      <SideMenuList />
    </div>
  </aside>
</template>
