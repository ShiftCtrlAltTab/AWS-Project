
import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AppBar, Toolbar, Typography, Button, Popover, Box, Divider, MenuList, MenuItem } from '@mui/material';
import Link from 'next/link';
import { Logout, Person, Person3, PersonOutline } from '@mui/icons-material';
import SideNav from './SideNav';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const anchorEl =useRef();
  const router =useRouter()

  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const onClose=()=>{
    setOpen(false)
  } 
     const routers=[
    {
        name: 'Dashboard',
        path: '/',
        access:['admin','user']
    },
    {
        name:'Donors List',
        path:'/donorlist',
        access:['admin']
    },
    {
        name:'Blood Request List',
        path:'/requestslist',
        access:['admin']
    },
    {
        name:'Request Form',
        path:'/request',
        access:['user']
    },{
        name:'Ledger',
        path:'/ledger',
        access:['admin']
    },{
        name:'Profile',
        path:'/profile',
        access:['user']
    },{
        name:'Users',
        path:'/allusers',
        access:['admin']
    }

]
  return (
    <div className="h-screen">
      <AppBar position="fixed" className='text-red-100 bg-red-500'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
             
              Blood Bank 
            </Link>
          </Typography>
          {user ? (<>
            <div className='md:flex gap-4 items-center hidden'>

              <Button color="inherit" onClick={logout}>Logout</Button>

          
            </div>
            <div className='flex md:hidden'>
              <Button variant='' className=''>
               <PersonOutline onClick={handleOpen} ref={anchorEl}/>
              </Button>
              <Popover
      anchorEl={anchorEl.current}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
      <Typography variant="subtitle1">{user?.first_name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.email}
        </Typography>
      </Box>
      <Divider />
        <MenuList 
          className='flex flex-col'
         >
           {routers?.map((eachRoute,index)=>(
        eachRoute.access?.includes(user.userType) && <Link href={eachRoute.path} 
        key={index} 
        //based on page route highlighting text
        className={`${router.pathname === eachRoute.path? 'bg-white text-red-600' : 'text-black'} hover:text-red-600 py-2 border-b border-opacity-50 text-left px-2 border-gray-50 w-full`}>
            {eachRoute.name}
        </Link>
       
        // className='text-white  hover:text-red-600 p-2 border-b border-opacity-50 text-center border-gray-50 w-full'>{eachRoute.name}</Link>
    ))}
        <MenuItem onClick={logout}>
           <Logout/>
        <span>Sign out
          </span>  
        </MenuItem>
      </MenuList>
      {/* } */}
    </Popover>
              </div>
            </>
          ) : (
            <div className='flex gap-3'>
              <Link href="/login" className=''>
              Login
              </Link>
              <Link href="/register">
              Register
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <main className="grid grid-cols-6 pt-[60px] h-screen">
        <div className={`${user?'col-span-1':''}`}>

      {user && <SideNav/>}
        </div>
          
        <div className={`${!user?'col-span-6':'md:col-span-5 col-span-6'}`}>
        {children}


        

        </div>
      </main>
    </div>
  );
}
