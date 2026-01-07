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
    <div className="card card--auth">
            <h2 className="page-title">Modifier l'utilisateur</h2>
            <p className="page-subtitle">ID: <span className="mono">{id}</span></p>
            <form className="form" onSubmit={handelSubmit}>
                <div className="form-row">
                    <label className="label">Username</label>
                    <input className="input" type="text" value={User.username} name="username" onChange={inputHandler} />
                </div>
                <div className="form-row">
                    <label className="label">Email</label>
                    <input className="input" type="text" value={User.email} name="email" onChange={inputHandler} />
                </div>
                <div className="actions">
                    <button className="button button--primary" type='submit'>Update</button>
                    <Link to='/'><button className="button" type="button">Back</button></Link>
                </div>
            </form>
    </div>
  )
}

export default EditUser;