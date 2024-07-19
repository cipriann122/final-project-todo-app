<template>
  <div class="home-page">
    <!-- Welcome Message -->
    <h1>Welcome to EZ2DO, {{ userName }}!</h1>
    <p v-if="!fullNameSet && isLoggedIn" class="notice">
      You can set your full name on the
      <router-link to="/account" class="custom-link">Account Page</router-link>.
    </p>
    <p v-else class="welcome-message">
      We’re glad to have you here. What would you like to do today?
    </p>
    <p v-if="isLoggedIn" class="task-summary">
      You have {{ totalTasks }} tasks, of which {{ completedTasks }} are
      completed.
    </p>
    <p v-if="isLoggedIn" class="task-links">
      <router-link to="/all-tasks" class="custom-link"
        >See your tasks here</router-link
      >
      or
      <router-link to="/add-task" class="custom-link">add new ones</router-link
      >.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/taskStore";

const userStore = useUserStore();
const taskStore = useTaskStore();
const router = useRouter();

const userName = ref("Guest");
const fullNameSet = ref(false);
const isLoggedIn = computed(() => userStore.isLoggedIn);

const totalTasks = computed(() => taskStore.tasks.length);
const completedTasks = computed(
  () => taskStore.tasks.filter((task) => task.is_complete).length
);

onMounted(async () => {
  if (isLoggedIn.value) {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userStore.user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      const fullName = profiles?.full_name;
      userName.value = fullName
        ? fullName.split(" ")[0]
        : userStore.user.email || "User";
      fullNameSet.value = !!fullName;

      // Fetch tasks for the user
      await taskStore.getTasksByUserId(userStore.user.id);
    }
  }
});
</script>

<style scoped>
.home-page {
  text-align: center;
  margin-top: 2rem;
}

/* Logo Styling */
.logo-container {
  margin-bottom: 2rem;
}

.logo {
  max-width: 250px; /* Adjust size as needed */
  height: auto;
}

/* Text Styling */
h1 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.notice {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.welcome-message {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.task-summary {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.task-links {
  font-size: 1.2rem;
  color: var(--text-color);
}

.custom-link {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 2px;
}

.custom-link:hover {
  color: #5bc8db;
  border-bottom: 1px solid #5bc8db;
}
</style>
