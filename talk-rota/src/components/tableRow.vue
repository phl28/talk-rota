<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { Dayjs } from 'dayjs';
import { KInputDate, KButton } from "@cambridgekineticsltd/kinetic-ui";

const props = defineProps({
    rowData: Object,
    changeDate: Function,
    chgDate: Boolean,
})

const dateValue = ref<Dayjs>();
</script>

<template>
  <tr>
    <td>{{ rowData.name }}</td>
    <td>{{ (typeof dateValue !== 'undefined') ? (dateValue.format('DD/MM/YYYY')) : (rowData.date)  }}</td>
    <td><KButton @click="changeDate" size="sm" variant="primary" label="Change Date"/></td>
    <td><k-input-date v-if="chgDate" v-model="dateValue" label="Date" /></td>
  </tr>
</template> 

<style>
.table th,
.table td {
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: rgb(45, 10, 48);
  font-weight: bold;
}

.table tr:nth-child(even) {
  background-color: rgb(54, 15, 41);
}
</style>