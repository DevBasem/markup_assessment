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
        :pt="{ pcHeaderCheckbox: { class: '' } }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const localFormData = ref({ ...props.formData });

type Corporate = {
  name: string;
};

const corporates = ref<Corporate[]>([]);

const fetchCorporates = async () => {
  try {
    const response = await axios.get<{ data: Corporate[] }>(
      'https://test.mowafaqa.com.sa/api/corporates'
    );
    corporates.value = response.data.data.map((corporate) => ({
      name: corporate.name,
    }));
  } catch (error) {
    console.error('Error fetching corporates:', error);
  }
};

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

<style>
/* Hide the number input spinner arrows in WebKit browsers (Chrome, Safari) */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide the number input spinner arrows in Firefox */
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.p-checkbox.p-component {
  display: none;
}

.p-multiselect-header {
  display: none !important;
}

.p-multiselect-list {
  gap: 0px !important;
  padding: 0px !important;
}

.p-multiselect-option {
  border-radius: 0px !important;
  padding-inline: 1.2rem !important;
}

.p-multiselect-option::before {
  content: '';
  position: absolute;
  background-color: #4723f5;
  left: 0px;
  width: 0.25rem;
  height: 100%;
  opacity: 0;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.p-multiselect-overlay.p-component {
  border: 0px;
}

.p-multiselect-option[aria-selected='true'] {
  background-color: #f6f4fe !important;
  position: relative;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.p-multiselect-option[aria-selected='true']::before {
  opacity: 100%;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.p-multiselect.p-component.p-inputwrapper {
  border-width: 1px;
  border-color: rgba(122, 128, 133, 0.4) !important;
}

.p-multiselect.p-component.p-inputwrapper.p-multiselect-open {
  border-color: #3b82f6 !important;
}
</style>
