import AdminLayout from '@/Layouts/AdminLayout'
import { IReservation } from '@/types/models'
import { Head } from '@inertiajs/react'
import React from 'react'

type Props = {
    reservation:IReservation
}

const AddPayment = ({reservation}:Props) => {
  return (
    <AdminLayout
        navbarIcon='payments'
        navbarTitle='Add Payment'
    >
        <Head title='Add Payment'/>

        <h2 className='font-serif'>Add Payment</h2>
        <div className="grid">
            <div className="col-span-1">
                <p>Reservation Details</p>
            </div>
            <div className="col-span-3"></div>
        </div>
    </AdminLayout>
  )
}

export default AddPayment
