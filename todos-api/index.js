import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import Todo from "./task.model.js"

dotenv.config()


const app = express()

app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )
app.use( cors() )


const db = mongoose.connect( 'mongodb://mongodb:27017/docker-tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} )

db.then( () => {
  console.log( 'db connected' )

  // Define routes
  app.get( '/todos', async ( req, res ) => {
    const todos = await Todo.find()
    res.json( todos )
  } )

  app.get( '/todos/:id', async ( req, res ) => {
    const todo = await Todo.findById( req.params.id )
    res.json( todo )
  } )

  app.post( '/todos', async ( req, res ) => {
    const { title, description, completed } = req.body
    const todo = new Todo( {
      title,
      description,
      completed
    } )
    await todo.save()
    res.json( todo )
  } )

  app.put( '/todos/:id', async ( req, res ) => {
    const { title, description, completed } = req.body
    const updatedTodo = await Todo.findByIdAndUpdate( req.params.id, {
      title,
      description,
      completed
    }, { new: true } )
    res.json( updatedTodo )
  } )

  app.delete( '/todos/:id', async ( req, res ) => {
    await Todo.findByIdAndRemove( req.params.id )
    res.json( { message: 'Todo deleted' } )
  } )

  app.listen( process.env.PORT, () => {
    console.log( `server started at http://localhost:${process.env.PORT}` )
  } )
} )