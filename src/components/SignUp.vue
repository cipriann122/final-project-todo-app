<!--
This file defines a Vue.js component for the sign-up process in a to-do application.
By building this component, we will achieve a user interface that allows users to register by providing their email and password, with state management handled by Pinia.js.
-->
<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Importing reactive from Vue to create a reactive form state object
import { reactive, ref } from "vue";
// Importing useRouter from vue-router for navigation
import { useRouter } from "vue-router";
// Importing PersonalRouter component for navigation links
import PersonalRouter from "./PersonalRouter.vue";
// Importing the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";
import { supabase } from "@/utils/supabase";

// ------------------------------------------------------------------------
// Variables Block
// ------------------------------------------------------------------------

// Route Variables for navigating users
// Remember they are just storing strings
// Not reactive in nature, so nor eff or reactive
const goToRoute = "/auth/login";
const buttonText = "Sign In";

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
const email = ref("");
const password = ref("");
// ------------------------------------------------------------------------
// Functions Block
// ------------------------------------------------------------------------

// Function to handle the SignUp process
const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
};

/*
  The signUp function handles the registration process.
  - It checks if the passwords match and, if so, calls the register function from the user store to register the user.
  - On successful registration, it redirects the user to the login page.
  - If there is an error during registration, it displays an error message and clears it after 5 seconds.
  - If the passwords do not match, it sets an error message and clears it after 2 seconds.
  */
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Register to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div>

    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="form">
        <!-- Email Input Field -->
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <!-- Password Input Field -->
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
        <!-- Confirm Password Input Field -->
        <div class="form-input">
          <label class="input-field-label">Confirm password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <!-- Sign Up Button -->
        <button class="button" type="submit">Sign Up</button>
        <p>
          Have an account?
          <!-- PersonalRouter component for navigation -->
          <PersonalRouter
            :route="goToRoute"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>

    <!-- Display error message if any -->
    <div v-show="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<style>
/* Style section remains unchanged */
</style>
