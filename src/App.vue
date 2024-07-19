<template>
  <div id="app">
    <nav class="navbar">
      <div class="container nav-container">
        <RouterLink to="/" class="nav-logo">EZ2DO</RouterLink>
        <div class="nav-links">
          <template v-if="!isLoggedIn">
            <RouterLink to="/auth/login" class="nav-link">Login</RouterLink>
            <RouterLink to="/auth/register" class="nav-link"
              >Register</RouterLink
            >
          </template>
          <template v-else>
            <RouterLink to="/" class="nav-link">Home</RouterLink>
            <RouterLink to="/account" class="nav-link">Account</RouterLink>
            <RouterLink to="/about" class="nav-link">About</RouterLink>
            <RouterLink to="/all-tasks" class="nav-link">All Tasks</RouterLink>
            <RouterLink to="/completed-tasks" class="nav-link"
              >Completed Tasks</RouterLink
            >
            <RouterLink to="/add-task" class="nav-link"
              >Add New Task</RouterLink
            >
            <button @click="handleSignOut" class="btn">Sign Out</button>
          </template>
        </div>
      </div>
    </nav>
    <main class="container mt-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../src/stores/user";

const router = useRouter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const isUserloggedIn = ref(false);

onMounted(() => {
  try {
    userStore.fetchUser();
    if (!user.value) {
      router.push({ path: "/auth/login" });
    } else {
      isUserloggedIn.value = true;
      router.push({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
});

let handleSignOut = () => {
  userStore.signOut();
  router.push({ path: "/auth/login" });
  isUserloggedIn.value = false;
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--custom-color-brand);
  padding: 1rem 0;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: var(--custom-bg-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--custom-border-radius);
  transition: background-color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-button {
  background-color: var(--custom-bg-color);
  color: var(--custom-color-brand);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--custom-border-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: var(--custom-color-secondary);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
