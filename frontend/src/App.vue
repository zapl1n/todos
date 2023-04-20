<template>
<div id="app">
  <nav>
    <router-link v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
    <router-link v-if="!isLoggedIn" to="/signin">Sign In</router-link>
    <button v-if="isLoggedIn" @click="logout">Sign Out</button>
  </nav>
  <router-view></router-view>
</div>

</template>

<script>

import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    }
  },
  async created() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      try {
        // Verify the session on the server
        const response = await axios.get('/api/sessions');

        if (response.data.success) {
          // Set the logged in flag to true
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Failed to verify session:', error);
      }
    }
  },
  methods: {
    async logout() {
      try {
        // Send a DELETE request to the server-side logout endpoint
        const response = await axios.delete('/api/sessions');

        // Log the user out
        console.log(response.data.message);

        // Set the logged in flag to false and remove the session ID from local storage
        this.isLoggedIn = false;
        localStorage.removeItem('sessionId');

        // Redirect to the sign in page
        this.$router.push('/signin');
      } catch (error) {
        console.error('Failed to logout', error);
      }
    },
  },
};
</script>
