<template>
  <div class="auth-container">
    <div class="form-widget">
      <h1 class="header">Welcome to EZ2DO!</h1>
      <p class="description">Your easiest todo app.</p>
      <form @submit.prevent="signIn">
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
        <Toast position="bottom-right" />
        <Button type="submit" severity="success" label="Log in" raised />
      </form>
      <p v-show="formState.errorMsg" class="error">
        {{ formState.errorMsg }}
      </p>
      <p class="text-sm">
        Don't have an account?
        <Button
          as="router-link"
          label="Sign up"
          to="/auth/register"
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
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";

const formState = reactive({
  email: "",
  password: "",
  errorMsg: "",
});

const router = useRouter();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const toast = useToast();

const show = (msg, severity) => {
  toast.add({
    severity: severity,
    summary: severity.charAt(0).toUpperCase() + severity.slice(1),
    detail: msg,
    life: 3000,
  });
};

const signIn = async () => {
  try {
    await userStore.signIn(formState.email, formState.password);
    isLoggedIn.value = true;
    show("Login successful!", "success");
    router.push({ path: "/" });
  } catch (error) {
    show(error.message, "error");
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #1a1a1a,
    #2a2a2a
  ); /* Gradient background */
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
  color: var(--primary-color);
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

.link-button {
  margin-top: 0.5rem;
  color: var(--primary-color);
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
