<template>
  <main class="container">
    <h4>Home View</h4>
    <p>{{ useCounterStore().count }}</p>
    <p>{{ countNumber }}</p>
    <p>{{ doubleCountNumber }}</p>
    <button @click="incrementNumberFunctionFromStore">Add +1</button>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

let countStore = useCounterStore();
let countNumber = computed(() => countStore.count);
let doubleCountNumber = countStore.doubleCount;
let incrementNumberFunctionFromStore = countStore.increment;

const userStore = useUserStore();
const { getTasksForUser } = storeToRefs(userStore);

console.log(userStore.getTasksForUser());
</script>
