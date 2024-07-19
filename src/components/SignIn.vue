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
  height: 100vh;
  background-color: #121212;
  padding: 1rem;
}

.form-widget {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.header {
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  color: var(--primary-color);
}

.description {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #aaa;
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
  color: #ccc;
}

.link-button {
  margin-top: 0.5rem;
  color: var(--primary-color);
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .form-widget {
    padding: 1rem;
  }

  .header {
    font-size: 1.5rem;
  }

  .description {
    font-size: 0.9rem;
  }
}
</style>
