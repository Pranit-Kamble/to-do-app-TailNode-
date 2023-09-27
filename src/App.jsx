import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

const App = () => {
  const [name,setName]=useState('')
  const [count,setCount]=useState(0)
  const [todo, setTodo] = useState(() => {
    const localStorageTodos = localStorage.getItem("todos");
    return localStorageTodos ? JSON.parse(localStorageTodos) : [];
  });
  useEffect(()=>{
    console.log(todo)
    localStorage.setItem("todos", JSON.stringify(todo));
    for(let i=0;i<todo.length;i++){
      if(todo[i].completed===true){
        document.getElementsByClassName('todo-name')[i].style.textDecoration='line-through'
      }
    }
  },[todo])

  const handleAdd=(e)=>{
    if(e.key==='Enter'){
      setTodo(prevArray => [...prevArray, {task:name,completed:false}])
      
      document.getElementsByClassName('input-text')[0].value=''
    }
  }
  const handleClick=(e,oldIndex,newIndex)=>{
    const updatedTodos = [...todo];
    updatedTodos[e.target.id].completed = true;
    setTodo(updatedTodos);
    console.log(todo);
    setCount(count+1)
    // const newTodo = [...todo];
    // const element = newTodo[oldIndex];
    // newTodo.splice(oldIndex, 1);
    // newTodo.splice(newIndex, 0, element);
    // setTodo(newTodo);
    
 
  }
  const handleReset=()=>{
    setTodo([])
  }
  return (
    <div className='container' >
      <h1>To-Do-App</h1>
      <img src="https://visme.co/blog/wp-content/uploads/2019/10/animated-presentation-software-header-wide.gif" alt="" />

        <input className='input-text' onKeyDown={(e)=>handleAdd(e)} onChange={(e)=>setName(e.target.value)} placeholder='Type name of the task and press Enter' type="text" name="" id="" />

        <button onClick={()=>handleReset()} className='reset-btn'>RESET</button>

        <div className='to-do-container'>
          {
            todo &&
            todo.map((data,idx)=>{
              return(
                <div key={idx} className='todo'>
                  <div className='todo-name'>{data.task}</div>
                  <button className='complete-btn' id={idx} onClick={(e)=>{handleClick(e,idx,todo.length-1)}} >complete</button>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default App