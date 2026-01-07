import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });

            localStorage.setItem("token", response.data.token);

            console.log("Login success");
            navigate('/');
        } catch (error) {
            console.log("Erreur de login", error);
            alert("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="card card--auth">
                    <h2 className="page-title">Connexion</h2>
                    <p className="page-subtitle">Connecte-toi pour accéder à l'application.</p>
                    <form className="form" onSubmit={handleLogin}>
                        <div className="form-row">
                            <label className="label">Email</label>
                            <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-row">
                            <label className="label">Mot de passe</label>
                            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="actions">
                            <button className="button button--primary" type="submit">Se connecter</button>
                            <span className="label">Pas encore de compte ? <Link to="/register">S'inscrire</Link></span>
                        </div>
                    </form>
        </div>
    );
}

export default Login;