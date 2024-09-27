 import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const  router  = useRouter();
  const {user} = useAuth()
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token && user){
      //redirect to home page
      router.push('/');
    }
  },[user])
  return (
       <LoginForm />
  );
}