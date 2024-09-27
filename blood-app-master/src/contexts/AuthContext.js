import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/baseurl';
import { useRouter } from 'next/router';
import { useLoader } from './LoaderContext';
import { ROUTES } from '@/utils/constants';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const {showLoader,hideLoader}=useLoader();
   const [error, setError] = useState(null);
const router = useRouter();
  useEffect(() => {

     const token = localStorage.getItem('token');
    if (token) {
        console.log('Token', token)
      axios.get(`${BASE_URL}${ROUTES?.GET_USER_INFO}`, {
        headers: { Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning':'true' }
      }).then(response => {
        console.log(response)
         setUser(response.data.user);
       
      }).catch((error) => {
        console.error('Error fetching user info:', error)
        if(error.status ===401){
          router.push('/login')
      }
      });
    }
  }, []);

  const login = async (email, password) => {
    showLoader()
    try {
        let data = JSON.stringify({
          "email": email,
          "password": password
        });
        
        const response = await axios.post(`${BASE_URL}${ROUTES.LOGIN}`, 
          data,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .catch((error) => {
          console.log(error);
          hideLoader()
          setError(error.message)
        });
        if(response.status === 200){
          localStorage.setItem('token', response.data.token);
          setUser(response.data.user);
          setError(null);
          router.push('/');
          hideLoader()
        }
        
        else{
          setError(response.message)
        }
      
        
    } catch (error) {
      throw error;
    }
    finally{
      hideLoader()
    }
  };

  const logout = () => {
    showLoader()
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
    hideLoader()
  };

  const register = async (userData) => {
    showLoader()
    try {
      const response = await axios.post(`${BASE_URL}${ROUTES.CREATE_USER}`, userData);
  
    router.push('/login')
      return response.data.user;
    } catch (error) {
      throw error;
    } finally{
      hideLoader()
    }
  };

  const updateUser = async (userData) => {
    showLoader()
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}${ROUTES.UPDATE_USER}`, userData, {
        headers: { Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning':'true'
       }
      });
      console.log(response)
      setUser(response.data.updatedUser);
      
      return response.data.updatedUser;
    } catch (error) {
      throw error;
    }finally{
      hideLoader()
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    error,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
