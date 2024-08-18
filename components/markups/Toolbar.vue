<template>
  <div>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="value1"
        placeholder="Search"
      />
    </IconField>
  </div>

  <div
    class="flex max-sm:flex-wrap max-sm:items-center max-sm:flex-col-reverse gap-4"
  >
    <div>
      <Button
        label="Filter"
        icon="pi pi-filter-fill"
        severity="secondary"
        class="text-primaryAccent bg-secondaryAccent"
      />
    </div>

    <div>
      <MarkupsCreateMarkupGroup />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(null);
</script>

<style lang="scss" scoped></style>
