<template>
  <div class="datatable-container">
    <!-- Show loading spinner or message while data is being fetched -->
    <Loading v-if="isLoading" />

    <DataTable
      v-else
      v-model:editingRows="editingRows"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      :value="filteredMarkups"
      tableStyle="min-width: 57rem"
    >
      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      >
        <!-- Body template for each column -->
        <template #body="slotProps">
          <span>
            <template v-if="isEditingRow(slotProps.data)">
              <InputText
                v-model="slotProps.data[col.field]"
                :disabled="col.field === 'assignedCorporates'"
                fluid
              />
            </template>
            <template v-else>
              {{ slotProps.data[col.field] }}
            </template>
          </span>
        </template>

        <!-- Editor template for editable fields -->
        <template #editor="slotProps">
          <!-- Editable fields in row editor mode -->
          <InputText
            v-if="col.field !== 'actions' && col.field !== 'assignedCorporates'"
            v-model="slotProps.data[col.field]"
            fluid
          />
          <InputText
            v-if="col.field === 'assignedCorporates'"
            v-model="slotProps.data[col.field]"
            disabled
            fluid
          />
        </template>
      </Column>
      <!-- Additional column for Actions button, always visible -->
      <Column
        header="Actions"
        field="actions"
        style="width: 10%; min-width: 8rem"
      >
        <template #body="slotProps">
          <SplitButton
            label="Actions"
            :model="items(slotProps.data)"
            severity="secondary"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const props = defineProps(['searchTerm']);
const toast = useToast();
const columns = ref([
  { field: 'name', header: 'Group Name' },
  { field: 'incoming_markup', header: 'Incoming Value (%)' },
  { field: 'outgoing_markup', header: 'Outgoing Value (%)' },
  { field: 'assignedCorporates', header: 'Assigned Corporates' },
]);

const markups = ref([]);
const editingRows = ref([]);
const isLoading = ref(true);

const fetchMarkups = async () => {
  try {
    const response = await axios.get(
      'https://test.mowafaqa.com.sa/api/markups'
    );
    markups.value = response.data.data.map((markup) => ({
      id: markup.id,
      name: markup.name,
      incoming_markup: markup.incoming_markup,
      outgoing_markup: markup.outgoing_markup,
      assignedCorporates: 'RoxCustody',
    }));
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to fetch markups data',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchMarkups();
});

const filteredMarkups = computed(() => {
  const term = props.searchTerm.toLowerCase();
  return markups.value.filter(
    (markup) =>
      markup.name.toLowerCase().includes(term) ||
      markup.assignedCorporates.toLowerCase().includes(term)
  );
});

const isEditingRow = (data) => {
  return editingRows.value.some((row) => row.id === data.id);
};

const onRowEditSave = (event) => {
  let { newData, index } = event;
  markups.value[index] = newData;
};

const saveRow = (row) => {
  const index = markups.value.findIndex((markup) => markup.id === row.id);
  if (index !== -1) {
    markups.value[index] = row;
    editingRows.value = [];
  }
};

const items = (data) => [
  {
    label: 'Edit',
    command: () => {
      // Set the row to edit mode
      editingRows.value = [data];
    },
  },
  {
    label: 'Delete',
    command: () => {
      // Handle delete action
      toast.add({
        severity: 'warn',
        summary: 'Delete',
        detail: `Deleting ${data.name}`,
        life: 3000,
      });
    },
  },
];
</script>
