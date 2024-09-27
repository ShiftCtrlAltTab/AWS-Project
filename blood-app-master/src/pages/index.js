import { useAuth } from "@/contexts/AuthContext";
import { BASE_URL } from "@/utils/baseurl";
import { Bloodtype, HistoryOutlined, RecentActors, RecentActorsOutlined } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home() {
  const [dashboardData,setDashboardData]=useState(1000);
  const [bloodData,setBloodData]=useState([])
   const {user}=useAuth()
  const router=useRouter()
  const fetchDashboardData=()=>{


const requestOptions = {
  method: "GET",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "true"
  },
  redirect: "follow"
};

fetch(`${BASE_URL}/api/dashboard/getDashboardInfo`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if(result.status === 200) {

      setDashboardData(result.data)
    }
    console.log(result)
  })
  .catch((error) => console.error(error));
  }
  const camelToNormalCase = str => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim()
  }
  const getBloodOptions=()=>{
    fetch(`${BASE_URL}/api/bloodSample/getAllBloodSamples`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning':'true'
      }
    }).then(response=>response.json())
    .then(res=>{
      setBloodData(
        res.bloodSamples
      )
    })
}

useEffect(()=>{
  fetchDashboardData();
  getBloodOptions();
  if(!user){
    router.push('/login')
  }

},[user])


//approvalRequest/getRequestsByUser

return (
    <div>

    {user?.userType=='admin' &&<div className="flex flex-wrap gap-5 p-10"
      >
        {/* loop over keys of dashboardData */}
        {Object.keys(dashboardData).map((key) => (
          <div key={key} className="shadow p-4 w-44">
            <h3 className="">{camelToNormalCase(key)}</h3>
            <p>{dashboardData[key]}</p>
            </div>))
      }
    
    </div>
 }


  <div className="flex flex-wrap gap-5 p-10 ">
        {
          bloodData?.map((eachBlood,i)=>{
            return <div className="shadow p-4 w-44" key={i}>
              <div className="flex justify-between py-3">
              <span className="text-3xl text-green-500">{eachBlood.units}<span className="text-sm text-gray-500">{` units`}</span></span>
              
                <Bloodtype className="text-4xl text-red-500"/>
              </div>
              <Divider/>
              <p className="pt-2 font-semibold text-red-500">{eachBlood.blood_type}</p>
              </div>
          })
        }
      </div>
     
      </div>
  );
}
