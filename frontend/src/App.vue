

<template>
  <div id="app">
    <nav>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>

<script>
import Tasks from './components/Tasks.vue';
export default {
  name: 'App',
  components: {
    Tasks,
  },
};

</script>
