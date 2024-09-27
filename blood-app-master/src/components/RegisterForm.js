import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TextField, Button, Alert, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { BASE_URL } from '@/utils/baseurl';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';
import axios from 'axios';
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    // .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // must contain at least one character
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
    
  // phone_number: Yup.string()
  //   .matches(/^\d{10}$/, 'Phone number must be 10 digits')
  //   .required('Phone number is required'),

});

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    // phone_number: '',
    dob:dayjs(new Date()).format('YYYY-MM-DD'),
    blood_group: '',

  });
  const router =useRouter()
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  // const { register } = useAuth();
  const [bloodOptions,setBloodOptions]=useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    let fValue=e.target.value;
    if(e.target.name=='first_name'||e.target.name=='last_name'){
      fValue=fValue.replace(/[^a-zA-Z ]/g, "");
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: fValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };
  const register = async (userData) => {

    try {
      const response = await axios.post(`${BASE_URL}${ROUTES.CREATE_USER}`, userData);
      if(response.status === 201){
        setSubmitSuccess(
          'Registration successful. You can now log in.'
        )
      //   setTimeout(()=>{
      //     router.push('/login')
      // },200)
      }

      return response.data.user;
    } catch (error) {
      throw error;
    } finally{
      // hideLoader()
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      register(formData);
      setFormData({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
    //  phone_number: '',
     dob: dayjs(new Date()).format('YYYY-MM-DD'),
     blood_group: '',

      });
      setErrors({});
    } catch (err) {
      setSubmitError('Failed to register',err);
    }
  };
  useEffect(()=>{
    getBloodOptions()
},[])
  const getBloodOptions = async()=>{
    const response = await fetch(`${BASE_URL}/api/bloodSample/getBloodSamples`,{
      method: 'GET',
      headers: {
               'Content-Type': 'application/json',
               'ngrok-skip-browser-warning':'true'
      }
    });
    const bloodGroups = await response.json();
    setBloodOptions(bloodGroups?.bloodSampleNames);
    setFormData({
      ...formData,
      blood_group: bloodGroups?.bloodSampleNames[0] || ''
    })
  }
  return (
    <div className='p-5  flex flex-col'
      style={{
        backgroundImage: `url(${'https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '2rem',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
   
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 justify-center items-center mt-10 bg-white p-10 rounded-lg shadow-lg md:w-[600px]">
      <h1 className="text-3xl font-bold m-2 text-red-500">Registration</h1>
        {submitError && <Alert severity="error" className="col-span-2">{submitError}</Alert>}
        <TextField
          label="Email"
          type="email"
          name="email"
          
          value={formData.email}
          onChange={handleChange}
          fullWidth
          className="col-span-2"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          error={!!errors.first_name}
          helperText={errors.first_name}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          error={!!errors.last_name}
          helperText={errors.last_name}
        />
        
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
        />
         <DatePicker
          label="Date of Birth"
          // className="bg-white"
          format="MMMM DD,YYYY"
          // onChange={handleOTFormChange}
          name="dob"
          value={
            formData?.dob
              ? dayjs(formData?.dob)
              : dayjs()
          }
          onChange={date =>
            setFormData({
              ...formData,
              dob: date.format('YYYY-MM-DD'),
            })
          }
        />
        <FormControl>
        <InputLabel id="blood-group">Blood Group</InputLabel>
          <Select
            // className="min-w-[200px] md:min-w-[350px] h-[50px]"
            labelId="blood-group"
            label="Blood Group"
            name='blood_group'
            value={formData?.blood_group}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          {/* {bloodOptions} */}
          {
            bloodOptions?.map(option => (
              <MenuItem value={option} key={option}>{option}</MenuItem>
            ))
          }
          </Select>
        </FormControl>

        <Button type="submit" variant="outlined" fullWidth className="col-span-2"
        color='error'
        >
          Register
        </Button>
        {submitSuccess && <Alert severity="success" className="col-span-2">{submitSuccess}</Alert>}
      </form>
 
   
    </div>
  );
}