<template>
  <h4>This Page Displays all tasks</h4>
  <div class="container">
    <div v-if="loading">Loading tasks...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-else-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        <h5>{{ task.task }}</h5>
        <p>Title: {{ task.description.title }}</p>
        <p>
          Extra Info Required:
          {{ task.description.extraInfoRequired.join(", ") }}
        </p>
        <p>Time to Be Completed: {{ task.description.timeToBeCompleted }}</p>
        <p>{{ task.is_complete ? "Completed" : "Incomplete" }}</p>
        <button
          :disabled="task.is_complete"
          @click="markTaskCompleted(task.id)"
        >
          Mark as Completed
        </button>
        <button @click="deleteTask(task.id)">Delete Task</button>
      </li>
    </ul>
    <div v-else>
      <p>No tasks found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";

const taskstore = useTaskStore();
const userStore = useUserStore();

const { tasks, deleteTask, markTaskCompleted, getTasksByUserId } = taskstore;
const route = useRoute();

const loading = ref(false);
const error = ref(null);

watch(
  () => userStore.isLoggedIn,
  (loggedIn) => {
    if (loggedIn && userStore.user) {
      fetchData(userStore.user.id);
    }
  },
  { immediate: true }
);

async function fetchData(userId) {
  if (!userId) {
    console.error("No valid user ID provided.");
    return;
  }
  error.value = null;
  loading.value = true;

  try {
    await getTasksByUserId(userId); // Ensure we wait for this promise to resolve
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
