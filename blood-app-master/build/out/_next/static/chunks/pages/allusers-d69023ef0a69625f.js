(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[947],{2004:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/allusers",function(){return t(7464)}])},7464:function(e,a,t){"use strict";t.r(a);var r=t(5893),s=t(7294),i=t(1441),n=t(7593);a.default=()=>{let[e,a]=(0,s.useState)([]);(0,s.useEffect)(()=>{t()},[]);let t=async()=>{fetch("".concat(n._,"/api/users/getAllUsers"),{method:"GET",headers:{Authorization:"Bearer ".concat(localStorage.getItem("token")),"ngrok-skip-browser-warning":"true"}}).then(e=>e.json()).then(e=>{a(e.users)}).catch(e=>console.error("Error:",e))};return(0,r.jsx)("div",{className:" w-full p-5",children:(0,r.jsx)(i._,{rows:e,columns:[{field:"first_name",headerName:"First Name",width:130},{field:"last_name",headerName:"Last Name",width:180},{field:"email",headerName:"Email",width:150},{field:"userType",headerName:"Type",width:100},{field:"blood_sample_id",headerName:"Blood sample id",width:150}],pageSize:5,rowsPerPageOptions:[5],getRowId:e=>e.id,className:"bg-white shadow-md rounded-lg"})})}}},function(e){e.O(0,[650,374,441,888,774,179],function(){return e(e.s=2004)}),_N_E=e.O()}]);