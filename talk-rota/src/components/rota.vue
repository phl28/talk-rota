<script setup lang="ts">
import { KButton, KInputNumber, KInputDate } from "@cambridgekineticsltd/kinetic-ui";
import { ref, reactive } from 'vue';
import type { Dayjs } from 'dayjs';
import tableRow from './tableRow.vue'

let id = 0;
const newMember = ref('')
const members = ref(new Array)
const numMembersCheck = ref(false)

function addMember() {
    if (members.value.length  < numMembers.value) {
        members.value.push({ id: id++, member_name: newMember.value })
        addRow()
        newMember.value = ''
    }

}

let fridays = Array<Date>();
let remainingFridays = Array<Date>();

function removeMember(member: object) {
    let index = members.value.findIndex(m => m === member)
    let idx = fridays.findIndex(f => (f.getDate()+ '/' + (f.getMonth()+1) + '/' + f.getFullYear()) === tableData.rows[index].date)
    members.value = members.value.filter(m => m !== member)
    deleteRow(index)
    remainingFridays.push(fridays[idx])
}


function confirm() {
    if (numMembersCheck.value === false) {
        numMembersCheck.value = !numMembersCheck.value
        fridays = allFridays(d, numMembers.value)
        remainingFridays = fridays.slice()
    }
}

let idx = 0;

let numMembers = ref(0)

const today = new Date();
let d = new Date();

// need another function to check if we have enough fridays, we would like to at least the same number of fridays as we have in the members array
function allFridays(d: Date, numMembers) {
    // get the number of fridays
    // get the number of members
    // if the number of fridays is less than the number of members, then we need to add more fridays
    // if the number of fridays is more than the number of members, then we need to remove fridays
    // if the number of fridays is equal to the number of members, then we are good to go

    let new_d = new Date(), 
        month = d.getMonth(),
        fridays = Array<Date>();
    fridays = getFridays(d, month, fridays)
    while (fridays.length < numMembers) {
        month += 1;
        new_d = new Date(d.getFullYear(), month, 1);
        fridays = getFridays(new_d, month, fridays)
    }

    return fridays.slice(0, numMembers)
}

function getFridays(d: Date, month: number, fridays: Array<Date>) {

    // Get the first Friday in the month
    while (d.getDay() !== 5) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Fridays in the month
    while (d.getMonth() === month) {
        fridays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return fridays;
}

const tableData = reactive ({
    rows: []
})


function addRow() {
    idx = Math.floor(Math.random() * remainingFridays.length)
    tableData.rows.push({ name: newMember.value, date: remainingFridays[idx].getDate() + '/' + (remainingFridays[idx].getMonth()+1) + '/' + remainingFridays[idx].getFullYear() })
    remainingFridays.splice(idx, 1)
    newMember.value = ''
}

function deleteRow(index: number) {
    tableData.rows.splice(index, 1)
}

const chgDate = ref(false);

function changeDate() {
    chgDate.value = !chgDate.value
}

// there cant only be a single value otherwise all the dates would be the same
// const dateValue = ref<Dayjs>();
</script>




<template>
    <h1>Tech Talk Rota</h1>
    <h3>Today's Date: {{ today.getDate() }}/{{ today.getMonth()+1 }}/{{ today.getFullYear() }}</h3>
    <KInputNumber label="How many members are there in the team?" v-model="numMembers" />
    <KButton variant="transparent" size="sm" label="Confirm" @click="confirm" />
    <h5>List of Fridays</h5>
    <ol v-if="numMembersCheck">
        <li v-for="friday in fridays" :key="friday">
            {{ friday.getDate() }}/{{ friday.getMonth()+1 }}/{{ friday.getFullYear() }}
        </li>
    </ol>
    <form @submit.prevent="addMember">
        <input v-model="newMember">
        <KButton variant="transparent" size="sm" label="Add Member" @click="addMember"/>    
    </form>
    <ol>
        <li v-for="member in members" :key="member.id">
        {{ member.member_name }}
        <KButton variant="primary" size=sm label="X" @click="removeMember(member)" />
        </li>
    </ol>

    <!-- table to show the dates assigned to the members -->
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tableRow v-for="(row, index) in tableData.rows" :key="index" :rowData="row" :changeDate="changeDate" :chgDate="chgDate" />
            </tbody>
        </table>

    </div>
</template>

<style scoped>
.table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
}


</style>