<template>
  <div class="auth-container">
    <div class="form-widget">
      <h1 class="header">Register to EZ2DO</h1>
      <p class="description">Start organizing your tasks!</p>
      <form @submit.prevent="signUp">
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
        <Button type="submit" label="Sign up" outlined />
      </form>
      <div v-show="formState.errorMsg" class="error">
        {{ formState.errorMsg }}
      </div>
      <p class="text-sm">
        Have an account?
        <Button
          as="router-link"
          label="Sign in"
          to="/auth/login"
          size="small"
          class="link-button"
          severity="success"
          text
        />
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
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

const formState = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  errorMsg: "",
});

const router = useRouter();
const userStore = useUserStore();
const signUp = async () => {
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
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1a1a1a;
  padding: 1rem;
}

.form-widget {
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  max-width: 400px;
  width: 100%;
  text-align: center;
  animation: slideIn 0.5s ease-out;
}

.header {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: var(--primary-color); /* Color for the header text */
}

.description {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
}

.form-input {
  margin-bottom: 1rem;
}

.error {
  color: #ff4d4f;
  margin-top: 0.5rem;
}

.text-sm {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
}

/* Button Styling */
.p-button {
  color: var(--primary-color); /* Color for button text */
}

.p-button.p-button-raised {
  color: var(--primary-color); /* Color for raised button text */
}

.p-button.p-button-text {
  color: var(--primary-color); /* Color for text buttons */
}

.p-button:hover {
  color: #5bc8db; /* Hover color matching the primary color */
}

.link-button {
  margin-top: 0.5rem;
  color: var(--primary-color); /* Link color */
  text-decoration: none;
  transition: var(--transition);
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .form-widget {
    padding: 1.5rem;
  }

  .header {
    font-size: 1.8rem;
  }

  .description {
    font-size: 0.9rem;
  }
}
</style>
