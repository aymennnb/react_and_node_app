import axios from 'axios';
import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const userObject = { username : "", email : ""}
    const [User,setUser] = useState(userObject);

    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${API_URL}/user`,User)
            .then((response)=>{
                navigate('/')
            }) .catch((error)=>{
                console.log(error)
            })
    }

    const inputHandler = (e) => {
        const {name,value} = e.target;
        setUser({...User,[name]:value});
    };

  return (
    <div>
        <h2>Add new User</h2>
        <form onSubmit={handelSubmit}>
            <label>username</label>
            <input type="text" name="username" onChange={inputHandler}/>
            <label>email</label>
            <input type="text" name="email" onChange={inputHandler}/>
            <button type='submit'>Add</button>
        </form>
        <Link to='/'><button>back</button></Link>
    </div>
  )
}

export default AddUser;