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
    <div className="card card--auth">
            <h2 className="page-title">Ajouter un utilisateur</h2>
            <p className="page-subtitle">Création d'un compte utilisateur.</p>
            <form className="form" onSubmit={handelSubmit}>
                <div className="form-row">
                    <label className="label">Username</label>
                    <input className="input" type="text" name="username" onChange={inputHandler} required />
                </div>
                <div className="form-row">
                    <label className="label">Email</label>
                    <input className="input" type="email" name="email" onChange={inputHandler} required />
                </div>
                <div className="form-row">
                    <label className="label">Password</label>
                    <input className="input" type="password" name="password" onChange={inputHandler} required />
                </div>
                <div className="actions">
                    <button className="button button--primary" type='submit'>Add</button>
                    <Link to='/'><button className="button" type="button">Back</button></Link>
                </div>
            </form>
        </div>
  )
}

export default AddUser;