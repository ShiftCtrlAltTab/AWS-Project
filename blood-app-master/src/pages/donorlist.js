import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { BASE_URL } from '@/utils/baseurl';
import dayjs from 'dayjs';
import { useLoader } from '@/contexts/LoaderContext';

const ApprovingDonations = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [data,setData]=useState([]);
  const {hideLoader,showLoader}=useLoader()
  useEffect(()=>{
    fetchAllPendingList();
  },[])
  const fetchAllPendingList = async () => {
    // Here you would typically make an API call to fetch all pending requests
    // and set the data to the state
    fetch(`${BASE_URL}/api/approvalRequest/getAllrequests?requestType=donations`,{
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
  const handleAction = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setOpenDialog(true);
  };


  const confirmAction = () => {

      console.log(`${actionType} request ${selectedRequest.requestId}`);
    setOpenDialog(false);
    showLoader()
    fetch(`${BASE_URL}/api/approvalRequest/reviewRequest`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your actual token
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning':'true'
      },
      body: JSON.stringify({
        requestId: selectedRequest.requestId,
        approval_request_status: actionType
      })
    })
   .then(response => response.json())
   .then(res=>{
     fetchAllPendingList();
     hideLoader()
   })
  };

  const columns = [
    { field: 'requestId', headerName: 'Request ID', width: 130 },
    { field: 'userName', headerName: 'User Name', width: 180 },
    { field: 'bloodGroup', headerName: 'Blood Group', width: 150 },
    { field: 'units', headerName: 'Units', width: 100 },
    { field: 'disease', headerName: 'Disease', width: 150 },
    { field: 'date', headerName: 'Date', width: 200, 
      renderCell: (params) => dayjs(params.row.date).format('YYYY-MM-DD'),},
      { field: 'approval_request_status', headerName: 'Status', width: 130,
        renderCell:(params)=>(
          params?.row.approval_request_status=='pending'?
          'Pending':params?.row.approval_request_status=='approved'?<span className='text-green-500'>{`Approved`}</span>:<span className='text-red-500'>{`Rejected`}</span>
        )
  
       },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
          
            params?.row.approval_request_status=='pending'?
          
            <div className="space-x-2">
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => handleAction(params.row, 'approved')}
            >
              Approve
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              size="small"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => handleAction(params.row, 'rejected')}
            >
              Reject
            </Button>
          </div>:null
        ),
      },
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{actionType === 'approve' ? 'Approve Request' : 'Reject Request'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType} the request from {selectedRequest?.userName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAction} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApprovingDonations;