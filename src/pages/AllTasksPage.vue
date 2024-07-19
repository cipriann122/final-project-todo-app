<template>
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
        <button
          class="btn primary"
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

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  margin-right: 0.5rem;
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
}

.btn.secondary:hover {
  background-color: #555;
}

.error {
  color: #ff4d4f;
  margin-bottom: 1rem;
}
</style>
