<template>
  <div class="container">
    <h1 class="header">Add New Task</h1>
    <div v-if="taskAdded" class="text-center">
      <p>New task succesfully created.</p>
      <button @click="startNewTask" class="button primary">
        Start a New Task
      </button>
    </div>
    <div v-else class="form-widget">
      <form @submit.prevent="handleSubmit">
        <div class="form-input">
          <label for="title" class="input-field-label">Title:</label>
          <input
            v-model="newTask.title"
            type="text"
            id="title"
            class="input-field"
            required
          />
        </div>
        <div class="form-input">
          <label for="descriptionTitle" class="input-field-label"
            >Description Title:</label
          >
          <input
            v-model="newTask.description.title"
            type="text"
            id="descriptionTitle"
            class="input-field"
            required
          />
        </div>
        <div class="form-input">
          <label for="timeToBeCompleted" class="input-field-label"
            >Time to be Completed:</label
          >
          <input
            v-model="newTask.description.timeToBeCompleted"
            type="text"
            id="timeToBeCompleted"
            class="input-field"
            required
          />
        </div>
        <div class="form-input">
          <label for="extraInfo" class="input-field-label"
            >Extra Info Required:</label
          >
          <div class="flex">
            <input
              v-model="newExtraInfo"
              type="text"
              id="extraInfo"
              class="input-field flex-1"
            />
            <button type="button" @click="addExtraInfo" class="button">
              Add Info
            </button>
          </div>
          <ul class="extra-info-list">
            <li
              v-for="(info, index) in newTask.description.extraInfoRequired"
              :key="index"
            >
              {{ info }}
              <button
                type="button"
                @click="removeExtraInfo(index)"
                class="button"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
        <button type="submit" class="button primary block">Add Task</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/user";

const taskStore = useTaskStore();
const userStore = useUserStore();
const { generateTaskForCurrentUser } = taskStore;
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

<style scoped>
.extra-info-list {
  list-style-type: none;
  padding: 0;
}
.extra-info-list li {
  margin-bottom: 0.5rem;
}
</style>
