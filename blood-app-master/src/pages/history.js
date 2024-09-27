import { useAuth } from '@/contexts/AuthContext'
import { BASE_URL } from '@/utils/baseurl'
import { HistoryOutlined } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

function History() {
    const [requestingHistoryData,setRequestingHistoryData]=useState()
    const [donorHistoryData,setDonorHistoryData]=useState()
    const {user}=useAuth()
    const getUserHistoryBlood=()=>{
        fetch(`${BASE_URL}/api/approvalRequest/getRequestsByUser/blood_requests`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning':'true'
          }
        }).then(response=>response.json())
        .then(res=>{
          console.log(res)
          setRequestingHistoryData(res.requests)
        })
      } 
      const getUserHistoryDonate=()=>{
        fetch(`${BASE_URL}/api/approvalRequest/getRequestsByUser/donations`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning':'true'
          }
        }).then(response=>response.json())
        .then(res=>{
          console.log(res)
          setDonorHistoryData(res.requests)
        })
      } 
    useEffect(()=>{
        if(user?.userType=='user'){

            getUserHistoryBlood();
            getUserHistoryDonate();
          }
    },[user])
  return (
    <div>
         {user?.userType=='user' &&
      
      <div className="p-10 flex flex-col gap-5">
          <h2 className="font-semibold text-xl flex gap-2 items-center"><span>
          Recent Requests 
            </span>
            <HistoryOutlined/>
            </h2>
          <div>
            <p className="text-red-500 text-xl">Blood Requests</p>
              <DataGrid
                rows={requestingHistoryData}
                columns={[
                  { field: 'bloodGroup', headerName: 'Blood Group', width: 150 },
                  { field: 'dob', headerName: 'Date of Birth', width: 150 },
                  { field: 'disease', headerName: 'Disease', width: 150 },
                  { field: 'approval_request_status', headerName: 'Status', width: 150 },
                  //date
                  {
                    field: 'date',
                    headerName: 'Date',
                    width: 150,
                    renderCell: (params) => dayjs(params.row.date).format('YYYY-MM-DD'),
                  }
                ]}
                getRowId={(row)=>row.requestId}
              />
            </div>
            <div>
            <p className="text-red-500 text-xl"> Donations Requests</p>
              <DataGrid
                rows={donorHistoryData}
                columns={[
                  { field: 'bloodGroup', headerName: 'Blood Group', width: 150 },
                  { field: 'dob', headerName: 'Date of Birth', width: 150 },
                  { field: 'disease', headerName: 'Disease', width: 150 },
                  { field: 'approval_request_status', headerName: 'Status', width: 150 },
                  //date
                  {
                    field: 'date',
                    headerName: 'Date',
                    width: 150,
                    renderCell: (params) => dayjs(params.row.date).format('YYYY-MM-DD'),
                  }
                ]}
                getRowId={(row)=>row.requestId}
              />
            </div>
        </div>
      }
    </div>
  )
}

export default History