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
    </div>
  </header>

  <!-- RouterView to display the current route's component -->
  <RouterView />
</template>

<script setup>
// Import the HelloWorld component
import HelloWorld from "./components/HelloWorld.vue";
// Import ref, onMounted, and onBeforeMount from Vue
import { ref, onMounted, onBeforeMount } from "vue";
// Import storeToRefs from Pinia to keep reactivity
import { storeToRefs } from "pinia";
// Import useRouter from vue-router for navigation
import { useRouter } from "vue-router";
// Import useUserStore to access user-related data
import { useUserStore } from "../src/stores/user";
// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'user' and 'isLoggedIn' out of the store, keeping their reactivity using storeToRefs
const { user, isLoggedIn } = storeToRefs(userStore);
// Reactive variable to hide/show elements based on user login status
const isUserloggedIn = ref(false);
// Using the onMounted lifecycle hook to perform actions when the component is mounted
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
// ------------------------------------------------------------------------
// Additional Lifecycle Hooks (Placeholder for onBeforeMount, onUpdated)
// ------------------------------------------------------------------------

// Additional lifecycle hooks such as onBeforeMount and onUpdated can be added here if needed.
</script>
