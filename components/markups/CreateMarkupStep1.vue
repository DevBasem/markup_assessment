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
        v-model="localFormData.groupName"
        aria-describedby="Group Name"
      />
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
          v-model.number="localFormData.incomingValue"
          aria-describedby="incoming-help"
        />
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
          v-model.number="localFormData.outgoingValue"
          aria-describedby="outgoing-help"
        />
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
});

const localFormData = ref({ ...props.formData });

// Watch for changes in the local form data and update props
watch(
  localFormData,
  (newValue) => {
    props.formData.groupName = newValue.groupName;
    props.formData.incomingValue = newValue.incomingValue;
    props.formData.outgoingValue = newValue.outgoingValue;
    props.formData.customMarkups = newValue.customMarkups;
    props.formData.visible = newValue.visible;
  },
  { deep: true }
);
</script>
