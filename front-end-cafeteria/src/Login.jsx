import { useState } from 'react'
import coffeeIcon from './assets/fondo.jpg'
import jwtDecode from 'jwt-decode'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandle = (e) => {
    e.preventDefault()
    // login and get an user with JWT token
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((tokenData) => {


         if (tokenData.access === undefined) {

          toast.error(tokenData.message);
         }
        

        window.localStorage.setItem('accessToken', JSON.stringify(tokenData.access))
        
        console.log("ENTREE",tokenData);
        console.log(jwtDecode(tokenData.access).user_id);
        onLogin(jwtDecode(tokenData.access).user_id)
      })
  }

  return (

    
    
    <form onSubmit={loginHandle}>
      <img src={coffeeIcon} alt="Coffee Icon" style={{height: "280px",width: "500px"}}/>
      <h2>Coffee Time</h2>
      <p>Please login to your account</p>
      
      <input

        style={{height: "50px",width: "400px"}}
        aria-label="Username"
        placeholder="Username"
        id="username"
        type="text"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <input
      style={{height: "50px",width: "400px"}}
        aria-label="Password"
        placeholder="Password"
        id="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <button type="submit">Login</button>

      <ToastContainer/> 
    </form>
  )
}

export default Login
