<template>
  <div class="container">
    <h1 class="header">Add New Task</h1>
    <div v-if="taskAdded" class="text-center">
      <p class="message">New task successfully created.</p>
      <button @click="startNewTask" class="btn primary">
        Start a New Task
      </button>
    </div>
    <div v-else class="form-widget">
      <form @submit.prevent="handleSubmit" class="form" autocomplete="off">
        <div class="form-group">
          <label for="title" class="form-label">Title:</label>
          <input
            v-model="newTask.title"
            type="text"
            id="title"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="descriptionTitle" class="form-label"
            >Description Title:</label
          >
          <input
            v-model="newTask.description.title"
            type="text"
            id="descriptionTitle"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="timeToBeCompleted" class="form-label"
            >Time to be Completed:</label
          >
          <input
            v-model="newTask.description.timeToBeCompleted"
            type="text"
            id="timeToBeCompleted"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <label for="extraInfo" class="form-label">Extra Info Required:</label>
          <div class="flex flex-wrap gap-2">
            <input
              v-model="newExtraInfo"
              type="text"
              id="extraInfo"
              class="form-input flex-1"
              placeholder="Enter extra info"
            />
            <button
              type="button"
              @click="addExtraInfo"
              class="btn secondary plus-button"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <ul class="extra-info-list">
            <li
              v-for="(info, index) in newTask.description.extraInfoRequired"
              :key="index"
              class="extra-info-item"
            >
              {{ info }}
              <button
                type="button"
                @click="removeExtraInfo(index)"
                class="btn btn-secondary"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
        <button type="submit" class="btn primary block">Add Task</button>
      </form>
    </div>
    <Toast position="bottom-right" />
    <!-- PrimeVue Toast component -->
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast"; // Import PrimeVue Toast

const taskStore = useTaskStore();
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

const handleSubmit = async () => {
  const taskTitle = newTask.title;
  const taskDescription = JSON.parse(JSON.stringify(newTask.description));
  try {
    await generateTaskForCurrentUser(taskTitle, taskDescription);
    taskAdded.value = true;
    toast.add({
      severity: "success",
      summary: "Task Added",
      detail: "New task successfully created.",
      life: 3000,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    toast.add({
      severity: "error",
      summary: "Task Creation Failed",
      detail: "There was an error creating the task.",
      life: 3000,
    });
  }
};

const addExtraInfo = () => {
  if (newExtraInfo.value.trim()) {
    newTask.description.extraInfoRequired.push(newExtraInfo.value.trim());
    newExtraInfo.value = "";
  }
};

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
  margin-top: 0.5rem;
}

.extra-info-item {
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.extra-info-item button {
  background-color: #3498db;
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
}

.extra-info-item button:hover {
  background-color: #2980b9;
}

.form-widget {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #eee;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #ccc;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.btn {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  text-align: center;
  transition: background-color 0.3s ease;
}

.btn.primary {
  background-color: #3498db;
  color: #fff;
}

.btn.primary:hover {
  background-color: #2980b9;
}

.btn.secondary {
  background-color: #666;
  color: #fff;
  margin-left: 0.5rem;
  cursor: pointer;
}

.btn.secondary:hover {
  background-color: #555;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gap-2 {
  gap: 0.5rem;
}

.block {
  display: block;
  width: 100%;
}
</style>
