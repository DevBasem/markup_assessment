<template>
  <TransitionRoot
    :show="showContent"
    appear
    enter="transition transform ease-in-out duration-300"
    enter-from="opacity-0 -translate-y-8"
    enter-to="opacity-100 translate-y-0"
    leave="transition transform ease-in-out duration-300"
    leave-from="opacity-100 translate-y-0"
    leave-to="opacity-0 -translate-y-8"
  >
    <slot />
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import { TransitionRoot } from '@headlessui/vue';

const showContent = ref(true);
</script>
