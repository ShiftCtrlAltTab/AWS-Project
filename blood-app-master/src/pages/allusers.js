import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { BASE_URL } from '@/utils/baseurl';

const ApprovingBloodRequest = () => {
   const [data,setData]=useState([])
  useEffect(()=>{
    fetchAllUsers();
  },[])
  const fetchAllUsers = async () => {
    fetch(`${BASE_URL}/api/users/getAllUsers`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'ngrok-skip-browser-warning':'true' 
      }
    })
    .then(response => response.json())
    .then(data => {
      setData(data.users)
    })
    .catch(error => console.error('Error:', error));
  };

  const columns = [
    { field: 'first_name', headerName: 'First Name', width: 130 },
    { field: 'last_name', headerName: 'Last Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'userType', headerName: 'Type', width: 100 },
    { field: 'blood_sample_id', headerName: 'Blood sample id', width: 150 },

  ];

  return (
    <div className=" w-full p-5">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
        className="bg-white shadow-md rounded-lg"
      />

    </div>
  );
};

export default ApprovingBloodRequest;