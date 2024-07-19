<template>
  <div class="hamburger-menu">
    <button @click="toggleMenu" class="hamburger-button">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <transition name="slide">
      <div v-if="isOpen" class="menu-items">
        <template v-if="!isLoggedIn">
          <RouterLink to="/auth/login" class="menu-link">Login</RouterLink>
          <RouterLink to="/auth/register" class="menu-link"
            >Register</RouterLink
          >
        </template>
        <template v-else>
          <RouterLink to="/" class="menu-link">Home</RouterLink>
          <RouterLink to="/account" class="menu-link">Account</RouterLink>
          <RouterLink to="/about" class="menu-link">About</RouterLink>
          <RouterLink to="/all-tasks" class="menu-link">All Tasks</RouterLink>
          <RouterLink to="/completed-tasks" class="menu-link"
            >Completed Tasks</RouterLink
          >
          <RouterLink to="/add-task" class="menu-link">Add New Task</RouterLink>
          <button @click="handleSignOut" class="menu-link sign-out">
            Sign Out
          </button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["isLoggedIn", "handleSignOut"]);
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.hamburger-menu {
  display: none;
}

@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }

  .hamburger-button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
  }

  .hamburger-button span {
    width: 2rem;
    height: 0.25rem;
    background: var(--primary-color);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }

  .menu-items {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background-color: #1e1e1e;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 9;
  }

  .menu-link {
    font-size: 1.5rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s linear;
    display: block;
    text-align: center;
  }

  .menu-link:hover {
    color: #38a169;
  }

  .sign-out {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    width: 100%;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
}
</style>
