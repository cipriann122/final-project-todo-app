<!--
This file defines a Vue.js component for the login process in a to-do application.
By building this component, we will achieve a user interface that allows users to log in by providing their email and password, with state management handled by Pinia.js.
-->

<template>
  <div class="container">
    <form class="row flex-center flex" @submit.prevent="signIn">
      <div>
        <h1 class="header">Welcome to EZ2DO!</h1>
        <p class="description">Your easiest todo-app.</p>
        <label
          >Email
          <input id="email" type="text" v-model="formState.email" />
        </label>
        <label
          >Password
          <input id="password" type="password" v-model="formState.password" />
        </label>
        <button type="submit">Log In</button>
      </div>
    </form>

    <p v-show="formState.errorMsg">{{ formState.errorMsg }}</p>

    <p>
      Don't have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const route = "/auth/register";
const buttonText = "Sign Up";
const formState = reactive({
  email: "", // Stores the email input
  password: "", // Stores the password input
  errorMsg: "", // Stores any error messages
});

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'isLoggedIn' out of the store, keeping its reactivity using the storeToRefs method from Pinia
const { isLoggedIn } = storeToRefs(userStore);

let signIn = async () => {
  try {
    // 1- Hitting the user store, and hitting a function that is used to LOG IN
    await userStore.signIn(formState.email, formState.password);
    // 2- Change boolean isLoggedIn variable from the store
    isLoggedIn.value = true;
    // 3 - ReRoute the user to the home page
    router.push({ path: "/" });
  } catch (error) {
    // On failure, let's display an error message
    formState.errorMsg = error.message;
    // Hide this error message after a specific time
    // Hide after 8 seconds, remember that is using always milliseconds
    setTimeout(() => {
      formState.errorMsg = "";
    }, 8000);
  }
};
</script>

<style scoped>
label,
input {
  display: block;
}

button {
  margin: 0.5rem 0;
}
</style>
