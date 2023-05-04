<script setup lang="ts">
import { KButton, KInputNumber } from "@cambridgekineticsltd/kinetic-ui";
import { ref, computed, reactive } from 'vue';


let id = 0;
const newMember = ref('')
const members = ref(new Array)
const allMembersCheck = ref(false)
const numMembersCheck = ref(false)

function addMember() {
    if (members.value.length  < numMembers.value) {
        members.value.push({ id: id++, member_name: newMember.value })
        addRow()
        newMember.value = ''
    }

}

let fridays = Array<Date>();


// there is a bug where if you have generated once, then you cant remove the last member 
function removeMember(member: object) {
    let index = members.value.findIndex(m => m === member)
    members.value = members.value.filter(m => m !== member)
    deleteRow(index)
}

function done() {
  allMembersCheck.value = !allMembersCheck.value
}

function confirm() {
    if (numMembersCheck.value === false) {
        numMembersCheck.value = !numMembersCheck.value
        fridays = allFridays(d, numMembers.value)
    }
}

let idx = 0;

// function getNumMembers() {
//   return members.value.length
// }
let numMembers = ref(0)

function generate() {
  idx = Math.floor(Math.random() * numMembers.value)
  return idx
}
let d = new Date();

// need another function to check if we have enough fridays, we would like to at least the same number of fridays as we have in the members array
function allFridays(d: Date, numMembers) {
    // get the number of fridays
    // get the number of members
    // if the number of fridays is less than the number of members, then we need to add more fridays
    // if the number of fridays is more than the number of members, then we need to remove fridays
    // if the number of fridays is equal to the number of members, then we are good to go

    let month = d.getMonth(),
        fridays = Array<Date>();
    fridays = getFridays(d, month, fridays)
    while (fridays.length < numMembers) {
        month += 1;
        d = new Date(d.getFullYear(), month, 1);
        fridays = getFridays(d, month, fridays)
    }
    return fridays
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

const newName  = ref('')

function addRow() {
    idx = Math.floor(Math.random() * fridays.length)
    tableData.rows.push({ name: newMember.value, date: fridays[idx].getDate() + '/' + (fridays[idx].getMonth()+1) + '/' + fridays[idx].getFullYear() })
    newName.value = ''
}

function deleteRow(index: number) {
    tableData.rows.splice(index, 1)
}


</script>




<template>
    <h1>Tech Talk Rota</h1>
    <h3>Today's Date: {{ d.getDate() }}/{{ d.getMonth()+1 }}/{{ d.getFullYear() }}</h3>
    <KInputNumber label="How many members are there in the team?" v-model="numMembers" />
    <KButton variant="transparent" size="sm" label="Confirm" @click="confirm" />
    <ol v-if="numMembersCheck">
        <li v-for="friday in fridays" :key="friday">
            {{ friday.getDate() }}/{{ friday.getMonth()+1 }}/{{ friday.getFullYear() }}
        </li>
    </ol>
    <form @submit.prevent="addMember">
        <input v-model="newMember">
        <KButton variant="transparent" size="sm" label="Add Member" />    
    </form>
    <ol>
        <li v-for="member in members" :key="member.id">
        {{ member.member_name }}
        <KButton variant="primary" size=sm label="X" @click="removeMember(member)" />
        </li>
    </ol>
    <!-- <p>Total number of members: {{ getNumMembers() }}</p> -->
    <KButton variant="primary" size="sm" label="Generate" @click="done();generate()" />
    <p v-if="allMembersCheck">The lucky person is: {{ members[idx].member_name }}</p>

    <!-- table to show the dates assigned to the members -->
    <div>
        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in tableData.rows" :key="index">
                <td>{{ row.name }}</td>
                <td>{{ row.date }}</td>
                </tr>
            </tbody>
        </table>

    </div>

</template>

