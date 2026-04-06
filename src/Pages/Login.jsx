import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

const Login = ({ onLogin, onGoSignup }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const users = JSON.parse(localStorage.getItem('todo-users') || '[]')
        const user = users.find((item) => item.email === email.trim().toLowerCase())

        if (!user) {
            setError('No account found for this email. Please sign up first.')
            return
        }

        if (user.password !== password) {
            setError('Invalid password. Please try again.')
            return
        }

        setError('')
        onLogin(user)
    }

    return (
        <div className="auth-container">
            <Box className="auth-box" component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Enter your registered email and password to continue.
                </Typography>

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                    Login
                </Button>

                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                    Don't have an account?{' '}
                    <span className="auth-link" onClick={onGoSignup}>
                        Sign up
                    </span>
                </Typography>
            </Box>
        </div>
    )
}

export default Login
