import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { BASE_URL } from '@/utils/baseurl';
import dayjs from 'dayjs';

function Ledger() {
        const [data,setData]=useState([])
    useEffect(()=>{
      fetchAllData();
    },[])
    const fetchAllData = async () => {
      // Here you would typically make an API call to fetch all pending requests
      // and set the data to the state
      fetch(`${BASE_URL}/api/approvalRequest/getAllrequests?approval_request_status=approved,rejected`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` ,
        'ngrok-skip-browser-warning':'true'  
        }
      })
      .then(response => response.json())
      .then(data => {
        setData(data.usersWithAge)
      })
      .catch(error => console.error('Error:', error));
    };

  
    const columns = [
      { field: 'requestId', headerName: 'Request ID', width: 130 },
      { field: 'userName', headerName: 'User Name', width: 180 },
      { field: 'requestType', headerName: 'Request Type', width: 150 },
      { field: 'units', headerName: 'Units', width: 100 },
      { field: 'disease', headerName: 'Disease', width: 150 },
      { field: 'date', headerName: 'Date', width: 200, 
        renderCell: (params) => dayjs(params.row.date).format('YYYY-MM-DD'),
    },
        { field: 'approval_request_status', headerName: 'Status', width: 130,
          renderCell:(params)=>(
            params?.row.approval_request_status=='pending'?
            'Pending':params?.row.approval_request_status=='approved'?<span className='text-green-500'>{`Approved`}</span>:<span className='text-red-500'>{`Rejected`}</span>
          )
    
         }
     
    ];
  return (
    <div className=" w-full p-5">
    <DataGrid
      rows={data}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      getRowId={(row) => row.requestId}
      className="bg-white shadow-md rounded-lg"
    />

  </div>
  )
}

export default Ledger