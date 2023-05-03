<script setup lang="ts">
import { KButton } from "@cambridgekineticsltd/kinetic-ui";
import { ref, computed } from 'vue';


let id = 0;
const newMember = ref('')
const members = ref(new Array)
const allMembersCheck = ref(false)

function addMember() {
  members.value.push({ id: id++, member_name: newMember.value })
  newMember.value = ''
}

function removeMember(member) {
  members.value = members.value.filter(m => m !== member)
}

function done() {
  allMembersCheck.value = !allMembersCheck.value
}

let idx = 0;

function getNumMembers() {
  return members.value.length
}
let numMembers = computed(() => members.value.length)

function generate() {
  idx = Math.floor(Math.random() * numMembers.value)
  return idx
}


function getFridays() {
    let d = new Date(),
        month = d.getMonth(),
        fridays = [];

    // Get the first Monday in the month
    while (d.getDay() !== 5) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        fridays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return fridays;
}
</script>




<template>
    <h1>Tech Talk Rota</h1>
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
    <p>Total number of members: {{ getNumMembers() }}</p>
    <KButton variant="primary" size="sm" label="Generate" @click="done();generate()" />
    <p v-if="allMembersCheck">The lucky person is: {{ members[idx].member_name }}</p>

    <table>
        <tr>
            <th>Member Name</th>
            <th>Date</th>
        </tr>
        <tr v-for="friday in getFridays()" :key="friday">
            <td>{{ members[idx].member_name }}</td>
            <!-- we can populate all as null first and when we generate someone, then we add it to a new array and put that in to the table -->
            <td>{{ friday.getDate() }}/{{ friday.getMonth() + 1 }}</td>
        </tr>
    </table>


</template>