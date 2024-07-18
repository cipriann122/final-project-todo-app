<template>
  <h4>This Page Displays completed tasks</h4>
  <div class="container">
    <!-- Display EXAMPLE TASKS THAT BELONG TO THE USER -->
    <ul v-if="userCompletedTasks.length > 0">
      <!-- Loop through the completedTasks array and render each task -->
      <li v-for="task in userCompletedTasks" v-bind:key="task.id">
        <!-- Display the title of the task -->
        <h5>{{ task.title }}</h5>
        <!-- Display the description title of the task -->
        <h6>{{ task.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6>{{ task.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul>
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            v-bind:key="index"
          >
            {{ extraInfo }}
          </li>
        </ul>
      </li>
    </ul>
    <!-- Display EXAMPLE TASKS THAT DO NOT BELONG TO THE USER -->
    <ul v-else>
      <!-- Loop through the completedTasks array and render each task -->
      <li v-for="task in completedTasks" v-bind:key="task.id">
        <!-- Display the title of the task -->
        <h5>{{ task.title }}</h5>
        <!-- Display the description title of the task -->
        <h6>{{ task.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6>{{ task.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul>
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            v-bind:key="index"
          >
            {{ extraInfo }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Import computed from Vue to create a computed property
import { computed } from "vue";
// Import the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";
// Import the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";

// Use the task store by saving it in a variable
const taskstore = useTaskStore();
// Use the user store by saving it in a variable
const userStore = useUserStore();

// Destructure all the possible pieces of data that we want out of this
const { tasks, getTasksByUserId } = taskstore; // Destructure necessary functions and state from the task store

// Computed property to filter completed tasks
let completedTasks = computed(() => tasks.filter((task) => task.isCompleted));

// Computed property to get completed tasks for the current user
const userCompletedTasks = computed(() => {
  // Define a computed property named 'userCompletedTasks'
  if (userStore.isLoggedIn && userStore.user) {
    // Check if the user is logged in and the user object exists
    return getTasksByUserId(userStore.user.id).filter(
      // Call 'getTasksByUserId' with the current user's ID and filter the tasks
      (task) => task.isCompleted // Return only the tasks that are marked as completed
    );
  }
  return []; // If the user is not logged in, return an empty array
});
</script>
