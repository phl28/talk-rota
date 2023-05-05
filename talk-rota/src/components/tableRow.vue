<script setup lang="ts">
import { ref, watch } from 'vue'
import dayjs from 'dayjs';
import { KInputDate, KButton } from "@cambridgekineticsltd/kinetic-ui";

const props = defineProps({
    rowData: Object,
    index: Number,
    changeDateBool: Function,
    chgDate: Boolean,
    changeDate: Function,
})

  const dateValue = ref(dayjs(props.rowData?.date))


watch(dateValue, (newDate) => {
  if (props.changeDate) {
    props.changeDate(props.index, newDate)
  }
})
</script> 

<template>
  <tr>
    <td>{{ rowData?.name }}</td>
    <td>{{ rowData?.date  }}</td>
    <td><KButton @click="changeDateBool" size="sm" variant="primary" label="Change Date"/></td>
    <td><k-input-date v-if="chgDate" v-model="dateValue" label="Date"/></td>
  </tr>
  <!-- @k-input-date="changeDate" -->
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