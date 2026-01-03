import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/register`, user);
            alert("Inscription réussie !");
            navigate('/login');
        } catch (error) {
            console.log("Erreur register", error);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleRegister}>
                <label>Nom d'utilisateur: </label>
                <input type="text" name="username" onChange={inputHandler} required />
                <br/>
                <label>Email: </label>
                <input type="email" name="email" onChange={inputHandler} required />
                <br/>
                <label>Mot de passe: </label>
                <input type="password" name="password" onChange={inputHandler} required />
                <br/>
                <button type="submit">S'inscrire</button>
            </form>
            <Link to="/login"><button>Retour Login</button></Link>
        </div>
    );
}

export default Register;