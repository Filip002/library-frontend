import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import BookList from './components/pages/BookList';
import Book from './components/pages/Book';
import SignIn from './components/pages/SignIn';
import Register from './components/pages/Register';
import CreateBook from './components/pages/CreateBook';
import UpdateBook from './components/pages/UpdateBook';
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;
  return config;
});

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: BookList },
      { path: '/:id', component: Book },
      { path: '/sign-in', component: SignIn },
      { path: '/register', component: Register },
      { path: '/create-book', component: CreateBook },
      { path: '/update-book/:id', component: UpdateBook },
    ],
  });
    
  createApp(App).use(router).mount('#app');