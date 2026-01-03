import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function EditUser() {
    const { id } = useParams();
    const userObject = { username: "", email: "" };
    const [User, setUser] = useState(userObject);
    const navigate = useNavigate();

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${API_URL}/user/update/${id}`, User, getHeaders())
            .then((response) => {
                navigate('/');
            }) .catch((error) => {
                console.log(error);
            });
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value });
    };

    useEffect(() => {
        const getuserToEdit = async () => {
            await axios.get(`${API_URL}/user/${id}`, getHeaders())
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        };
        getuserToEdit();
    }, [id]);

  return (
    <div>
        <h2>Edit User ID: {id}</h2>
        <form onSubmit={handelSubmit}>
            <label>Username</label>
            <input type="text" value={User.username} name="username" onChange={inputHandler} />
            <br/>
            <label>Email</label>
            <input type="text" value={User.email} name="email" onChange={inputHandler} />
            <br/>
            <button type='submit'>Update</button>
        </form>
        <Link to='/'><button>Back</button></Link>
    </div>
  )
}

export default EditUser;