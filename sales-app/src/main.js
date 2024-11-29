import { createApp } from 'vue'; // I am importing Vue 3 createApp method
import App from './App.vue'; // I am importing the root App component
import router from './router'; // I am importing the router
import './style.css'; // I am importing style.css in src folder

// I am creating the app instance that has the router and mounts it to the app
createApp(App)
  .use(router) 
  .mount('#app'); // It mounts the app to the DOM
