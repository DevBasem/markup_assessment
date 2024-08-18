<template>
  <div>
    <div class="flex flex-col gap-2 py-4">
      <label
        class="text-sm text-secondaryText font-medium"
        for="groupName"
        >Group Name</label
      >
      <InputText
        id="groupName"
        v-model="value"
        aria-describedby="Group Name"
      />
    </div>

    <div class="flex gap-4 pb-4">
      <div class="flex-1 flex flex-col gap-2">
        <label
          class="text-sm text-secondaryText font-medium"
          for="incoming"
          >General Incoming Value (%)</label
        >
        <InputText
          id="incoming"
          v-model="value"
          aria-describedby="username-help"
        />
      </div>
      <div class="flex-1 flex flex-col gap-2">
        <label
          class="text-sm text-secondaryText font-medium"
          for="outgoing"
          >General Outgoing Value (%)</label
        >
        <InputText
          id="outgoing"
          v-model="value"
          aria-describedby="username-help"
        />
      </div>
    </div>

    <div>
      <div class="flex gap-1 items-center">
        <span class="font-bold text-lg">Custom Markup</span>
        <span class="text-primaryAccent text-sm font-medium">(Optional)</span>
      </div>

      <p class="text-secondaryText">
        you can add customized markups for specific assets
      </p>

      <div class="py-4">
        <Button
          label="Add Asset Markup"
          icon="pi pi-plus"
          severity="secondary"
          class="bg-primaryAccent text-white"
          @click="visible = true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';

const visible = ref(false);
const value = ref(null);
</script>

<style lang="scss" scoped></style>
