import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import './css/Todolist.css'

//axios-to handle apis
import axios from 'axios';
const Todolist = () => {
    const [todo, setTodo] = useState('')
    const [status, setStatus] = useState(false)
    const [todoArray, setTodoArray] = useState([]);
    useEffect(() => {
        getTodo()
    }, [])


    // console.log(todoArray)
    //for post operation
    const postTodo = async () => {
        try {
            if (!todo) {
                alert("Enter Something!!")
            }
            //axios.post(api,data to add in db)
            await axios.post("http://localhost:5000/csbs/addtodo", { todo });
            setTodo('')
            getTodo()
            setStatus(true)
            setTimeout(() => setStatus(false), 3000)
        } catch (err) {
            console.error(err)
        }
    }
    //for get operation
    const getTodo = async () => {
        await axios.get("http://localhost:5000/csbs/gettodo")
            .then((response) => {
                setTodoArray(response.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    //for delete operation
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/csbs/deletetodo/${id}`)
            getTodo()
        }
        catch (err) {
            console.error(err)
        }
    }
    const newTodo = (id, data) => {
    const newdata = prompt("Enter new Data:", data);

    if (newdata.trim() === '') {
        alert("Todo cannot be empty");
        return;
    }

    updateTodo(id, newdata);
};

    const updateTodo = async (id, data) => {
    try {
        await axios.put(
            `http://localhost:5000/csbs/updatetodo/${id}`,
            { todo: data }
        );
        getTodo();
    } catch (err) {
        console.error(err);
    }
};

    return (
        <div className='todocontainer'>
            <Typography variant="h1" gutterBottom>
                To Do
            </Typography>
            <div className='todo'>
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <TextField
                        fullWidth
                        label="fullWidth"
                        id="fullWidth"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </Box>

                <Button variant="contained" onClick={postTodo}>Add todo</Button>

            </div>
            {
                status && <div style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: 9999,
                }}>
                    <Alert severity="success">Todo has been added successfully</Alert>
                </div>
            }
            <div>
                <ul className='list-item'>
                    {
                        todoArray.map((r) => (
                            <li key={r._id}>{r.todo}
                                <div>
                                    <button className='delete' onClick={() => deleteTodo(r._id)}><RiDeleteBin6Line /></button>
                                    <button className='edit' onClick={()=>newTodo(r._id,r.todo)}><FaEdit /></button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todolist