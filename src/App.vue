<template>
  <div id="app">
    <nav class="navbar">
      <div class="container nav-container">
        <a @click="handleLogoClick" class="nav-logo">EZ2DO</a>
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
            <button @click="handleSignOut" class="btn sign-out-btn">
              Sign Out
            </button>
          </template>
        </div>
        <HamburgerMenu
          :isLoggedIn="isLoggedIn"
          :handleSignOut="handleSignOut"
        />
      </div>
    </nav>
    <main class="container mt-4">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../src/stores/user";
import HamburgerMenu from "./components/HamburgerMenu.vue";

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

const handleSignOut = () => {
  userStore.signOut();
  router.push({ path: "/auth/login" });
  isUserloggedIn.value = false;
};

const handleLogoClick = () => {
  if (isLoggedIn.value) {
    router.push({ path: "/" });
  }
};
</script>

<style>
:root {
  --primary-color: #6ee2f5;
  --background-color: #1a1a1a; /* Changed from #000000 to a dark grey */
  --text-color: #ffffff;
  --card-background: #2a2a2a; /* Changed from #111111 to a lighter grey */
  --input-background: #3a3a3a; /* Changed from #222222 to a medium grey */
  --shadow: 0 4px 6px rgba(110, 226, 245, 0.1);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body {
  margin: 0;
  font-family: "Roboto", "Segoe UI", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background-color: var(--background-color); */
  color: var(--text-color);
  background: linear-gradient(to bottom, #1a1a1a, #2a2a2a);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(110, 226, 245, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
}

.nav-logo:hover {
  text-shadow: 0 0 10px var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  transform: translateX(-100%);
  transition: var(--transition);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: translateX(0);
}

.btn {
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn:hover {
  background-color: #5bc8db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(110, 226, 245, 0.2);
}

.btn:active {
  transform: translateY(0);
}

.sign-out-btn {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.sign-out-btn:hover {
  background-color: var(--primary-color);
  color: var(--background-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.mt-4 {
  margin-top: 2rem;
}

/* Fade transition for route changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .nav-container {
    padding: 0 1rem;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>
