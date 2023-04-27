<template>
  <div class="m-6 border p-6 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>
    <form class="mb-4" @submit.prevent="addTodo">
      <label class="block mb-2 font-bold" for="new-todo">New Todo</label>
      <input class="w-full px-3 py-2 border rounded" type="text" id="new-todo" v-model="newTodo" />
      <button class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Add Todo</button>
    </form>
    <ul class="space-y-2">
      <li v-for="(todo, index) in todos" :key="todo._id" class="flex items-center">
        <input type="checkbox" class="mr-2" v-model="todo.completed" @change="updateTodo(index)" />
        <span :class="{ 'line-through': todo.completed }">{{ todo.title }}</span>
        <button class="ml-auto px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
          @click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      todos: [],
      newTodo: '',
    }
  },
  async mounted () {
    console.log( process.env.VUE_APP_API_URL )
    const { data } = await axios.get( process.env.VUE_APP_API_URL + '/todos' )
    this.todos = data
  },
  methods: {
    async addTodo () {
      const { data } = await axios.post( process.env.VUE_APP_API_URL + '/todos', { title: this.newTodo } )
      this.todos.push( data )
      this.newTodo = ''
    },
    async updateTodo ( index ) {
      const todo = this.todos[index]
      await axios.put( process.env.VUE_APP_API_URL + `/todos/${todo._id}`, { completed: todo.completed } )
    },
    async deleteTodo ( index ) {
      const todo = this.todos[index]
      await axios.delete( process.env.VUE_APP_API_URL + `/todos/${todo._id}` )
      this.todos.splice( index, 1 )
    },
  },
}
</script>

<style>
.line-through {
  text-decoration: line-through;
}
</style>
