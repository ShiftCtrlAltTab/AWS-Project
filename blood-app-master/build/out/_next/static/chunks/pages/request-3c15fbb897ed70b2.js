(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[800],{2453:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/request",function(){return r(3050)}])},1093:function(e,t,r){"use strict";r.d(t,{Z:function(){return z}});var l=r(7294),a=r(512),o=r(4780),n=r(8655),s=r(9262),i=r(6372),c=r(3013),u=r(8840),d=r(5228),p=r(4477),m=r(440),h=r(1588),f=r(4867);function v(e){return(0,f.ZP)("MuiAlert",e)}let g=(0,h.Z)("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var x=r(3367),Z=r(7680),j=r(5893),y=(0,Z.Z)((0,j.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),b=(0,Z.Z)((0,j.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),S=(0,Z.Z)((0,j.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),A=(0,Z.Z)((0,j.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),C=r(7178);let N=e=>{let{variant:t,color:r,severity:l,classes:a}=e,n={root:["root","color".concat((0,d.Z)(r||l)),"".concat(t).concat((0,d.Z)(r||l)),"".concat(t)],icon:["icon"],message:["message"],action:["action"]};return(0,o.Z)(n,v,a)},w=(0,s.ZP)(m.Z,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],t["".concat(r.variant).concat((0,d.Z)(r.color||r.severity))]]}})((0,i.Z)(e=>{let{theme:t}=e,r="light"===t.palette.mode?n._j:n.$n,l="light"===t.palette.mode?n.$n:n._j;return{...t.typography.body2,backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(t.palette).filter((0,p.Z)(["light"])).map(e=>{let[a]=e;return{props:{colorSeverity:a,variant:"standard"},style:{color:t.vars?t.vars.palette.Alert["".concat(a,"Color")]:r(t.palette[a].light,.6),backgroundColor:t.vars?t.vars.palette.Alert["".concat(a,"StandardBg")]:l(t.palette[a].light,.9),["& .".concat(g.icon)]:t.vars?{color:t.vars.palette.Alert["".concat(a,"IconColor")]}:{color:t.palette[a].main}}}}),...Object.entries(t.palette).filter((0,p.Z)(["light"])).map(e=>{let[l]=e;return{props:{colorSeverity:l,variant:"outlined"},style:{color:t.vars?t.vars.palette.Alert["".concat(l,"Color")]:r(t.palette[l].light,.6),border:"1px solid ".concat((t.vars||t).palette[l].light),["& .".concat(g.icon)]:t.vars?{color:t.vars.palette.Alert["".concat(l,"IconColor")]}:{color:t.palette[l].main}}}}),...Object.entries(t.palette).filter((0,p.Z)(["dark"])).map(e=>{let[r]=e;return{props:{colorSeverity:r,variant:"filled"},style:{fontWeight:t.typography.fontWeightMedium,...t.vars?{color:t.vars.palette.Alert["".concat(r,"FilledColor")],backgroundColor:t.vars.palette.Alert["".concat(r,"FilledBg")]}:{backgroundColor:"dark"===t.palette.mode?t.palette[r].dark:t.palette[r].main,color:t.palette.getContrastText(t.palette[r].main)}}}})]}})),M=(0,s.ZP)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),q=(0,s.ZP)("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),R=(0,s.ZP)("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),k={success:(0,j.jsx)(y,{fontSize:"inherit"}),warning:(0,j.jsx)(b,{fontSize:"inherit"}),error:(0,j.jsx)(S,{fontSize:"inherit"}),info:(0,j.jsx)(A,{fontSize:"inherit"})};var z=l.forwardRef(function(e,t){let r=(0,c.i)({props:e,name:"MuiAlert"}),{action:l,children:o,className:n,closeText:s="Close",color:i,components:d={},componentsProps:p={},icon:m,iconMapping:h=k,onClose:f,role:v="alert",severity:g="success",slotProps:Z={},slots:y={},variant:b="standard",...S}=r,A={...r,color:i,severity:g,variant:b,colorSeverity:i||g},z=N(A),I={slots:{closeButton:d.CloseButton,closeIcon:d.CloseIcon,...y},slotProps:{...p,...Z}},[_,L]=(0,u.Z)("closeButton",{elementType:x.Z,externalForwardedProps:I,ownerState:A}),[P,E]=(0,u.Z)("closeIcon",{elementType:C.Z,externalForwardedProps:I,ownerState:A});return(0,j.jsxs)(w,{role:v,elevation:0,ownerState:A,className:(0,a.Z)(z.root,n),ref:t,...S,children:[!1!==m?(0,j.jsx)(M,{ownerState:A,className:z.icon,children:m||h[g]||k[g]}):null,(0,j.jsx)(q,{ownerState:A,className:z.message,children:o}),null!=l?(0,j.jsx)(R,{ownerState:A,className:z.action,children:l}):null,null==l&&f?(0,j.jsx)(R,{ownerState:A,className:z.action,children:(0,j.jsx)(_,{size:"small","aria-label":s,title:s,color:"inherit",onClick:f,...L,children:(0,j.jsx)(P,{fontSize:"small",...E})})}):null]})})},3050:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var l=r(5893),a=r(7294),o=r(6799),n=r(5416),s=r(1197),i=r(5307),c=r(4e3),u=r(8163),d=r(1093),p=r(7593),m=()=>{let[e,t]=(0,a.useState)(""),[r,m]=(0,a.useState)(""),[h,f]=(0,a.useState)(""),[v,g]=(0,a.useState)(""),[x,Z]=(0,a.useState)(!1),j=async l=>{if(l.preventDefault(),g(""),Z(!1),!e||!r||!h){g("All fields are required");return}if(isNaN(r)||0>=parseInt(r)){g("Units must be a positive number");return}let a={requestType:e,units:parseInt(r),disease:h};try{if((await fetch("".concat(p._,"/api/approvalRequest/createRequest"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token")),"ngrok-skip-browser-warning":"true"},body:JSON.stringify(a)})).ok)Z(!0),t(""),m(""),f("");else throw Error("Request failed")}catch(e){console.log(e.message),g("Failed to submit request. Please try again.")}};return(0,l.jsxs)("form",{onSubmit:j,className:"space-y-4 p-4 max-w-md mx-auto flex flex-col",children:[(0,l.jsxs)(o.Z,{fullWidth:!0,className:"mb-4",children:[(0,l.jsx)(n.Z,{id:"request-type-label",children:"Request Type"}),(0,l.jsxs)(s.Z,{labelId:"request-type-label",value:e,label:"Request Type",onChange:e=>t(e.target.value),required:!0,className:"w-full",children:[(0,l.jsx)(i.Z,{value:"donations",children:"Donate Blood"}),(0,l.jsx)(i.Z,{value:"blood_requests",children:"Request Blood"})]})]}),(0,l.jsx)(c.Z,{fullWidth:!0,label:"Units",type:"number",value:r,onChange:e=>m(e.target.value),required:!0,inputProps:{min:1},className:"mb-4"}),(0,l.jsx)(c.Z,{fullWidth:!0,label:"Disease",value:h,onChange:e=>{f(e.target.value.replace(/[^a-zA-Z ]/g,""))},required:!0,className:"mb-4"}),(0,l.jsx)(u.Z,{type:"submit",variant:"outlined",color:"error",children:"Submit Request"}),v&&(0,l.jsx)(d.Z,{severity:"error",className:"mt-4",children:v}),x&&(0,l.jsx)(d.Z,{severity:"success",className:"mt-4",children:"Request submitted successfully!"})]})},h=function(){return(0,l.jsxs)("div",{className:"pt-5",children:[(0,l.jsx)("div",{className:"flex justify-center",children:(0,l.jsx)("h2",{className:"text-xl font-bold text-red-500",children:"Request Form"})}),(0,l.jsx)(m,{})]})}}},function(e){e.O(0,[650,888,774,179],function(){return e(e.s=2453)}),_N_E=e.O()}]);