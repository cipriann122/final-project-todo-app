<template>
  <h4>This Page Displays completed tasks</h4>
  <div class="container">
    <!-- Display tasks that belong to the current user and are completed -->
    <ul v-if="userCompletedTasks.length > 0">
      <li v-for="task in userCompletedTasks" :key="task.id">
        <h5>{{ task.task }}</h5>
        <!-- Display task title -->
        <h6>{{ task.description.title }}</h6>
        <!-- Display task description title -->
        <h6>{{ task.description.timeToBeCompleted }}</h6>
        <!-- Display task time to be completed -->
        <ul>
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            :key="index"
          >
            {{ extraInfo }}
          </li>
        </ul>
      </li>
    </ul>
    <!-- Display a message if no completed tasks are found for the current user -->
    <div v-else>
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
