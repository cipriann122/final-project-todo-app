import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { isAuthApiError } from "@supabase/supabase-js";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToggleButton from "primevue/togglebutton";
import ToggleSwitch from "primevue/toggleswitch";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
});

app.use(ToastService);
app.component("Password", Password);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("ToggleButton", ToggleButton);
app.component("ToggleSwitch", ToggleSwitch);

app.use(createPinia());
app.use(router);

app.mount("#app");
