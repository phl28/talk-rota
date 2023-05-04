<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { Dayjs } from 'dayjs';
import { KInputDate } from "@cambridgekineticsltd/kinetic-ui";


const props = defineProps({
    rowData: {
        type: Object,
        required: true
    },
    changeDate: {
        type: Function,
        required: true
    },
    chgDate: {
        type: Boolean,
        required: true
    },
})

const dateValue = ref<Dayjs>();
</script>

<template>
  <tr>
    <td>{{ rowData.name }}</td>
    <td>{{ rowData.date }}</td>
    <td><KButton @click="changeDate" size="sm" variant="primary" label="Change Date"/></td>
    <td><k-input-date v-if="chgDate" v-model="dateValue" label="Date" /></td>
  </tr>>
</template> 
  