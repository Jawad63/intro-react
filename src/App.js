import React, { useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()


// this is where we store our todos, so when we refresh the page our todos don't disappear:   
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])



// this is where we get our todos:
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


// This is to store the change of our todo from being not complete to complete or vise versa:
  
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList  todos = {todos} toggleTodo = {toggleTodo} />
      <input className="input-field" ref={todoNameRef} type="text" />
      <button className="buttons btn" onClick={handleAddTodo}>Add Todo</button>
      <button className="buttons" onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
