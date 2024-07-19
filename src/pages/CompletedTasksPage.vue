<template>
  <div class="container">
    <h1 class="header">Completed Tasks</h1>
    <div v-if="userCompletedTasks.length > 0" class="row">
      <div v-for="task in userCompletedTasks" :key="task.id" class="col-4 card">
        <h3>{{ task.title }}</h3>
        <p><strong>Title:</strong> {{ task.description.title }}</p>
        <p>
          <strong>Time to Be Completed:</strong>
          {{ task.description.timeToBeCompleted }}
        </p>
        <div v-if="task.description.extraInfoRequired.length > 0">
          <p><strong>Extra Info Required:</strong></p>
          <ul>
            <li
              v-for="(extraInfo, index) in task.description.extraInfoRequired"
              :key="index"
            >
              {{ extraInfo }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p>No completed tasks found.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/user";

const taskstore = useTaskStore();
const userStore = useUserStore();

// Computed property to filter completed tasks
const userCompletedTasks = computed(() => {
  if (userStore.isLoggedIn && userStore.user) {
    return taskstore.tasks.filter(
      (task) => task.user_id === userStore.user.id && task.is_complete
    );
  }
  return [];
});
</script>

<style scoped>
.card {
  background-color: #1e1e1e; /* Dark background for task cards */
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  color: #eee;
}

.card h3 {
  margin-top: 0;
  color: #3498db;
}
</style>
