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
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <label>Email: </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br/>
                <label>Mot de passe: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br/>
                <button type="submit">Se connecter</button>
            </form>
            <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
    );
}

export default Login;