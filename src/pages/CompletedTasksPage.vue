<template>
  <div class="container">
    <h1 class="header">Completed Tasks</h1>
    <div v-if="loading" class="loading">Loading completed tasks...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="userCompletedTasks.length > 0" class="row">
      <div v-for="task in userCompletedTasks" :key="task.id" class="card">
        <template v-if="task.description">
          <h3>{{ task.task || "Untitled Task" }}</h3>
          <p>
            <strong>Description:</strong>
            {{ task.description.title || "No description available" }}
          </p>
          <p>
            <strong>Time to be Completed:</strong>
            {{ task.description.timeToBeCompleted || "Not specified" }}
          </p>
          <p>
            <strong>Time Completed:</strong>
            {{
              task.completed_at
                ? new Date(task.completed_at).toLocaleString()
                : "Not available"
            }}
          </p>
          <div
            v-if="
              task.description.extraInfoRequired &&
              task.description.extraInfoRequired.length > 0
            "
          >
            <p><strong>Extra Info:</strong></p>
            <ul>
              <li
                v-for="(info, index) in task.description.extraInfoRequired"
                :key="index"
              >
                {{ info }}
              </li>
            </ul>
          </div>
        </template>
        <p v-else><strong>Description:</strong> No description available</p>
      </div>
    </div>
    <div v-else class="no-tasks">
      <p>No completed tasks found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const userStore = useUserStore();
const { tasks } = storeToRefs(taskStore);
const { user, isLoggedIn } = storeToRefs(userStore);

const loading = ref(true);
const error = ref(null);

const userCompletedTasks = computed(() => {
  if (isLoggedIn.value && user.value) {
    return tasks.value.filter(
      (task) => task.user_id === user.value.id && task.is_complete
    );
  }
  return [];
});

onMounted(async () => {
  try {
    if (isLoggedIn.value && user.value) {
      await taskStore.getTasksByUserId(user.value.id);
    }
    loading.value = false;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    error.value = "Failed to load completed tasks. Please try again.";
    loading.value = false;
  }
});
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

.loading,
.error,
.no-tasks {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #ff4d4f;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
