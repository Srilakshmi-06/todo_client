import React, { useEffect, useState } from 'react'
import Todolist from './Pages/Todolist'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const App = () => {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('todo-current-user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('todo-current-user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('todo-current-user')
  }

  return (
    <div>
      {user ? (
        <div>
          <div className="auth-nav">
            <span>Welcome, {user.name}!</span>
            <button className="logout-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Todolist />
        </div>
      ) : page === 'login' ? (
        <Login onLogin={handleLogin} onGoSignup={() => setPage('signup')} />
      ) : (
        <Signup onSignup={handleLogin} onGoLogin={() => setPage('login')} />
      )}
    </div>
  )
}

export default App