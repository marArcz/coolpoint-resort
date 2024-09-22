import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import { Separator } from '@/Components/ui/separator'
import AppLayout from '@/Layouts/AppLayout'
import { formatToCurrency, getTotalNights } from '@/lib/utils'
import { IReservation } from '@/types/models'
import { Link, usePage } from '@inertiajs/react'
import { differenceInDays, formatDate } from 'date-fns'
import React from 'react'

type Props = {
    reservation: IReservation;
}
const ReservationDetails = ({ reservation }: Props) => {
    const { flash } = usePage().props

    return (
        <AppLayout>
            <HeroSection
                title='Reservation Details'
                image='/images/reservation-hero-image.jpg'
            />
            <section className=" py-14 container-padded">
                {/* display success message */}
                {flash.message.success && (
                    <HeadingTitle className='mb-20'>
                        <h3 className='text-3xl font-semibold font-serif'>{flash.message.success}</h3>
                    </HeadingTitle>
                )}
                <div className="">
                    <h4 className='font-serif text-3xl lg:text-4xl font-medium'>Reservation Details</h4>
                    <div className="mt-10 flex h-10 items-center space-x-12 flex-wrap">
                        <div className="">
                            <p className='text-lg font-light'>Reservation No</p>
                            <p className='text-lg font-medium'>#{reservation.reservation_no}</p>
                        </div>
                        <Separator orientation='vertical' />
                        <div className="">
                            <p className='text-lg font-light'>Type</p>
                            <p className='text-lg font-medium capitalize'>{reservation.type} reservation</p>
                        </div>
                        <Separator orientation='vertical' />
                        <div className="">
                            <p className='text-lg font-light'>Status</p>
                            <p className='text-lg font-medium'>{reservation.status}</p>
                        </div>
                    </div>
                    <div className="mt-20 flex h-10 items-center space-x-4 justify-between">
                        <div className="">
                            <p className='text-lg font-light'>Check In</p>
                            <p className='text-lg font-medium'>{formatDate(new Date(reservation.date_from), "MMMM dd, yyyy")}</p>
                        </div>
                        <Separator orientation='vertical' />
                        <div className="">
                            <p className='text-lg font-light'>Check Out</p>
                            <p className='text-lg font-medium'>{formatDate(new Date(reservation.date_to), "MMMM dd, yyyy")}</p>
                        </div>
                        <Separator orientation='vertical' />
                        {reservation.room && (
                            <>
                                <div className="">
                                    <p className='text-lg font-light'>Room</p>
                                    <Link href={route('rooms.show', [reservation.room.id])} className='text-lg underline text-secondary font-medium'>{reservation.room.name}</Link>
                                </div>
                                <Separator orientation='vertical' />
                            </>
                        )}
                        <div className="">
                            <p className='text-lg font-light'>Total</p>
                            <p className='text-lg font-medium'>{formatToCurrency(reservation.total)}</p>
                        </div>
                        <Separator orientation='vertical' />
                    </div>
                    {/*  */}
                    <div className="mt-16">
                        {reservation.status.toLowerCase() == 'pending' && (
                            <>
                                <hr />
                                <div className='flex items-center gap-4 mt-8'>
                                    <PrimaryButtonLink className='w-max' href={route('reservations.confirm', [reservation.id])}>Confirm Reservation</PrimaryButtonLink>
                                    <Link className='text-red-700' method='delete' href={route('reservations.destroy', [reservation.id])}>Delete Reservation</Link>
                                </div>
                            </>
                        )}
                    </div>

                    {/* payment details */}
                    <h4 className='font-serif text-3xl lg:text-4xl mt-24 font-medium'>Payment Details</h4>
                    {
                        reservation.payment ? (
                            <div className="mt-10 flex h-10 items-center space-x-12 flex-wrap">
                                <div className="">
                                    <p className='text-lg font-light'>Payment No</p>
                                    <p className='text-lg font-medium'>#{reservation.payment.payment_no}</p>
                                </div>
                                <Separator orientation='vertical' />
                                <div className="">
                                    <p className='text-lg font-light'>Date</p>
                                    <p className='text-lg font-medium capitalize'>{formatDate(new Date(reservation.payment.created_at), "MMMM dd, yyyy")}</p>
                                </div>
                                <Separator orientation='vertical' />
                                <div className="">
                                    <p className='text-lg font-light'>Payment Method</p>
                                    <p className='text-lg font-medium capitalize'>{reservation.payment_method == 'cash' ? 'Pay on arrival' : reservation.payment_method}</p>
                                </div>
                                <Separator orientation='vertical' />
                                <div className="">
                                    <p className='text-lg font-light'>Status</p>
                                    <p className='text-lg font-medium'>{reservation.payment.status}</p>
                                </div>
                            </div>
                        ) : (
                            <p>No payment has been made yet.</p>
                        )
                    }
                    <div className="mt-20">
                        {/* confirmed */}
                        {reservation.status.toLowerCase() == 'confirmed' && (
                            <>
                                {differenceInDays(new Date(reservation.date_from), new Date()) > 3 ? (
                                    <div className=''>
                                        <Link method='put' href={route('reservations.cancel', [reservation.id])} className='border border-red-200 py-5 px-7 hover:bg-red-100 bg-transparent transition-all text-lg text-red-700'>Cancel Reservation</Link>
                                    </div>
                                ) : (
                                    <div className=''>
                                        <hr className='mb-7' />
                                        <p className='mb-7 text-lg'>Confirmed reservations can only be cancelled 3 days before the date of reservation</p>
                                        <button disabled className='border py-3 px-5 bg-transparent transition-all text-lg text-gray-600'>Cancel Reservation</button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* cancelled */}
                        {reservation.status == 'Cancelled' && (
                            <div className=''>
                                <hr className='mb-7' />
                                <p className='mb-7 text-xl text-red-700'>Reservation was cancelled.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default ReservationDetails
