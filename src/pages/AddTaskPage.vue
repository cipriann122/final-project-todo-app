<template>
  <div>
    <h1>Add New Task</h1>
    <!-- v-if directive to show success message if taskAdded is true, otherwise show the form -->
    <div v-if="taskAdded">
      <p>Yay! New task created.</p>
      <button @click="startNewTask">Start a New Task</button>
    </div>
    <div v-else>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Title:</label>
          <input v-model="newTask.title" type="text" id="title" required />
        </div>
        <div>
          <label for="descriptionTitle">Description Title:</label>
          <input
            v-model="newTask.description.title"
            type="text"
            id="descriptionTitle"
            required
          />
        </div>
        <div>
          <label for="timeToBeCompleted">Time to be Completed:</label>
          <input
            v-model="newTask.description.timeToBeCompleted"
            type="text"
            id="timeToBeCompleted"
            required
          />
        </div>
        <div>
          <label for="extraInfo">Extra Info Required:</label>
          <input v-model="newExtraInfo" type="text" id="extraInfo" />
          <button type="button" @click="addExtraInfo">Add Info</button>
          <ul>
            <li
              v-for="(info, index) in newTask.description.extraInfoRequired"
              :key="index"
            >
              {{ info }}
              <button type="button" @click="removeExtraInfo(index)">
                Remove
              </button>
            </li>
          </ul>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  </div>
</template>

<script setup>
// Importing reactive and ref from Vue for reactivity and references
import { reactive, ref } from "vue";
// Importing the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";
// Importing the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";

// Use the task store
const taskStore = useTaskStore();
// Use the user store
const userStore = useUserStore();
const { generateTaskForCurrentUser } = taskStore; // Destructure addTask function from the task store

// Reactive object for the new task
const newTask = reactive({
  title: "", // Title of the new task
  description: {
    title: "", // Detailed description of the new task
    timeToBeCompleted: "", // Time required to complete the new task
    extraInfoRequired: [], // Array for additional information required for the task
  },
});

const newExtraInfo = ref(""); // Reference for new extra info input
const taskAdded = ref(false); // Reference for tracking if a task has been added

// Function to handle form submission
const handleSubmit = () => {
  const taskTitle = newTask.title;
  const taskDescription = JSON.parse(JSON.stringify(newTask.description)); // // Create a deep copy of the new task description to avoid reactivity issues
  generateTaskForCurrentUser(taskTitle, taskDescription);
  // Use generateTaskForCurrentUser to add the new task for the logged-in user
  taskAdded.value = true;
};

// Function to add extra info
const addExtraInfo = () => {
  if (newExtraInfo.value.trim()) {
    // Check if the newExtraInfo value is not empty after trimming
    newTask.description.extraInfoRequired.push(newExtraInfo.value.trim()); // Add the trimmed value to the extraInfoRequired array
    newExtraInfo.value = ""; // Clear the input field
  }
};
// Function to remove extra info
const removeExtraInfo = (index) => {
  newTask.description.extraInfoRequired.splice(index, 1); // Remove the item at the specified index from the extraInfoRequired array
};
// Function to reset the form
const resetForm = () => {
  newTask.title = ""; // Clear the title field
  newTask.description.title = ""; // Clear the description title field
  newTask.description.timeToBeCompleted = ""; // Clear the time to be completed field
  newTask.description.extraInfoRequired = []; // Clear the extra info required array
};

// Function to start a new task submission
const startNewTask = () => {
  resetForm(); // Reset the form fields
  taskAdded.value = false; // Set taskAdded to false to show the form again
};
</script>
