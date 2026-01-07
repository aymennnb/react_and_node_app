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
        <div className="card card--auth">
                    <h2 className="page-title">Inscription</h2>
                    <p className="page-subtitle">Crée un compte pour te connecter.</p>
                    <form className="form" onSubmit={handleRegister}>
                        <div className="form-row">
                            <label className="label">Nom d'utilisateur</label>
                            <input className="input" type="text" name="username" onChange={inputHandler} required />
                        </div>
                        <div className="form-row">
                            <label className="label">Email</label>
                            <input className="input" type="email" name="email" onChange={inputHandler} required />
                        </div>
                        <div className="form-row">
                            <label className="label">Mot de passe</label>
                            <input className="input" type="password" name="password" onChange={inputHandler} required />
                        </div>
                        <div className="actions">
                            <button className="button button--primary" type="submit">S'inscrire</button>
                            <Link to="/login" className="label">Retour Login</Link>
                        </div>
                    </form>
        </div>
    );
}

export default Register;