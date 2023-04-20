import { createRouter, createWebHistory } from 'vue-router';

// Import your components here
// @ts-ignore
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import Tasks from '../views/Tasks.vue';
import SignOut from '../views/SignOut.vue';
import axios from 'axios';

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp,
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: SignIn,
  },
  
    {
        path: '/signout',
        name: 'Sign Out',
        beforeEnter: async (to, from, next) => {
          try {
            // Send a DELETE request to the server-side logout endpoint
            const response = await axios.delete('/api/sessions');
      
            // Log the user out
            console.log(response.data.message);
      
            // Remove the session ID from local storage
            localStorage.removeItem('sessionId');
      
            // Redirect to the sign in page
            next('/signin');
          } catch (error) {
            console.error('Failed to logout', error);
            next('/'); // Redirect to home page anyway
          }
        },
      },
      
    
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
