import HeadingTitle from '@/Components/shared/HeadingTitle';
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink';
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput';
import PrimaryButton from '@/Components/shared/PrimaryButton';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import AppLayout from '@/Layouts/AppLayout'
import { formatToCurrency, getTotalNights } from '@/lib/utils';
import { IReservation, IReservationType } from '@/types/models'
import { Link, useForm } from '@inertiajs/react';
import { differenceInDays, formatDate } from 'date-fns';
import React, { FormEvent } from 'react'

type Props = {
    reservation: IReservation;
}
const ConfirmReservation = ({ reservation }: Props) => {
    const resortRate = 10000;
    const nights: number = getTotalNights(reservation.date_from, reservation.date_to);
    const { data, setData,post } = useForm<{ adults: number, children: number, payment_method:string,total:number}>({
        adults: reservation.adults,
        children: reservation.children,
        payment_method: 'cash',
        total:nights * (reservation.room?.price ?? resortRate),
    });


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("reservations.checkout",[reservation.id]));
    }

    return (
        <AppLayout>
            <div className="py-12 container-padded">
                <HeadingTitle reverse>
                    <h1 className='text-2xl lg:text-3xl font-serif font-semibold'>Confirm Reservation</h1>
                </HeadingTitle>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row gap-10 mt-8">
                        <div className="lg:w-2/5">
                            <div className="bg-white shadow p-8">
                                <h3 className='text-3xl font-serif font-semibold'>Your stay</h3>
                                <hr className="my-4" />
                                <div className="mb-3">
                                    <p className="text-sm font-light uppercase">Reservation #</p>
                                    <p className='mt-1 text-lg'>{reservation.reservation_no}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="text-sm font-light uppercase">Check In</p>
                                    <p className='mt-1 text-lg'>{formatDate(new Date(reservation.date_from), "MMM. dd, yyyy")}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="text-sm font-light uppercase">Check Out</p>
                                    <p className='mt-1 text-lg'>{formatDate(new Date(reservation.date_to), "MMM. dd, yyyy")}</p>
                                </div>
                                <div className="mt-4 mb-4">
                                    <PopoverNumberInput
                                        name='adults'
                                        label='Adults'
                                        value={data.adults}
                                        handleChange={(v) => setData('adults', v)}
                                    />
                                    <PopoverNumberInput
                                        className='mt-3'
                                        name='children'
                                        label='Children'
                                        value={data.children}
                                        handleChange={(v) => setData('children', v)}
                                    />
                                </div>
                                <hr className="my-4" />
                                <div className="mb-3">
                                    <p className="text-sm font-light uppercase">Type</p>
                                    <p className='mt-1 text-lg capitalize'>{reservation.type} reservation</p>
                                </div>
                                {reservation.room && (
                                    <>
                                        <hr className="my-4" />
                                        <p className="text-sm font-light uppercase">Room Details</p>
                                        <div className="mb-3 mt-3">
                                            <p className=' text-lg capitalize'>{reservation.room.name}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-lg flex gap-2 items-center">
                                                <span className='m-icon'>bedtime</span>
                                                <span>{nights} nights</span>
                                            </p>
                                        </div>
                                        <div className="mb-3 flex justify-between">
                                            <p className="text-lg flex gap-2 items-center">
                                                <span className='m-icon'>attach_money</span>
                                                <span>Rate per night</span>
                                            </p>
                                            <p className="text-lg capitalize">{formatToCurrency(reservation.room.price)}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* payment */}
                        <div className='flex-grow'>
                            <h3 className='font-serif font-medium text-2xl'>Price Breakdown</h3>
                            <div className="mt-8">
                                {reservation.room ? (
                                    <>
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl font-serif font-medium me-auto'>Room rate per night</p>
                                            <p className='text-lg'>{formatToCurrency(reservation.room.price)}</p>
                                        </div>
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl font-serif font-medium me-auto'>Stay</p>
                                            <p className='text-lg'>{nights} nights</p>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl font-serif font-medium me-auto'>Total</p>
                                            <p className='text-lg'>{formatToCurrency(nights * reservation.room.price)} </p>
                                        </div>
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            {/* payment method */}
                            <div className="mt-10">
                                <h4 className='font-serif font-medium text-2xl'>Payment Method</h4>

                                <div className="mt-8">
                                    <RadioGroup required defaultValue={data.payment_method} onValueChange={(v) => setData('payment_method', v)}>
                                        <div className="flex items-center mb-8 space-x-4">
                                            <RadioGroupItem value="cash" id="cash" />
                                            <Label className='text-lg' htmlFor="cash">Pay on arrival</Label>
                                        </div>
                                        <div className="flex items-center mb-3 space-x-4">
                                            <RadioGroupItem value="gcash" id="gcash" />
                                            <Label className='text-lg' htmlFor="gcash">GCash</Label>
                                        </div>
                                    </RadioGroup>
                                    <div className="mt-10 flex items-center gap-3">
                                        <Checkbox required id='has-read' />
                                        <Label className='text-base' htmlFor="has-read">I've read and accept the <Link href="#" className='text-secondary'>terms and conditions.</Link></Label>
                                    </div>
                                    <div className="mt-10 flex flex-wrap gap-5 items-center">
                                        <PrimaryButton type='submit'>Confirm reservation</PrimaryButton>
                                        <Link className='w-max border py-4 px-4 hover:bg-gray-300' method='delete' href={route('reservations.destroy', [reservation.id])}>Cancel reservation</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}

export default ConfirmReservation
