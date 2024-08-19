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
      v-if="!visible"
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
      v-if="visible"
    >
      <div
        v-for="(markup, index) in localFormData.customMarkups"
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
              class="w-full"
              :pt="{ label: { class: 'text-sm' } }"
            />
          </div>

          <div class="flex gap-4 w-full">
            <div class="w-full">
              <InputText
                v-model.number="markup.incoming"
                placeholder="Incoming Value"
                aria-describedby="incoming-help"
                class="w-full placeholder:text-sm"
              />
            </div>

            <div class="w-full">
              <InputText
                v-model.number="markup.outgoing"
                placeholder="Outgoing Value"
                aria-describedby="outgoing-help"
                class="w-full placeholder:text-sm"
              />
            </div>

            <div>
              <button
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
const assets = ref([]);
const visible = ref(false);

const fetchAssets = async () => {
  try {
    const response = await axios.get('https://test.mowafaqa.com.sa/api/assets');
    assets.value = response.data.data.map((asset) => ({
      name: asset.name,
      id: asset.id,
    }));
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
};

const addMarkup = () => {
  visible.value = true;
  localFormData.value.customMarkups.push({
    selectedAsset: null,
    incoming: '',
    outgoing: '',
  });
};

const removeMarkup = (index) => {
  localFormData.value.customMarkups.splice(index, 1);
  if (localFormData.value.customMarkups.length === 0) {
    visible.value = false;
  }
};

// Watch for changes in local form data and update props
watch(
  localFormData,
  (newValue) => {
    props.formData.customMarkups = newValue.customMarkups;
  },
  { deep: true }
);

onMounted(() => {
  fetchAssets();
});
</script>

<style lang="scss" scoped></style>
