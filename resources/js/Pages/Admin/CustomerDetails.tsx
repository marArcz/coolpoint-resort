import AdminLayout from '@/Layouts/AdminLayout'
import { IUser } from '@/types/models'
import { Link } from '@inertiajs/react'
import React from 'react'

type Props = {
    user:IUser
}
const CustomerDetails = ({user}:Props) => {
  return (
    <AdminLayout navbarTitle="User Details" navbarIcon='person'>
        <div className="flex gap-2">
            <Link className=' underline text-secondary underline-offset-4' href={route('admin.users.index')}>Users</Link>
            <span>/</span>
            <span className='font-medium'>{user.firstname} {user.lastname}</span>
        </div>

        <div className="flex mt-7 items-center gap-4">
            <img  src={user.photo || '/images/account.jpg'}  className='w-[140px] h-[140px] rounded-full' alt="" />
            <p className='text-2xl font-medium text-primary'>{user.firstname} {user.lastname}</p>
        </div>
        <div className="mt-4 mb-5">
            <p className='text-secondary'>Phone</p>
            <p className="text-lg">{user.phone}</p>
        </div>
        <div className="mb-5">
            <p className='text-secondary'>Email Address</p>
            <p className="text-lg">{user.email}</p>
        </div>
    </AdminLayout>
  )
}

export default CustomerDetails
