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

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
