import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoGetThunk, todoPostThunk, todoPutThunk, todoDeleteThunk, todoCompleteThunk } from "../Redux/todo/actions"
import { Card } from "react-bootstrap";

export const Todo = () =>{

    const todoArray = useSelector((state) => state.todoStore.todo);
    const message = useSelector((state) => state.todoStore.message);
    const dispatch = useDispatch();

    //Displaying Username
    let name = localStorage.getItem("name")
    name = name.charAt(0).toUpperCase() + name.slice(1)

    useEffect(() => {
        dispatch(todoGetThunk())
        console.log('todo array:',todoArray)
    }, []);

    //Handling add new todo
    const [add, setAdd] = useState('')

    const handleAdd = () =>{
        dispatch(todoPostThunk(add))
        setAdd('')
    }

    //Handling edit 
    const [editting, setEditting] = useState(null);
    const [editInput, setEditInput] = useState('');
    const handleEdit = (i) => {
        setEditting(i)
        setEditInput(todoArray[i].todo)
    }
    const handleEditBlur = (e,i) => {
        dispatch(todoPutThunk(e.currentTarget.value,i))
        setEditting(null)
        setEditInput('')
    }

    //Handling delete
    const handleDelete = (i) => {
        dispatch(todoDeleteThunk(i))
        setEditting(null)
    }

    //Handling complete
    const handleComplete = (i) => {
        dispatch(todoCompleteThunk(i))
    }


    return(
        <>
          <div className='todoList container'>
            <div className="title todo text-center">
                <h1>{name}'s Task Planner</h1>
                <h5>- Plan your work and work your plan -</h5>
                <h6>designed by Kaho Pong © 2022</h6>
            </div>
            
            
            <div className="cards-container row d-flex justify-content-around">
            {todoArray.length == 0 ? null :
                todoArray.map((todo, i)=>{
                    return(
                          <Card key={i} className={`todo-card ${todo.isCompleted} d-flex flex-column justify-content-between`}>
                            <button onClick={()=>handleDelete(i)} className='del-btn'>x</button>

                            <div className="todo-content-container d-flex justify-content-start">
                                <span>{i+1}. </span>
                                {editting == i ? 
                                    <textarea type='text' onChange={(e)=>setEditInput(e.currentTarget.value)} onBlur={(e)=>handleEditBlur(e,i)} className='edit-input' value={editInput} /> : 
                                    <div className={`todo-content ${todo.isCompleted}`}>{todo.todo}</div>
                                }
                            </div>
                            
                            <div className="btn-container d-flex justify-content-around">
                                <button onClick={()=>handleComplete(i)} className={`complete-btn ${todo.isCompleted}`}>{todo.isCompleted ? 'Not Done' : 'Completed'}</button>
                                <button onClick={()=>handleEdit(i)} className={`edit-btn ${todo.isCompleted}`}>Edit</button>
                            </div>

                          </Card>
                    )
                })
            }
            </div>
            <div className="add-todo-container container-fluid d-flex justify-content-center align-items-end                ">
                <textarea type='text' onChange={(e)=>{setAdd(e.currentTarget.value)}} className='add-input' placeholder='Add a new task ...' value={add} />
                <button onClick={handleAdd} className='add-btn'>Confirm</button>
            </div>
            {/* Failure Message */}
            {message && message.length > 0 ? <p>Please refresh to retry. Error: {message}</p> : null}
          </div>
            

            
            
        </>
    )
}