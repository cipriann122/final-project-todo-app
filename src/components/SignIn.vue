<!--
This file defines a Vue.js component for the login process in a to-do application.
By building this component, we will achieve a user interface that allows users to log in by providing their email and password, with state management handled by Pinia.js.
-->

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

import { reactive } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { supabase } from "@/utils/supabase";

// ------------------------------------------------------------------------
// Variables Block
// ------------------------------------------------------------------------

// Route Variables for navigating users
const route = "/auth/register";
const buttonText = "Sing up";

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'isLoggedIn' out of the store, keeping its reactivity using the storeToRefs method from Pinia
const { isLoggedIn } = storeToRefs(userStore);

// ------------------------------------------------------------------------
// Functions Block
// ------------------------------------------------------------------------

/**
 * Function to handle the SignIn process.
 * It validates the user's credentials using the signIn function from the user store.
 * On success, it redirects the user to the home page.
 * On failure, it displays an error message.
 */
const signIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  isLoggedIn.value = true;
  router.push({ path: "/" });
};

/*
  The signIn function handles the login process.
  - It validates the user's credentials using the signIn function from the user store.
  - On success, it sets isLoggedIn to true and redirects the user to the home page.
  - On failure, it displays an error message and hides it after 8 seconds.
  */
</script>

<template>
  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    <!-- FORM GOES HERE -->
    <form @submit.prevent="signIn">
      <div class="form">
        <!-- Email Input -->
        <label
          >Email
          <input id="email" type="text" v-model="email" />
        </label>
        <!-- Password Input -->
        <label
          >Password
          <input id="password" type="password" v-model="password" />
        </label>
        <!-- Button -->
        <!-- I personally like semantic elements, I think they are easier to read as an engineer -->
        <button type="submit">Log in</button>
      </div>
    </form>
    <!-- END FORM -->
    <!-- Error Message Here -->
    <p v-show="errorMsg">{{ errorMsg }}</p>
    <!-- END Error Message -->

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

<style scoped>
label,
input {
  display: block;
}

button {
  margin: 0.5rem 0;
}
</style>
