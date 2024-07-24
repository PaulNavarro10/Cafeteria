import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Home from './Home'
import jwtDecode from 'jwt-decode'


function App() {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    if (token){
      try {
        const decodedToken = jwtDecode(JSON.parse(token))
        setUserId(decodedToken.user_id)
      } catch (error) {
        console.log('Error decoding token:', error)
      }
    }
  }, [])

  const onLoginHandler = (userId) => {
    console.log(userId)
    setUserId(userId)
  }

  const onLogoutHandler = () => {
    setUserId(null)
    window.localStorage.removeItem('accessToken')
  }

  return (
    <>
      {userId ? (
        <Home onLogout={onLogoutHandler} userId={userId} />
      ) : (
        <Login onLogin={onLoginHandler} />
      )}
    </>
  )
}

export default App
