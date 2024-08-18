<template>
  <div>
    <HeaderMainHeader title="Markups" />
    <div>
      <div class="w-full rounded-lg bg-secondaryBG p-4">
        <h3 class="font-semibold text-lg max-sm:text-center">Markups Groups</h3>
        <h4 class="text-sm text-secondaryText py-1 max-sm:text-center">
          Manage your markups, add and edit them
        </h4>

        <div
          class="py-4 gap-4 flex flex-wrap justify-between max-sm:justify-center"
        >
          <MarkupsToolbar />
        </div>

        <div class="-mx-4 py-4">
          <MarkupsTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(null);
const value2 = ref(null);

const visible = ref(false);
</script>

<style scoped></style>
