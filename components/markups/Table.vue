<template>
  <DataTable
    :value="products"
    tableStyle="min-width: 50rem"
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
      <template
        #body="slotProps"
        v-else
      >
        {{ slotProps.data[col.field] }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

const columns = ref([
  { field: 'groupName', header: 'Group Name' },
  { field: 'incomingValue', header: 'Incoming Value (%)' },
  { field: 'outgoingValue', header: 'Outgoing Value (%)' },
  { field: 'assignedCorporates', header: 'Assigned Corporates' },
  { field: 'actions', header: 'Actions' },
]);

const products = ref([
  {
    groupName: 'Group A',
    incomingValue: 10,
    outgoingValue: 15,
    assignedCorporates: 'Corporate 1, Corporate 2',
    actions: 'Edit/Delete',
  },
  {
    groupName: 'Group B',
    incomingValue: 12,
    outgoingValue: 18,
    assignedCorporates: 'Corporate 3, Corporate 4',
    actions: 'Edit/Delete',
  },
  {
    groupName: 'Group C',
    incomingValue: 8,
    outgoingValue: 14,
    assignedCorporates: 'Corporate 5, Corporate 6',
    actions: 'Edit/Delete',
  },
  {
    groupName: 'Group D',
    incomingValue: 8,
    outgoingValue: 14,
    assignedCorporates: 'Corporate 5, Corporate 6',
    actions: 'Edit/Delete',
  },
]);

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
</style>
