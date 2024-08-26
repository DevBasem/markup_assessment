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
        @click="showAndAddMarkup"
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
              @blur="setTouched('asset', index)"
              @focus="clearTouched('asset', index)"
              :class="{
                'border-red-500': !isAssetValid(markup.selectedAsset),
                'border-blue-500': isAssetValid(markup.selectedAsset),
              }"
              class="w-full border-1 focus:border-blue-500"
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
                @blur="setTouched('incoming', index)"
                @focus="clearTouched('incoming', index)"
                :class="{
                  'border-red-500': !isIncomingValid(markup.incoming),
                  'border-blue-500': isIncomingValid(markup.incoming),
                }"
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
                @blur="setTouched('outgoing', index)"
                @focus="clearTouched('outgoing', index)"
                :class="{
                  'border-red-500': !isOutgoingValid(markup.outgoing),
                  'border-blue-500': isOutgoingValid(markup.outgoing),
                }"
                class="w-full border-1 placeholder:text-sm placeholder:text-secondaryText placeholder:text-opacity-60 focus:border-blue-500"
              />
            </div>

            <div>
              <button
                type="button"
                class="block w-full p-2 rounded bg-gray-100 hover:bg-gray-200"
                @click="removeMarkup(index)"
              >
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div
          v-if="!isCustomMarkupValid"
          class="bg-yellow-50 text-yellow-600 p-1 text-center rounded-md flex items-center justify-center gap-2"
        >
          <i
            class="pi pi-exclamation-circle"
            style="font-size: 1.2rem"
          ></i>
          Please Complete All Fields
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
import { ref, watch, computed, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:isCustomMarkupValid']);

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

const showAndAddMarkup = () => {
  touchedFields.value = {};

  if (localFormData.value.customMarkups.length > 0) {
    localFormData.value.customMarkups = [];
  }
  localFormData.value.visible = true;
  localFormData.value.customMarkups.push({
    selectedAsset: null,
    incoming: '',
    outgoing: '',
  });
};

const addMarkup = () => {
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

const isAssetValid = (asset: any) => asset !== null && asset !== undefined;

const isIncomingValid = (incoming: number | string) => incoming !== '';

const isOutgoingValid = (outgoing: number | string) => outgoing !== '';

const isCustomMarkupValid = computed(() => {
  // Validate each custom markup
  return localFormData.value.customMarkups.every(
    (markup: any) =>
      isAssetValid(markup.selectedAsset) &&
      isIncomingValid(markup.incoming) &&
      isOutgoingValid(markup.outgoing)
  );
});

// Define type for touched fields
interface TouchedFields {
  [key: string]: boolean;
}

const touchedFields = ref<Record<number, TouchedFields>>({});

const setTouched = (field: string, index: number) => {
  if (!touchedFields.value[index]) {
    touchedFields.value[index] = {};
  }
  touchedFields.value[index][field] = true;
};

const clearTouched = (field: string, index: number) => {
  if (!touchedFields.value[index]) {
    touchedFields.value[index] = {};
  }
  touchedFields.value[index][field] = false;
};

watch(
  localFormData,
  (newValue) => {
    props.formData.customMarkups = newValue.customMarkups;
    props.formData.visible = newValue.visible;
  },
  { deep: true }
);

watch(isCustomMarkupValid, (valid) => {
  console.log('Form validity state (watcher):', valid); // Log validity state changes
});

// Watch for changes in isCustomMarkupValid and emit the result
watch(isCustomMarkupValid, (valid) => {
  emit('update:isCustomMarkupValid', valid);
});

onMounted(() => {
  fetchAssets();
});
</script>
