<!-- src/views/About.vue -->
<template>
  <div>
    <h1>About</h1>
    <ul>
      <li v-for="example in examples" :key="example.id">
        {{ example.name }}
      </li>
    </ul>
  </div>
</template>
<script>
// In your Vue component
import Example from '../models/Example';

export default {
  data() {
    return {
      examples: [],
    };
  },
  async created() {
    this.examples = await Example.getAll();
  }
};
</script>