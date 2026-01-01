import React,{ useState,useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';

function EditUser() {
    const {id} = useParams();
    const userObject = { username : "", email : ""}
    const [User,setUser] = useState(userObject);

    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${API_URL}/user/update/${id}`, User)
            .then((response)=>{
                console.log("User updated successfuly.")
                navigate('/')
            }) .catch((error)=>{
                console.log(error)
            })
    }

    const inputHandler = (e) => {
        const {name,value} = e.target;
        setUser({...User,[name]:value});
    };

    useEffect(() => {
    const getuserToEdit = async () => {
        await axios.get(`${API_URL}/user/${id}`)
        .then((response)=>{
            setUser(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    getuserToEdit();
    }, [id]);

  return (
    <div>
        <h2>Edit User with the id : {id}</h2>
        <form onSubmit={handelSubmit}>
            <label>username</label>
            <input type="text" value={User.username} name="username" onChange={inputHandler}/>
            <label>email</label>
            <input type="text" value={User.email} name="email" onChange={inputHandler}/>
            <button type='submit'>Update</button>
        </form>
        <Link to='/'><button>back</button></Link>
    </div>
  )
}

export default EditUser;