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
import { useToast } from "primevue/usetoast";

const taskStore = useTaskStore();
const userStore = useUserStore();
const toast = useToast();
const { generateTaskForCurrentUser } = taskStore;

const newTask = reactive({
  title: "",
  description: {
    title: "",
    timeToBeCompleted: "",
    extraInfoRequired: [],
  },
});

const newExtraInfo = ref("");
const taskAdded = ref(false);

const handleSubmit = () => {
  const taskTitle = newTask.title;
  const taskDescription = JSON.parse(JSON.stringify(newTask.description));
  generateTaskForCurrentUser(taskTitle, taskDescription);
  taskAdded.value = true;
};

const addExtraInfo = () => {
  if (newExtraInfo.value.trim()) {
    newTask.description.extraInfoRequired.push(newExtraInfo.value.trim());
    newExtraInfo.value = "";
  }
};
// Function to remove extra info
const removeExtraInfo = (index) => {
  newTask.description.extraInfoRequired.splice(index, 1);
};
const resetForm = () => {
  newTask.title = "";
  newTask.description.title = "";
  newTask.description.timeToBeCompleted = "";
  newTask.description.extraInfoRequired = [];
};

const startNewTask = () => {
  resetForm();
  taskAdded.value = false;
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
