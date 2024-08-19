<template>
  <div class="pt-4">
    <div class="flex gap-1 items-center">
      <span class="font-bold text-lg">Custom Markup</span>
      <span class="text-primaryAccent text-sm font-medium">(Optional)</span>
    </div>

    <p class="text-secondaryText">
      Select Corporates to apply this markup to them. You can do this from the
      markup page too.
    </p>

    <div class="py-6">
      <MultiSelect
        v-model="localFormData.selectedCorporates"
        :options="corporates"
        optionLabel="name"
        filter
        placeholder="Select Corporates"
        :maxSelectedLabels="3"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const localFormData = ref({ ...props.formData });
const corporates = ref([]);

// Fetch corporates data
const fetchCorporates = async () => {
  try {
    const response = await axios.get(
      'https://test.mowafaqa.com.sa/api/corporates'
    );
    corporates.value = response.data.data.map((corporate) => ({
      name: corporate.name,
      code: corporate.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching corporates:', error);
  }
};

// Watch for changes in the local form data and update props
watch(
  localFormData,
  (newValue) => {
    props.formData.selectedCorporates = newValue.selectedCorporates;
  },
  { deep: true }
);

onMounted(() => {
  fetchCorporates();
});
</script>

<style lang="scss" scoped></style>
