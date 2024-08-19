<template>
  <Button
    label="Create Markup Group"
    icon="pi pi-plus"
    severity="secondary"
    class="bg-primaryAccent text-white"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    modal
    header="Create Markup Group"
    :style="{ width: '45rem' }"
    class="max-sm:w-screen"
  >
    <!-- Modal Content Start -->
    <component
      :is="currentStep"
      :formData="formData"
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
        <!-- ( Next / Create Group )  Button -->
        <Button
          type="button"
          :label="step === 2 ? 'Create Group' : 'Next'"
          severity="secondary"
          class="bg-primaryAccent text-white"
          @click="step === 2 ? submitForm() : nextStep()"
        />
      </div>
    </div>
    <!-- Modal Footer End -->
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dialog from 'primevue/dialog';
import CreateMarkupStep1 from './CreateMarkupStep1';
import CreateMarkupStep2 from './CreateMarkupStep2';

const visible = ref(false);
const step = ref(1);

// Define a reactive object to hold form data
const formData = ref({
  groupName: '',
  incomingValue: null,
  outgoingValue: null,
  selectedCorporates: [],
  customMarkups: [],
});

// Handle step changes
const nextStep = () => {
  if (step.value < 2) {
    step.value++;
  }
};

const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

// Determine the current step component
const currentStep = computed(() => {
  return step.value === 1 ? CreateMarkupStep1 : CreateMarkupStep2;
});

// Method to handle form submission
const submitForm = () => {
  console.log('Form Data:', formData.value);
  // Add form submission logic here
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
