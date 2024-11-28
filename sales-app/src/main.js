import Vue from 'vue';
import router from '.router';
import store from './store';
import './style.css';
import App from './App.vue';
// I am Creating a new Vue instance that i'll mount it to the DOM
new Vue({
    router, // puts the router into the Vue instance
    store, 
    render: h => h(App), // Rendering the root App component
  }).$mount('#app'); // Mounting the Vue instance to the DOM

