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
                class="focus:border-blue-500 border-1"
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
            class="focus:border-blue-500 border-1"
            fluid
          />
          <InputText
            v-if="col.field === 'assignedCorporates'"
            v-model="slotProps.data[col.field]"
            class="focus:border-blue-500 border-1"
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
            label="Save"
            :model="items(slotProps.data)"
            severity="secondary"
            @click="saveRow(slotProps.data)"
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

const props = defineProps(['searchWord']);
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
    console.error('Error fetching markups:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchMarkups();
});

const filteredMarkups = computed(() => {
  const word = props.searchWord.toLowerCase();
  return markups.value.filter(
    (markup) =>
      markup.name.toLowerCase().includes(word) ||
      markup.assignedCorporates.toLowerCase().includes(word)
  );
});

const isEditingRow = (data) => {
  return editingRows.value.some((row) => row.id === data.id);
};

const onRowEditSave = (event) => {
  let { newData, index } = event;
  markups.value[index] = newData;
};

// A Dev Note:
// In my humble knowledge, when we need to modify data on the backend,
// we send the ID as a parameter in the URL. The backend processes the request
// and sends back the modified payload, which can then be processed and
// displayed on the frontend.

// in the task simulated url contains an id as a parameter
// thats why i didn't understand the requirement.

const sendEditRequest = async (id, updatedData) => {
  try {
    const response = await axios.put(`https://example.com/api/markups/${id}`, {
      updatedData,
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
  console.log(updatedData);
};

const sendDeleteRequest = async (id, remainingData) => {
  try {
    const response = await axios.delete(
      `https://example.com/api/markups/${id}`,
      {
        data: { remainingData },
      }
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
  console.log(remainingData);
};

const saveRow = (row) => {
  const index = markups.value.findIndex((markup) => markup.id === row.id);
  if (index !== -1) {
    markups.value[index] = row;
    editingRows.value = [];
  }

  sendEditRequest(row.id, markups.value);

  toast.add({
    severity: 'success',
    summary: 'Saved',
    detail: `Row with id: ${row.id} has been Saved.`,
    life: 3000,
  });
};

const deleteRow = (id) => {
  const index = markups.value.findIndex((markup) => markup.id === id);
  if (index !== -1) {
    markups.value.splice(index, 1);
  }

  sendDeleteRequest(id, markups.value);

  toast.add({
    severity: 'error',
    summary: 'Deleted',
    detail: `Row with the id: ${id} is deleted`,
    life: 3000,
  });
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
      deleteRow(data.id);
    },
  },
];
</script>

<style>
li.p-tieredmenu-item[aria-label='Delete'] .p-tieredmenu-item-content:hover {
  background-color: rgba(255, 0, 0, 0.2) /* Your CSS styles here */;
}
</style>
