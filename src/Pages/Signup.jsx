import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

const Signup = ({ onSignup, onGoLogin }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError('Please fill in all fields.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        const normalizedEmail = email.trim().toLowerCase()
        const users = JSON.parse(localStorage.getItem('todo-users') || '[]')
        const existingUser = users.find((item) => item.email === normalizedEmail)

        if (existingUser) {
            setError('An account already exists with this email.')
            return
        }

        const newUser = {
            name: name.trim(),
            email: normalizedEmail,
            password,
        }

        users.push(newUser)
        localStorage.setItem('todo-users', JSON.stringify(users))
        setError('')
        onSignup(newUser)
    }

    return (
        <div className="auth-container">
            <Box className="auth-box" component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Create an account to save and manage your todos.
                </Typography>

                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Create Account
                </Button>

                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                    Already have an account?{' '}
                    <span className="auth-link" onClick={onGoLogin}>
                        Login
                    </span>
                </Typography>
            </Box>
        </div>
    )
}

export default Signup
