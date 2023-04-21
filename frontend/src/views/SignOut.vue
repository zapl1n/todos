<template>
  <div>
    <button @click="logout">Sign Out</button>
  </div>
</template>

<script>
import { $http } from '../utils/http'

export default {
  methods: {
    logout() {
      
      // Send a DELETE request to the backend to delete the session
      $http.request('DELETE', '//localhost:3000/sessions', null, { disableErrorHandling: true })
        .then(() => {
          // Remove the session token from local storage
          localStorage.removeItem('sessionId');
          // Redirect to the sign-in page
          this.$router.push('/signIn');
        })
        .catch(error => {
          console.error('Failed to sign out:', error);
        });
    },
  },
};
</script>
