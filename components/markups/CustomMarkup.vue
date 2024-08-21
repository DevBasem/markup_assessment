<template>
  <div>
    <div class="flex gap-1 items-center">
      <span class="font-bold text-lg">Custom Markup</span>
      <span class="text-primaryAccent text-sm font-medium">(Optional)</span>
    </div>

    <p class="text-secondaryText">
      You can add customized markups for specific assets.
    </p>

    <div
      class="py-4"
      v-if="!formData.visible"
    >
      <Button
        label="Add Asset Markup"
        icon="pi pi-plus"
        severity="secondary"
        class="bg-primaryAccent text-white"
        @click="addMarkup"
      />
    </div>

    <!-- Show Custom Added Markup Start -->
    <div
      class="pt-4"
      v-if="formData.visible"
    >
      <div
        v-for="(markup, index) in formData.customMarkups"
        :key="index"
        class="pb-4"
      >
        <div class="flex max-sm:flex-wrap gap-4 items-center max-sm:border-t">
          <div class="w-4/5 max-sm:w-full max-sm:pt-4">
            <Select
              id="asset"
              v-model="markup.selectedAsset"
              :options="assets"
              optionLabel="name"
              placeholder="Select an Asset"
              class="w-full focus:border-blue-500"
              :pt="{ label: { class: 'text-sm' } }"
            />
          </div>

          <div class="flex gap-4 w-full">
            <div class="w-full">
              <InputText
                id="custom_incoming"
                v-model.number="markup.incoming"
                type="number"
                placeholder="Incoming Value"
                aria-describedby="incoming-help"
                class="w-full border-1 placeholder:text-sm placeholder:text-secondaryText placeholder:text-opacity-60 focus:border-blue-500"
              />
            </div>

            <div class="w-full">
              <InputText
                id="custom_outgoing"
                v-model.number="markup.outgoing"
                type="number"
                placeholder="Outgoing Value"
                aria-describedby="outgoing-help"
                class="w-full border-1 placeholder:text-sm placeholder:text-secondaryText placeholder:text-opacity-60 focus:border-blue-500"
              />
            </div>

            <div>
              <button
                type="button"
                class="block w-full p-2 rounded bg-gray-100"
                @click="removeMarkup(index)"
              >
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <button
          type="button"
          class="flex items-start justify-center gap-2 w-full p-2 rounded bg-secondaryAccent text-primaryAccent font-medium"
          @click="addMarkup"
        >
          <span>
            <i
              class="pi pi-plus"
              style="font-size: 0.9rem"
            ></i>
          </span>
          <span>Add Asset</span>
        </button>
      </div>
    </div>
    <!-- Show Custom Added Markup End -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const localFormData = ref({ ...props.formData });

type Asset = {
  name: string;
  id: number;
};

const assets = ref<Asset[]>([]);

const fetchAssets = async () => {
  try {
    const response = await axios.get<{ data: Asset[] }>(
      'https://test.mowafaqa.com.sa/api/assets'
    );
    assets.value = response.data.data.map((asset) => ({
      name: asset.name,
      id: asset.id,
    }));
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
};

const addMarkup = () => {
  localFormData.value.visible = true;
  localFormData.value.customMarkups.push({
    selectedAsset: null,
    incoming: '',
    outgoing: '',
  });
};

const removeMarkup = (index: number) => {
  localFormData.value.customMarkups.splice(index, 1);
  if (localFormData.value.customMarkups.length === 0) {
    localFormData.value.visible = false;
  }
};

watch(
  localFormData,
  (newValue) => {
    props.formData.customMarkups = newValue.customMarkups;
    props.formData.visible = newValue.visible;
  },
  { deep: true }
);

onMounted(() => {
  fetchAssets();
});
</script>

<style>
.p-inputwrapper-focus {
  border-color: #3b82f6 !important;
}
</style>
