<template>
  <Button
    label="Create Markup Group"
    icon="pi pi-plus"
    severity="secondary"
    class="bg-primaryAccent text-white border-blue-500 max-sm:w-full"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    modal
    header="Create Markup Group"
    :style="{ width: '45rem' }"
    class="max-sm:w-screen max-sm:mx-1"
    @hide="resetErrors"
  >
    <form @submit.prevent="handleSubmit">
      <!-- Modal Content Start -->
      <component
        :is="currentStep"
        :formData="formData"
        :errors="errors"
        @update:formData="updateFormData"
        @update:errors="updateErrors"
      />
      <!-- Modal Content End -->

      <!-- Modal Footer Start -->
      <div class="flex justify-between items-center gap-2">
        <!-- Page Indicator -->
        <div class="w-14 flex gap-1">
          <div
            :class="{
              'bg-primaryAccent w-10': step === 1,
              'bg-primaryBG w-4': step === 2,
            }"
            class="block h-1 transition-all rounded-full"
          ></div>
          <div
            :class="{
              'bg-primaryBG w-4': step === 1,
              'bg-primaryAccent w-10': step === 2,
            }"
            class="block h-1 transition-all rounded-full"
          ></div>
        </div>

        <div class="flex gap-2">
          <!-- Back Button -->
          <Button
            v-if="step === 2"
            type="button"
            label="Back"
            severity="secondary"
            class="text-primaryAccent bg-secondaryAccent"
            @click="prevStep"
          />
          <!-- ( Next / Create Group ) Button -->
          <Button
            type="button"
            :label="step === 2 ? 'Create Group' : 'Next'"
            severity="secondary"
            class="bg-primaryAccent text-white"
            @click="step === 2 ? handleSubmit() : nextStep()"
          />
        </div>
      </div>
      <!-- Modal Footer End -->
    </form>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
import CreateMarkupStep1 from './CreateMarkupStep1.vue';
import CreateMarkupStep2 from './CreateMarkupStep2.vue';
import axios from 'axios';

interface FormData {
  groupName: string;
  incomingValue: number | string | null;
  outgoingValue: number | string | null;
  selectedCorporates: string[];
  customMarkups: CustomMarkup[];
}

interface Asset {
  id: number;
  name: string;
}

interface CustomMarkup {
  incoming: number;
  outgoing: number;
  selectedAsset: Asset;
}

interface Errors {
  groupName?: string;
  incomingValue?: string;
  outgoingValue?: string;
}

const visible = ref<boolean>(false);
const step = ref<number>(1);
const formData = ref<FormData>({
  groupName: '',
  incomingValue: null,
  outgoingValue: null,
  selectedCorporates: [],
  customMarkups: [],
});
const errors = ref<Errors>({});

const validateStep1 = (): boolean => {
  const errorsObj: Errors = {};
  if (formData.value.groupName.trim() === '') {
    errorsObj.groupName = 'Group name is required.';
  }
  if (
    formData.value.incomingValue === null ||
    formData.value.incomingValue === ''
  ) {
    errorsObj.incomingValue = 'Incoming value is required.';
  }
  if (
    formData.value.outgoingValue === null ||
    formData.value.outgoingValue === ''
  ) {
    errorsObj.outgoingValue = 'Outgoing value is required.';
  }
  errors.value = errorsObj;
  return Object.keys(errorsObj).length === 0;
};

const nextStep = () => {
  if (step.value === 1 && !validateStep1()) {
    return;
  }
  if (step.value < 2) {
    step.value++;
  }
};

const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }

  if (step.value === 1) {
    validateStep1();
  }
};

const currentStep = computed(() => {
  return step.value === 1 ? CreateMarkupStep1 : CreateMarkupStep2;
});

const handleSubmit = () => {
  if (step.value === 2) {
    submitForm();
  } else {
    nextStep();
  }
};

const sendCreateMarkupRequest = async (data: FormData) => {
  try {
    const response = await axios.post('https://example.com/api/markups', data);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const submitForm = () => {
  console.log('Form Data:', formData.value);

  // sendCreateMarkupRequest(formData.value);
  visible.value = false;
};

const updateFormData = (newData: Partial<FormData>) => {
  formData.value = { ...formData.value, ...newData };
};

const updateErrors = (newErrors: Errors) => {
  errors.value = { ...newErrors };
};

const resetErrors = () => {
  errors.value = {};
};
</script>

<style>
.p-dialog-header {
  background-color: #f6f4fe !important;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  padding: 0.8rem !important;
  padding-inline: 1.4rem !important;
}
</style>
