import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import { BASE_URL } from '@/utils/baseurl';

const ApprovalRequestForm = () => {
  const [requestType, setRequestType] = useState('');
  const [units, setUnits] = useState('');
  const [disease, setDisease] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!requestType || !units || !disease) {
      setError('All fields are required');
      return;
    }

    if (isNaN(units) || parseInt(units) <= 0) {
      setError('Units must be a positive number');
      return;
    }

    const payload = {
      requestType,
      units: parseInt(units),
      disease
    };

    try {
      const response = await fetch(`${BASE_URL}/api/approvalRequest/createRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${localStorage.getItem('token')}`,
        'ngrok-skip-browser-warning':'true'
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setRequestType('');
        setUnits('');
        setDisease('');
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.log(error.message);
      setError('Failed to submit request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto flex flex-col">
      <FormControl fullWidth className="mb-4">
        <InputLabel id="request-type-label">Request Type</InputLabel>
        <Select
          labelId="request-type-label"
          value={requestType}
          label="Request Type"
          onChange={(e) => setRequestType(e.target.value)}
          required
          className="w-full"
        >
          <MenuItem value="donations">Donate Blood</MenuItem>
          <MenuItem value="blood_requests">Request Blood</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Units"
        type="number"
        value={units}
        onChange={(e) => setUnits(e.target.value)}
        required
        inputProps={{ min: 1 }}
        className="mb-4"
      />

      <TextField
        fullWidth
        label="Disease"
        value={disease}
        onChange={(e) =>{
          setDisease(e.target.value.replace(/[^a-zA-Z ]/g, ""))}}
        required
        className="mb-4"
      />

      <Button 
        type="submit" 
       variant='outlined'
        color="error"
      >
        Submit Request
      </Button>

      {error && (
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="mt-4">
          Request submitted successfully!
        </Alert>
      )}
    </form>
  );
};

export default ApprovalRequestForm;