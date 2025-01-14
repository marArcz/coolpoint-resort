import DropdownSelect from '@/Components/shared/DropdownSelect'
import HeadingTitle from '@/Components/shared/HeadingTitle'
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import TextInput from '@/Components/shared/TextInput'
import { Textarea } from '@/Components/ui/textarea'
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency } from '@/lib/utils'
import { IReservation, IReservationStatus } from '@/types/models'
import { router, useForm } from '@inertiajs/react'
import clsx from 'clsx'
import React, { useState } from 'react'

type Props = {
    reservation: IReservation
}

const CreateCancellationRequest = ({ reservation }: Props) => {
    const cancellationReasons = [
        'Change of mind',
        'Personal Reasons',
        'Found a better deal',
        'Change of plans',
        'Unavailability of preferred dates',
        'Accommodation preferences not met',
        'Booking error',
        'Other reason',
    ];
    const [reasonDropdown, setReasonDropdown] = useState("");
    const [reason, setReason] = useState("");

    const { data, setData, post, put } = useForm({
        reason: '',
        gcash_account_name: '',
        gcash_number: '',
    })

    const handleReasonDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value;
        setReasonDropdown(value)
        if (value.toLowerCase() == 'other reason') {
            setData('reason', "");
        } else {
            setData('reason', value);
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (reservation.status == IReservationStatus.APPROVED) {
            post(route('reservations.cancellation_requests.store', [reservation.id]));
        } else {
            put(route('reservations.cancel', [reservation.id]));
        }
    }

    return (
        <AppLayout>
            <section className='py-10 container-padded'>
                <HeadingTitle reverse>
                    <h2 className='text-3xl lg:text-3xl font-serif font-semibold'>Cancel Reservation</h2>
                </HeadingTitle>
                {reservation.status == IReservationStatus.APPROVED && (
                    <p className='mt-2'>Reservation Cancellation Request</p>
                )}
                <form onSubmit={handleSubmit}>

                    <div className="mt-3 p-4 border bg-gray-200">
                        <p className='text-primary font-medium'>Payment Refund:</p>
                        {reservation.payments?.[0] && reservation.isPaid ? (
                            <>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <p>{reservation.payment_method == 'gcash' ? 'Full Payment' : 'Down Payment'}</p>
                                        <p className='text-gray-500'>Type</p>
                                    </div>
                                    <div>
                                        <p>{formatToCurrency(reservation.payments[0].amount)}</p>
                                        <p className='text-gray-500'>Amount</p>
                                    </div>
                                    <div className={clsx("h-100 py-3 px-4 flex font-medium justify-center items-center border border-dashed uppercase", {
                                        "border-red-700 text-red-700": reservation.payment_method == 'cash',
                                        "border-primary text-primary": reservation.payment_method == 'gcash',
                                    })}>
                                        {reservation.payment_method == 'gcash' ? 'Refundable' : 'Non Refundable'}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="mt-2 flex">
                                <p className='text-gray-500'>No payment to refund.</p>
                            </div>
                        )}
                    </div>
                    {reservation.payment_method == 'gcash' && reservation.isPaid &&  (
                        <div className='mt-5'>
                            <p className='font-medium'>Gcash Account for refund:</p>
                            <TextInput required value={data.gcash_account_name} onChange={e => setData('gcash_account_name', e.target.value)} className='mt-2 w-full' placeholder='Account Name' />
                            <TextInput required value={data.gcash_number} onChange={e => setData('gcash_number', e.target.value)} className='mt-4 w-full' placeholder='Account Phone Number' />
                        </div>
                    )}
                    <p className='mt-4 font-medium'>Reason for cancellation</p>
                    <div className="mt-1">
                        <DropdownSelect required className='' placeholder='Select Reason' onChange={handleReasonDropdownChange} value={reasonDropdown}>
                            <option value="">Select Reason</option>
                            {cancellationReasons.map((reason, index) => (
                                <option value={reason} key={index}>{reason}</option>
                            ))}
                        </DropdownSelect>
                    </div>
                    {reasonDropdown.toLowerCase() == "other reason" && (
                        <div className="mt-3">
                            <textarea required className='px-5 py-4 border border-gray-300 focus:ring-gray-200 focus:border-gray-400 w-full' value={reason} onChange={e => setReason(e.target.value)} placeholder='Please tell us why...'></textarea>
                        </div>
                    )}

                    <div className="mt-10 flex gap-3 justify-end">
                        <OutlinedButton className='w-max hover:bg-gray-200' onClick={() => history.back()}>Cancel</OutlinedButton>
                        <PrimaryButton type='submit'>Submit Request</PrimaryButton>
                    </div>
                </form>
            </section>
        </AppLayout>
    )
}

export default CreateCancellationRequest
