import React from 'react'
import ApprovalRequestForm from '../components/ApprovalRequestForm'
function RequestForm() {
  return (
    <div className='pt-5'>
      <div className='flex justify-center'>
        <h2 className='text-xl font-bold text-red-500'>Request Form</h2>
      </div>
      <ApprovalRequestForm/>
    </div>
  )
}

export default RequestForm