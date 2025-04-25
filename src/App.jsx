import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [finishedTodos, setFinishedTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])



  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('')
    saveToLS()
  }

  const handleEdit = (e) => {
    let id = e.target.name
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e) => {
    let id = e.target.name;

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(todos[index].isCompleted)
    saveToLS()
  }

  const handleCheckbox2 = () => {
    let id = e.target.name
    console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
  }


  return (
    <>
      <Navbar />
      <main className='lg:mx-70 lg:my-8 bg-[#e0cdfc] p-5 rounded-xl max-h-screen m-2'>
        <h1 className='font-bold text-[#6d36bf] text-2xl my-2'>Add Todos</h1>
        <div className=''>
          <input onChange={handleChange} value={todo} type="text" placeholder='Add a new task..' className='bg-white p-2 w-full border-[#7147af] rounded-xl border-0' />
          <button onClick={handleAdd} className='shadow shadow-black w-full my-2 justify-center p-2 hover:underline hover:bg-[#ac87e8] bg-[#7147af] text-white font-bold flex mr-4 rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
            </svg>
            Save
          </button>
        </div>
        {/* ------------------------------------------------------------------------------------------------------------ */}
        <div className="yourtodo sm:m-5 rounded-xl bg-white shadow shadow-gray-500 text-[#9575c6] max-h-95 overflow-scroll scrollbar-hide m-0">

          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          <div className="todos mt-5 sm:mx-10 pb-2 mx-2 justify-between">
            {todos.map(item => {
              return (
                <div key={item.id} className='flex mt-5 gap-2 justify-between border px-3 py-3 rounded-md'>
                  <div className='flex gap-4'>
                    <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" className="check" />
                    <h1 className={item.isCompleted ? "line-through" : ""}>{item.todo}</h1>
                  </div>
                  <div className='flex gap-3' >
                    <button name={item.id} onClick={handleEdit} className='hover:underline hover:bg-[#ac87e8] bg-[#7147af] text-white font-bold flex rounded-xl p-1'>Edit</button>
                    <button name={item.id} onClick={handleDelete} className='hover:underline hover:bg-[#ac87e8] bg-[#7147af] text-white font-bold flex rounded-xl p-1'>Delete</button>
                  </div>

                </div>
              )
            })}
          </div>
        </div>

      </main >
    </>

      )
}
export default App
