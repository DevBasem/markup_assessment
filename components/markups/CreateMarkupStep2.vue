<template>
  <div class="pt-4">
    <div class="flex gap-1 items-center">
      <span class="font-bold text-lg">Custom Markup</span>
      <span class="text-primaryAccent text-sm font-medium">(Optional)</span>
    </div>

    <p class="text-secondaryText">
      Select Corporates to apply this markup to them, You can do this from
      markup page too.
    </p>
    <div class="py-6">
      <MultiSelect
        v-model="selectedCities"
        :options="cities"
        optionLabel="name"
        filter
        placeholder="Select Cities"
        :maxSelectedLabels="3"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCities = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]);
</script>

<style lang="scss" scoped></style>
