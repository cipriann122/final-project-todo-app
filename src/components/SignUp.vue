<template>
  <div class="container">
    <div class="row flex-center flex">
      <div class="col-6 form-widget">
        <h1 class="header">Register to ToDo App</h1>
        <p class="description">Start organizing your tasks!</p>
        <form @submit.prevent="signUp" class="form-sign-in">
          <div class="form-input">
            <InputText
              type="text"
              v-model="formState.email"
              placeholder="Your email"
              fluid
            />
          </div>
          <div class="form-input">
            <Password
              v-model="formState.password"
              toggleMask
              :feedback="false"
              placeholder="Your password"
              fluid
            />
          </div>
          <div class="form-input">
            <Password
              v-model="formState.confirmPassword"
              toggleMask
              :feedback="false"
              placeholder="Confirm password"
              fluid
            />
          </div>
          <Toast position="bottom-right" />
          <Button type="submit" severity="success" label="Sign up" raised />
        </form>
        <p class="text-sm">
          Have an account?
          <Button
            as="router-link"
            label="Sign in"
            to="/auth/login"
            size="small"
          />
        </p>
        <div v-show="formState.errorMsg" class="error">
          {{ formState.errorMsg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const show = (msg, severity) => {
  toast.add({
    severity: severity,
    summary: severity.charAt(0).toUpperCase() + severity.slice(1),
    detail: msg,
    life: 3000,
  });
};

// Consolidating input fields and error messages into a reactive object
const formState = reactive({
  email: "", // Stores the email input
  password: "", // Stores the password input
  confirmPassword: "", // Stores the confirm password input
  errorMsg: "", // Stores any error messages
});

const router = useRouter();
const userStore = useUserStore();
const signUp = async () => {
  // Conditional Logic only using a simple IF statement
  if (formState.password === formState.confirmPassword) {
    try {
      await userStore.register(formState.email, formState.password);
      show("Registration successful!", "success");
      router.push({ path: "/auth/login" });
    } catch (error) {
      show(error.message, "error");
    }
  } else {
    show("Passwords do not match. Please try again.", "error");
  }
};
</script>

<style scoped>
.error {
  color: #ff4d4f;
  margin-top: 0.5rem;
}
</style>
