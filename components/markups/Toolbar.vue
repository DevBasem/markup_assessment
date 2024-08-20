<template>
  <div class="max-sm:w-full">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        v-model="localValue"
        @input="emitSearchWord"
        placeholder="Search By Group Name"
        class="placeholder:text-sm focus:border-blue-500 max-sm:w-full border-2"
      />
    </IconField>
  </div>

  <div class="flex max-sm:flex-col-reverse gap-4 max-sm:w-full">
    <div>
      <Button
        label="Filter"
        icon="pi pi-filter-fill"
        severity="secondary"
        class="text-primaryAccent bg-secondaryAccent max-sm:w-full"
      />
    </div>

    <div>
      <MarkupsCreateMarkupGroup />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['searchWord']);
const emit = defineEmits(['updateSearch']);

const localValue = ref(props.searchWord || '');

// Emit search word when input changes
const emitSearchWord = () => {
  emit('updateSearch', localValue.value);
};

// Watch for prop changes and update local value
watch(
  () => props.searchWord,
  (newWord) => {
    localValue.value = newWord;
  }
);
</script>

<style lang="scss" scoped></style>
