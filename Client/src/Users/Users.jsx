import React,{useState,useEffect} from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

function Users() {
  const [users,setUsers] = useState([])

  const fetchAPI = async () => {
      try{
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data)
      } catch(error){
        console.log("Error while fetching data ", error);
      }
  }

  useEffect(()=>{
    fetchAPI();
  },[])

  const deleteUser = async (userId) => {
    await axios.delete(`${API_URL}/user/delete/${userId}`);
    fetchAPI();
  }
  
  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <Link to='users/add'><button>add user</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <Link to={`users/edit/${u._id}`}><button>Edit</button></Link>
                  <button onClick={()=>deleteUser(u._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p>
        {users.length === 1
          ? `${users.length} utilisateur récupéré`
          : `${users.length} utilisateurs récupérés`}
      </p>
    </div>
  );
}

export default Users;