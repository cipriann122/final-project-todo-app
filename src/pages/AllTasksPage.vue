<template>
  <h4>This Page Displays all tasks</h4>
  <div class="container">
    <div v-if="loading">Loading tasks...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-else-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id">
        <h5>{{ task.task }}</h5>
        <p>Title: {{ task.description.title }}</p>
        <p>
          Extra Info Required:
          {{ task.description.extraInfoRequired.join(", ") }}
        </p>
        <p>Time to Be Completed: {{ task.description.timeToBeCompleted }}</p>
        <p>{{ task.is_complete ? "Completed" : "Incomplete" }}</p>
        <button
          :disabled="task.is_complete"
          @click="markTaskCompleted(task.id)"
        >
          Mark as Completed
        </button>
        <Button
          label="Mark as Completed"
          text
          raised
          @click="markTaskCompleted(task.id)"
        />
        <button @click="deleteTask(task.id)">Delete Task</button>
        <button @click="editTaskClicked(task)">Edit Task</button>
        <!-- New button for edit -->
      </li>
    </ul>
    <div v-else>
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
import TaskEditModal from "../components/TaskEditModal.vue";

const taskstore = useTaskStore();
const userStore = useUserStore();

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
    await getTasksByUserId(userId); // Ensure we wait for this promise to resolve
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
  // Call editTask from taskstore to update the task
  editTask(updatedTask.id, updatedTask);
  closeEditModal();
}

function closeEditModal() {
  showEditModal.value = false;
}
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
