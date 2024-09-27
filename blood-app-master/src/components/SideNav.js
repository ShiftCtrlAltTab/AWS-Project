import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function SideNav() {
    const router=useRouter()
    const {user}=useAuth()
    console.log(user)
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
        },{
            name:'History',
            path:'/history',
            access:['user']
        }

    ]
  return (
    <nav className='h-full bg-slate-600  hidden md:flex flex-col items-center  '>
    {routers?.map((eachRoute,index)=>(
        eachRoute.access?.includes(user.userType) && <Link href={eachRoute.path} 
        key={index} 
        //based on page route highlighting text
        className={`${router.pathname === eachRoute.path? 'bg-white text-red-600' : 'text-white'} hover:text-red-600 py-4 border-b border-opacity-50 text-center border-gray-50 w-full`}>
            {eachRoute.name}
        </Link>
       
        // className='text-white  hover:text-red-600 p-2 border-b border-opacity-50 text-center border-gray-50 w-full'>{eachRoute.name}</Link>
    ))}
</nav>
  )
}

export default SideNav