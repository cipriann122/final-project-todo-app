<template>
  <div class="hamburger-menu">
    <button @click="toggleMenu" class="hamburger-button">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <transition name="slide">
      <div :class="['menu-items', { open: isOpen }]">
        <template v-if="!isLoggedIn">
          <RouterLink
            to="/auth/login"
            class="menu-link"
            @click.native="closeMenu"
            >Login</RouterLink
          >
          <RouterLink
            to="/auth/register"
            class="menu-link"
            @click.native="closeMenu"
            >Register</RouterLink
          >
        </template>
        <template v-else>
          <RouterLink to="/" class="menu-link" @click.native="closeMenu"
            >Home</RouterLink
          >
          <RouterLink to="/account" class="menu-link" @click.native="closeMenu"
            >Account</RouterLink
          >
          <RouterLink to="/about" class="menu-link" @click.native="closeMenu"
            >About</RouterLink
          >
          <RouterLink
            to="/all-tasks"
            class="menu-link"
            @click.native="closeMenu"
            >All Tasks</RouterLink
          >
          <RouterLink
            to="/completed-tasks"
            class="menu-link"
            @click.native="closeMenu"
            >Completed Tasks</RouterLink
          >
          <RouterLink to="/add-task" class="menu-link" @click.native="closeMenu"
            >Add New Task</RouterLink
          >
          <button
            @click="handleSignOut"
            class="menu-link sign-out"
            @click.native="closeMenu"
          >
            Sign Out
          </button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { RouterLink } from "vue-router";

const props = defineProps({
  isLoggedIn: Boolean,
  handleSignOut: Function,
});

const isOpen = ref(false);
const router = useRouter();
const route = useRoute();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  document.body.classList.toggle("menu-open", isOpen.value);
};

const closeMenu = () => {
  isOpen.value = false;
  document.body.classList.remove("menu-open");
};

// Watch for route changes to close the menu
watch(route, () => {
  if (isOpen.value) {
    closeMenu();
  }
});
</script>

<style scoped>
.hamburger-menu {
  display: none;
}

@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
    position: relative;
  }

  .hamburger-button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 2000; /* Ensure the button is on top */
  }

  .hamburger-button span {
    width: 30px;
    height: 3px;
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
    width: 250px;
    background-color: #2a2a2a;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 1000; /* Ensure the menu is below the button */
    transform: translateX(100%);
    overflow: auto; /* Ensure content within the menu can scroll */
  }

  .menu-items.open {
    transform: translateX(0);
  }

  /* Prevent scrolling on the main content when the menu is open */
  body.menu-open {
    overflow: hidden;
  }
}

/* Style adjustments */
.menu-link {
  display: block;
  padding: 1rem;
  color: white;
  text-decoration: none;
}

.menu-link:hover {
  background-color: #444;
}

.sign-out {
  cursor: pointer;
  background: none;
  border: none;
  color: white;
  padding: 1rem;
  text-align: left;
  width: 100%;
}
</style>
