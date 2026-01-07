import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchAPI = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const response = await axios.get(`${API_URL}/users`, getHeaders());
        setUsers(response.data);
      } catch(error) {
        console.log("Error while fetching data ", error);
        if(error.response && error.response.status === 403) {
            navigate('/login');
        }
      }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const deleteUser = async (userId) => {
    if(window.confirm(`Supprimer cet utilisateur avec l'id : ${userId} ?`)) {
        await axios.delete(`${API_URL}/user/delete/${userId}`, getHeaders());
        fetchAPI();
    }
  };

  const logout = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };

  return (
    <div>
          <h2 className="page-title">Liste des utilisateurs</h2>
          <p className="page-subtitle">Gestion des comptes (ajout, modification, suppression).</p>

          <div className="actions">
            <button className="button" onClick={logout}>Se Déconnecter</button>
            <Link to='/users/add'><button className="button button--primary">Ajouter un utilisateur</button></Link>
          </div><br/>

          <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td className="mono">{u._id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/users/edit/${u._id}`}><button className="button">Edit</button></Link>
                        <button className="button button--danger" onClick={() => deleteUser(u._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="empty">Aucun utilisateur ou chargement...</td></tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
  );
}

export default Users;