<template>
  <header class="py-4 flex items-center justify-between max-sm:block">
    <div class="max-lg:flex max-lg:gap-2 max-lg:items-center">
      <!-- Mobile Menu Start -->
      <div class="max-lg:block hidden">
        <Button
          icon="pi pi-bars"
          severity="secondary"
          rounded
          outlined
          aria-label="mobile menu"
          @click="visible = true"
        />

        <Drawer v-model:visible="visible">
          <template #container="{ closeCallback }">
            <div class="flex flex-col h-full overflow-y-scroll">
              <div class="flex items-center justify-between px-6 pt-4 shrink-0">
                <div class="flex items-center gap-2 ms-4 py-4">
                  <NuxtImg
                    width="30"
                    height="30"
                    src="/images/logo/logo.svg"
                    alt="logo"
                  />
                  <h1 class="text-xl font-semibold tracking-tight">
                    RoxCustody
                  </h1>
                </div>
                <span>
                  <Button
                    type="button"
                    severity="secondary"
                    @click="closeCallback"
                    icon="pi pi-times"
                    rounded
                    outlined
                  ></Button>
                </span>
              </div>
              <SideMenuList />
            </div>
          </template>
        </Drawer>
      </div>
      <!-- Mobile Menu End -->
      <h3 class="text-xl font-semibold">{{ title }}</h3>

      <button class="max-sm:block hidden ms-auto">
        <i
          class="pi pi-bell mt-1 text-primaryAccent"
          style="font-size: 1.5rem"
        ></i>
      </button>
    </div>

    <div class="flex items-center justify-center">
      <button class="max-sm:hidden block">
        <i
          class="pi pi-bell mt-1 text-primaryAccent"
          style="font-size: 1.5rem"
        ></i>
      </button>
      <Divider
        class="max-sm:hidden block"
        layout="vertical"
      />
      <div class="flex gap-4 max-sm:my-2">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg"
          shape="circle"
        />

        <Select
          unstyled
          v-model="selectedCompany"
          :options="companies"
          optionLabel="name"
          placeholder="Your Company"
          :pt="{
            root: { class: 'flex items-center gap-4 cursor-pointer' },
            dropdown: { class: 'flex' },
            overlay: { class: 'bg-secondaryBG border shadow-md rounded p-2' },
            option: {
              class:
                'my-1 rounded py-1 px-2 min-w-40 hover:bg-slate-200 cursor-pointer',
            },
          }"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

import { ref } from 'vue';

const selectedCompany = ref();
const companies = ref([
  { name: 'Apple', code: 'APL' },
  { name: 'Google', code: 'GOO' },
  { name: 'Microsoft', code: 'MSF' },
  { name: 'Amazon', code: 'AMZ' },
  { name: 'Tesla', code: 'TSL' },
]);

const visible = ref(false);
</script>
