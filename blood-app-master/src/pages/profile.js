import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { TextField, Button, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email,
    first_name: user?.first_name,
    last_name: user?.last_name,
    dob: dayjs(new Date(user?.dob)).format('YYYY-MM-DD'),
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(()=>{
    console.log(user)
    setFormData({
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      dob: dayjs(new Date(user?.dob)).format('YYYY-MM-DD'),
    })
  },[user])
  const handleChange = (e) => {
    let fValue=e.target.value;
    if(e.target.name=='first_name'||e.target.name=='last_name'){
      fValue=fValue.replace(/[^a-zA-Z ]/g, "");
    }
    setFormData({ ...formData, [e.target.name]: fValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let {email,...payload}=formData
    try {
      updateUser(payload).then(()=>{

        setSuccess('Profile updated successfully');
      })
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (!user) {
    return (

        <p>Please login to view your profile.</p>
    );
  }

  return (
    <div className='flex flex-col items-center pt-5'>
      <h1 className="text-3xl font-bold mb-4 text-red-500">Profile</h1>
     {formData && <form onSubmit={handleSubmit} className="space-y-4 min-w-64 flex flex-col ">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <div>

        <span>
          Email
        </span>
        <TextField
          // label="Email"
          type="email"
          name="email"
          value={formData ? formData?.email:''}
          disabled
          fullWidth
          required
          />
          </div>
         {/* <TextField
        label="Phone Number"
        // type="number"
        name="phone_number"
        value={formData?.phone_number}
        onChange={handleChange}
        fullWidth
        required
      /> */}
      <div>

       <span>
        First Name
       </span>
        <TextField
          // label="First Name"
          type="text"
          name="first_name"
          value={formData?.first_name}
          onChange={handleChange}
          fullWidth
          required
          //allow only text input
          
          
        />
          </div>
          <div>

        <span>
          Last Name
        </span>
         <TextField
          // label="Last Name"
          type="text"
          name="last_name"
          value={formData?.last_name}
          onChange={handleChange}
          fullWidth
          required
          />
          </div>
          <div className='flex flex-col'>

        <span>
          Date of Birth
        </span>
        <DatePicker
          //  label="Date of Birth"
           className="bg-white"
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
            </div>
      
     
        <Button type="submit" variant="outlined" color="error">
          Update Profile
        </Button>
      </form>}
    </div>
  );
}