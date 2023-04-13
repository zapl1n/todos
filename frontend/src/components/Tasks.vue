<template>
  <div>
    <h1>Tasks</h1>
    <form @submit.prevent="createTask">
      <input type="text" v-model="title" placeholder="Title" required />
      <button>Create</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :id="task.id" :checked="task.completed" @change="updateTask(task)" />
        <label :for="task.id">{{ task.title }}</label>
        <button @click="deleteTask(task)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      tasks: [],
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      const response = await axios.get('/tasks');
      this.tasks = response.data;
    },
    async createTask() {
      try {
        const response = await axios.post('/tasks', { title: this.title });
        this.tasks.push(response.data);
        this.title = '';
      } catch (error) {
        console.error(error);
      }
    },
    async updateTask(task) {
      try {
        await axios.put(`/tasks/${task.id}`, { title: task.title, completed: !task.completed });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(task) {
      try {
        await axios.delete(`/tasks/${task.id}`);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
