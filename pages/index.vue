<template>
  <PageAnimation>
    <div>
      <HeaderMainHeader title="Markups" />
      <div>
        <div class="w-full rounded-lg bg-secondaryBG p-4">
          <h3 class="font-semibold text-lg max-sm:text-center">
            Markups Groups
          </h3>
          <h4 class="text-sm text-secondaryText py-1 max-sm:text-center">
            Manage your markups, add and edit them
          </h4>

          <div
            class="py-4 gap-4 flex flex-wrap justify-between max-sm:justify-center"
          >
            <MarkupsToolbar
              :searchWord="searchWord"
              @updateSearch="updateSearch"
            />
          </div>

          <div class="-mx-4 py-4">
            <MarkupsTable :searchWord="searchWord" />
          </div>
        </div>
      </div>
    </div>
  </PageAnimation>
</template>

<script setup>
import { ref } from 'vue';

const searchWord = ref('');

// Update search word from MarkupsToolbar
const updateSearch = (word) => {
  searchWord.value = word;
};
</script>

<style scoped></style>
