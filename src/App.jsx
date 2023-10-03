import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'



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
  
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleAdd=(e)=>{
    if(e.key==='Enter'){
      setTodo(prevArray => [...prevArray, {task:name,completed:false,id:generateRandomId()}])
      
      document.getElementsByClassName('input-text')[0].value=''
    }
  }
  const handleClick=(data)=>{
    const updatedTodos = [...todo];
    const findItem = updatedTodos.find(item => item.id === data.id);
    const itemToMove = {task:findItem.task,id:findItem.id,completed:true}
    console.log(itemToMove)
    const newArrayWithoutItem = updatedTodos.filter(item => item.id !== data.id);
    newArrayWithoutItem.push(itemToMove);
    setTodo(newArrayWithoutItem);
    // setTodo(updatedTodos);
    console.log(todo);
    setCount(count+1)
  }
  const handleReset=()=>{
    setTodo([])
  }
  // const handleDelete=(idx)=>{
  //   console.log(idx)
  // }
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
                  <button className='complete-btn' id={idx} onClick={()=>{handleClick(data)}} >complete</button>
              
                   {/* <button id={idx} onClick={(e)=>handleDelete(e)}><FontAwesomeIcon style={{color:'red'}} size='2x' icon={faTrashCan} /> </button> */}
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default App