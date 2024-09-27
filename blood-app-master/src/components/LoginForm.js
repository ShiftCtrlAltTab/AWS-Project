import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Alert } from '@mui/material';
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login,error,setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Failed to log in');
    }
  };

  return (
    <div
    style={{
      // `url(${'https://images.pexels.com/photos/5340269/pexels-photo-5340269.jpeg'})`
      backgroundImage: `url(${'https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
 }}
    >

    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-lg min-w-[500px]">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Login</h1>
   
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="outlined" color='error'  fullWidth>
        Login
      </Button>
    </form>
    </div>
  );
}