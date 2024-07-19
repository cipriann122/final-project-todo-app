<template>
  <div class="container">
    <h1 class="header">Completed Tasks</h1>
    <div v-if="userCompletedTasks.length > 0" class="row">
      <div v-for="task in userCompletedTasks" :key="task.id" class="col-4 card">
        <h3>{{ task.task }}</h3>
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
    // Get tasks by user ID and filter for completed tasks
    return taskstore.tasks.filter(
      (task) => task.user_id === userStore.user.id && task.is_complete
    );
  }
  return []; // Return an empty array if user is not logged in or no completed tasks
});
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
</style>
