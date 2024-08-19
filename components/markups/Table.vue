<template>
  <div class="datatable-container">
    <!-- Show loading spinner or message while data is being fetched -->
    <Loading v-if="isLoading" />

    <DataTable
      v-else
      :value="filteredMarkups"
      tableStyle="min-width: 53rem"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      >
        <template
          #body="slotProps"
          v-if="col.field === 'actions'"
        >
          <Toast />
          <SplitButton
            label="Save"
            @click="save"
            :model="items"
            severity="secondary"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const props = defineProps(['searchTerm']);
const toast = useToast();
const columns = ref([
  { field: 'name', header: 'Group Name' },
  { field: 'incoming_markup', header: 'Incoming Value (%)' },
  { field: 'outgoing_markup', header: 'Outgoing Value (%)' },
  { field: 'assignedCorporates', header: 'Assigned Corporates' },
  { field: 'actions', header: 'Actions' },
]);

const markups = ref([]);
const isLoading = ref(true); // New loading state

const fetchMarkups = async () => {
  try {
    const response = await axios.get(
      'https://test.mowafaqa.com.sa/api/markups'
    );
    markups.value = response.data.data.map((markup) => ({
      name: markup.name,
      incoming_markup: markup.incoming_markup,
      outgoing_markup: markup.outgoing_markup,
      assignedCorporates: markup.packages.map((pkg) => pkg.title).join(', '),
    }));
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to fetch markups data',
      life: 3000,
    });
  } finally {
    isLoading.value = false; // Hide loading state when data is fetched
  }
};

onMounted(() => {
  fetchMarkups();
});

// Computed property to filter markups based on searchTerm
const filteredMarkups = computed(() => {
  const term = props.searchTerm.toLowerCase();
  return markups.value.filter(
    (markup) =>
      markup.name.toLowerCase().includes(term) ||
      markup.assignedCorporates.toLowerCase().includes(term)
  );
});

const items = [
  {
    label: 'Update',
    command: () => {},
  },
  {
    label: 'Delete',
    command: () => {},
  },
  {
    label: 'Vue Website',
    command: () => {},
  },
  { label: 'Upload', command: () => {} },
];

const save = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Data Saved',
    life: 3000,
  });
};
</script>

<style>
.p-datatable-header-cell {
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #7a8085 !important;
  border-bottom: 1px;
  border-color: black;
}

.p-datatable-tbody td {
  padding-block: 1.5rem !important;
}

.datatable-container {
  position: relative;
}
</style>
