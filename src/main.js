import "./assets/main.css";
import "./assets/animated-background.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// PrimeVue imports
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToggleButton from "primevue/togglebutton";
import ToggleSwitch from "primevue/toggleswitch";
import ScrollTop from "primevue/scrolltop";
import ConfirmDialog from "primevue/confirmdialog";

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
app.component("ScrollTop", ScrollTop);
app.component("ConfirmDialog", ConfirmDialog);

app.use(createPinia());
app.use(router);

app.mount("#app");
