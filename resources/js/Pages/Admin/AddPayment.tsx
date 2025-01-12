import PrimaryButton from '@/Components/shared/PrimaryButton'
import TextInput from '@/Components/shared/TextInput'
import AdminLayout from '@/Layouts/AdminLayout'
import { formatToCurrency } from '@/lib/utils'
import { IReservation } from '@/types/models'
import { Head, useForm } from '@inertiajs/react'
import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
    reservation: IReservation
}

const AddPayment = ({ reservation }: Props) => {
    const [remainingBalance, setRemainingBalance] = useState<number>(0)
    const {data, setData, post} = useForm<{amount:string, method:string,status:string, type:string,is_refundable:boolean}>({
        amount:'',
        method:'cash',
        status:'confirmed',
        type:'full',
        is_refundable:false,
    })

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        post(route('admin.reservation.payments.store',[reservation.id]));
    }

    useEffect(() => {
        if(reservation.payments){
            let paid = 0;
            for(let payment of reservation.payments){
                paid += payment.amount;
            }
            setRemainingBalance(reservation.total - paid);
        }
    },[])
    return (
        <AdminLayout
            navbarIcon='payments'
            navbarTitle='Add Payment'
        >
            <Head title='Add Payment' />

            <h2 className='font-serif text-2xl font-semibold'>Record Cash Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-4 bg-white border mt-5">
                    <div className="grid grid-cols-2 gap-y-3">
                        <div className="">
                            <p className='md-text-lg text-base font-medium '>Total Bill:</p>
                        </div>
                        <div className="">
                            <p className='md-text-lg text-base font-medium text-end'>{formatToCurrency(reservation.total)}</p>
                        </div>
                        <div className="text-amber-700">
                            <p className='md-text-lg text-base font-medium'>Remaining Balance</p>
                        </div>
                        <div className="text-amber-700">
                            <p className='md-text-lg text-base text-end font-medium'>{formatToCurrency(reservation.total)}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <p className='mb-1 text-secondary font-medium '>Payment:</p>
                    <TextInput value={data.amount} type='number' onChange={e => setData('amount',e.target.value)} className='w-full' placeholder='Enter amount of payment' />
                </div>
                <div className="mt-3">
                    <PrimaryButton type='submit' className='w-full text-center justify-center'>Submit</PrimaryButton>
                </div>
            </form>
            <div className="mt-5">
                <p>Details about the reservation and past payment records are shown below.</p>
                <hr className="my-3" />
                <div className="p-4 bg-white border">
                    <div className="grid grid-cols-2 gap-y-3">
                        <div className="">
                            <p className='md-text-lg text-base font-medium '>Total Bill:</p>
                        </div>
                        <div className="">
                            <p className='md-text-lg text-base font-medium text-end'>{formatToCurrency(reservation.total)}</p>
                        </div>
                        <div className="text-amber-700">
                            <p className='md-text-lg text-base font-medium'>Remaining Balance</p>
                        </div>
                        <div className="text-amber-700">
                            <p className='md-text-lg text-base text-end font-medium'>{formatToCurrency(reservation.total)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddPayment
