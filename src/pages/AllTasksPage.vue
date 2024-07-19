<template>
  <div>
    <div class="container">
      <h1 class="header">All Tasks</h1>
      <div v-if="loading" class="text-center">Loading tasks...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else-if="tasks.length > 0" class="row">
        <div v-for="task in tasks" :key="task.id" class="col-4 card">
          <h3>{{ task.title }}</h3>
          <p><strong>Title:</strong> {{ task.description.title }}</p>
          <p>
            <strong>Extra Info Required:</strong>
            {{ task.description.extraInfoRequired.join(", ") }}
          </p>
          <p>
            <strong>Time to Be Completed:</strong>
            {{ task.description.timeToBeCompleted }}
          </p>
          <p>
            <strong>Status:</strong>
            {{ task.is_complete ? "Completed" : "Incomplete" }}
          </p>
          <!-- Conditional styling for Mark As Completed button -->
          <button
            :class="['btn', task.is_complete ? 'completed' : 'primary']"
            :disabled="task.is_complete"
            @click="markTaskCompleted(task.id)"
          >
            Mark as Completed
          </button>
          <button class="btn secondary" @click="deleteTask(task.id)">
            Delete Task
          </button>
          <button class="btn secondary" @click="editTaskClicked(task)">
            Edit Task
          </button>
        </div>
      </div>
      <div v-else class="text-center">
        <p>No tasks found.</p>
      </div>
    </div>
    <TaskEditModal
      v-if="showEditModal"
      :task="selectedTask"
      @updateTask="updateTask"
      @close="closeEditModal"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import TaskEditModal from "../components/TaskEditModal.vue";

const taskstore = useTaskStore();
const userStore = useUserStore();
const toast = useToast();

const { tasks, deleteTask, markTaskCompleted, getTasksByUserId, editTask } =
  taskstore;
const route = useRoute();

const loading = ref(false);
const error = ref(null);
const showEditModal = ref(false);
const selectedTask = ref(null);

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
    await getTasksByUserId(userId);
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}

function editTaskClicked(task) {
  selectedTask.value = task;
  showEditModal.value = true;
}

function updateTask(updatedTask) {
  editTask(updatedTask.id, updatedTask);
  closeEditModal();
}

function closeEditModal() {
  showEditModal.value = false;
}
</script>

<style scoped>
.header {
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
  animation: fadeIn 0.5s ease-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(110, 226, 245, 0.1);
}

.card h3 {
  margin-top: 0;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.9rem;
  text-align: center;
  margin-right: 0.5rem;
  margin-top: 1rem;
  transition: var(--transition);
  font-weight: bold;
  text-transform: uppercase;
}

.btn.primary {
  background-color: var(--primary-color);
  color: var(--background-color);
}

.btn.primary:hover {
  background-color: #5bc8db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(110, 226, 245, 0.2);
}

.btn.secondary {
  background-color: var(--input-background);
  color: var(--text-color);
}

.btn.secondary:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Completed button styling */
.btn.completed {
  background-color: #ccc; /* Greyed out */
  color: #666;
  cursor: not-allowed;
}

.error {
  color: #ff4d4f;
  margin-bottom: 1rem;
  text-align: center;
}

.text-center {
  text-align: center;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
