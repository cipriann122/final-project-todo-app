<template>
  <header>
    <div class="wrapper">
      <!-- Display a welcome message using the HelloWorld component -->
      <HelloWorld msg="Final Boiler Plate" />

      <!-- Navigation links -->
      <nav>
        <template v-if="!isLoggedIn">
          <!-- If the user is not logged in, show these links -->
          <RouterLink to="/auth/login">Login</RouterLink>
          <RouterLink to="/auth/register">Register</RouterLink>
        </template>
        <template v-else>
          <!-- If the user is logged in, show these links -->
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/all-tasks">All Tasks</RouterLink>
          <RouterLink to="/completed-tasks">Completed Tasks</RouterLink>
          <RouterLink to="/add-task">Add New Task</RouterLink>
          <button @click="handleSignOut">Sign Out</button>
        </template>
      </nav>
      <button @click="toggleDark()">Toggle Dark Mode</button>
    </div>
  </header>

  <!-- RouterView to display the current route's component -->
  <RouterView />
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../src/stores/user";
import { useDark, useToggle } from "@vueuse/core";

const router = useRouter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const isUserloggedIn = ref(false);
const isDark = useDark();
const toggleDark = useToggle(isDark);

onMounted(() => {
  try {
    // Fetch the user data from the store
    userStore.fetchUser();
    // Check if the user is stored in localStorage
    if (!user.value) {
      // If no user is found, redirect to login page
      router.push({ path: "/auth/login" });
    } else {
      // If user is found, update the reactive variable and redirect to home
      isUserloggedIn.value = true;
      router.push({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
});
/**
 * Signs out the user and redirects to the login page.
 */
let handleSignOut = () => {
  // Call the signOut function from the user store
  userStore.signOut();
  // Redirect to login page
  router.push({ path: "/auth/login" });
  // Update the reactive variable to false
  isUserloggedIn.value = false;
};
</script>
