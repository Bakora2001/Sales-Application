import { createApp } from "vue"; // I am importing Vue 3 createApp method
import App from "./App.vue"; // I am importing the root App component
import router from "./router"; // I am importing the router
import "./style.css"; // I am importing style.css in src folder
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App); // I am creating the Vue 3 app
app.use(router); // I am using the router
app.use(pinia);
app.mount("#app"); // I am mounting the app to the #app element in the index.html file
