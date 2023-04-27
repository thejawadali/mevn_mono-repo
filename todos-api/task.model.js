import { Schema, model } from 'mongoose'

const todoSchema = new Schema( {
  title: String,
  description: String,
  completed: Boolean
} )

const Todo = model( 'Todo', todoSchema )

export default Todo
