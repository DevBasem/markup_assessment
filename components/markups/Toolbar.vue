<template>
  <div>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="localValue"
        @input="emitSearchTerm"
        placeholder="Search By Group Name"
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
import { ref, defineEmits } from 'vue';

const props = defineProps(['searchTerm']);
const emit = defineEmits(['updateSearch']);

const localValue = ref(props.searchTerm || '');

// Emit search term when input changes
const emitSearchTerm = () => {
  emit('updateSearch', localValue.value);
};

// Watch for prop changes and update local value
watch(
  () => props.searchTerm,
  (newTerm) => {
    localValue.value = newTerm;
  }
);
</script>

<style lang="scss" scoped></style>
