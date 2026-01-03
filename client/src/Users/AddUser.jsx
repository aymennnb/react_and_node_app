import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function AddUser() {
    const userObject = { username: "", email: "", password: "" };
    const [User, setUser] = useState(userObject);
    const navigate = useNavigate();

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const handelSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${API_URL}/register`, User, getHeaders())
            .then((response) => {
                navigate('/');
            }) .catch((error) => {
                console.log(error);
                alert("Erreur lors de l'ajout");
            });
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value });
    };

  return (
    <div>
        <h2>Add new User (Admin)</h2>
        <form onSubmit={handelSubmit}>
            <label>Username</label>
            <input type="text" name="username" onChange={inputHandler} required />
            <br/>
            <label>Email</label>
            <input type="email" name="email" onChange={inputHandler} required />
            <br/>
            <label>Password</label>
            <input type="password" name="password" onChange={inputHandler} required />
            <br/>
            <button type='submit'>Add</button>
        </form>
        <Link to='/'><button>Back</button></Link>
    </div>
  )
}

export default AddUser;