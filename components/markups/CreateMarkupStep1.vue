<template>
  <div>
    <div class="flex flex-col gap-2 py-4">
      <label
        class="text-sm text-secondaryText font-medium"
        for="groupName"
      >
        Group Name
      </label>
      <InputText
        id="groupName"
        placeholder="Enter a name"
        v-model="localFormData.groupName"
        aria-describedby="groupName-error"
        class="border-2 placeholder:text-sm placeholder:text-secondaryText placeholder:text-opacity-60"
        :class="{
          'border-red-500': errors.groupName,
          'focus:border-blue-500': !errors.groupName,
        }"
      />
      <!-- Display error message for groupName -->
      <p
        v-if="errors.groupName"
        class="text-red-500 text-sm"
      >
        {{ errors.groupName }}
      </p>
    </div>

    <div class="flex flex-wrap gap-4 pb-4">
      <div class="flex-1 flex flex-col gap-2">
        <label
          class="text-sm text-secondaryText font-medium"
          for="incoming"
        >
          General Incoming Value (%)
        </label>
        <InputText
          id="incoming"
          type="number"
          placeholder="Enter a number"
          v-model.number="localFormData.incomingValue"
          aria-describedby="incoming-error"
          class="border-2 placeholder:text-sm placeholder:text-secondaryText placeholder:text-opacity-60"
          :class="{
            'border-red-500': errors.incomingValue,
            'focus:border-blue-500': !errors.incomingValue,
          }"
        />
        <!-- Display error message for incomingValue -->
        <p
          v-if="errors.incomingValue"
          class="text-red-500 text-sm"
        >
          {{ errors.incomingValue }}
        </p>
      </div>

      <div class="flex-1 flex flex-col gap-2">
        <label
          class="text-sm text-secondaryText font-medium"
          for="outgoing"
        >
          General Outgoing Value (%)
        </label>
        <InputText
          id="outgoing"
          type="number"
          placeholder="Enter a number"
          v-model.number="localFormData.outgoingValue"
          aria-describedby="outgoing-error"
          class="border-2 placeholder:text-sm placeholder:text-secondaryText placeholder:text-opacity-60"
          :class="{
            'border-red-500': errors.outgoingValue,
            'focus:border-blue-500': !errors.outgoingValue,
          }"
        />
        <!-- Display error message for outgoingValue -->
        <p
          v-if="errors.outgoingValue"
          class="text-red-500 text-sm"
        >
          {{ errors.outgoingValue }}
        </p>
      </div>
    </div>

    <CustomMarkup :formData="localFormData" />
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import CustomMarkup from './CustomMarkup';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:formData']);

const localFormData = ref({ ...props.formData });

// Watch for changes in the local form data and emit updates
watch(
  localFormData,
  (newValue) => {
    emit('update:formData', newValue);
  },
  { deep: true }
);
</script>

<style scoped>
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
</style>
