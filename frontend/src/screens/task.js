import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {detailsProduct, createProduct, deleteProduct, updateProduct} from '../actions/productActions';
import {useHistory } from 'react-router-dom';
export default function Task() {
    let initializeTodo = {
        name: "", 
        todoId: ""
    }
    const userSignin = useSelector(state => state.userSignin);
    const taskCreated = useSelector(state => state.productCreateReducer);
    const taskDeleted = useSelector(state => state.productDeleteReducer);
    const taskUpdated = useSelector(state => state.productUpdateReducer);
    const dispatch = useDispatch();
    const [todo, settodo] = useState(initializeTodo);
    const history = useHistory();
    useEffect(()=>{
        if(!userSignin.userInfo){
            history.push('/signin');
        }
        dispatch(detailsProduct());
    }, [taskCreated, taskDeleted, taskUpdated])
    const tasks = useSelector(state=>state.productDetailsReducer.tasks);
    const submitHandler = ()=> {
        console.log(todo);
        if(todo.todoId){
            dispatch(updateProduct({taskId: todo.todoId, name: todo.name}))
        } else {
            const doc = {
                taskName:todo.name,
                user: userSignin.userInfo._id
            }
            dispatch(createProduct(doc))
        }
        initializeTodo.name = "";
        initializeTodo.todoId = "";
        settodo(initializeTodo);
    }
    const editHandler = (task)=> {
        initializeTodo.name = task.taskName;
        initializeTodo.todoId = task._id
        settodo(initializeTodo);
    }
    const deleteHandler = (id)=> {
        dispatch(deleteProduct(id))
    }
    return (
        <div>
            <h1 style={{textAlign:'center'}}>ToDo List</h1>
            {userSignin ? (
                <>
                <div>
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <div >
                    <input
                    type="text"
                    value={todo.name}
                    placeholder="Add To Do"
                    onChange={(e)=>settodo(todo=>({...todo, name: e.target.value}))}
                    />
                    </div>
                    <div>
                    <button style={{color: 'white'}}className="primary" onClick={submitHandler}>Submit</button>
                    </div>
                </div>
                <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TODO NAME</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead> 
                <tbody>
                    {tasks ? tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task._id}</td>
                            <td>{task.taskName}</td>
                            <td>{task.createdAt.substring(0, 10)}</td>
                            <td>
                                <button className="primary" onClick={()=>editHandler(task)}>Edit</button>
                                <button className="danger-btn" onClick={()=>deleteHandler(task._id)}>Delete</button>
                            </td>
                        </tr>
                    )) : null}
                </tbody>
            </table> 
                </div>
                </>
            ) : (<h1 className="App">Login to view ToDo's</h1>)}
           
        </div>
    )
}
