import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import { Separator } from '@/Components/ui/separator'
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency, getTotalNights } from '@/lib/utils'
import { IReservation, IReservationConfiguration } from '@/types/models'
import { Link, router, usePage } from '@inertiajs/react'
import { differenceInDays, formatDate } from 'date-fns'
import React from 'react'

type Props = {
    reservation: IReservation;
    configuration:IReservationConfiguration
}
const ReservationDetails = ({ reservation,configuration }: Props) => {
    const { flash } = usePage().props

    const payOnArrival = () => {
        router.post(
            route('reservations.payment.store', [reservation.id]),
            {
                method: 'cash',
                amount: reservation.total,
            }
        )
    }

    return (
        <AppLayout>
            <HeroSection
                title='Reservation Details'
                image='/images/reservation-hero-image.jpg'
            />
            <section className=" py-12 container-padded">
                {/* display success message */}
                {flash.message.success && (
                    <HeadingTitle className='mb-20'>
                        <h3 className='text-2xl lg:text-3xl font-semibold font-serif'>{flash.message.success}</h3>
                    </HeadingTitle>
                )}
                <div className="">
                    {/* <h4 className='font-serif text-xl lg:text-2xl text-primary font-semibold'>Reservation Details</h4> */}
                    <div className="mt-2 lg:mt-2 grid grid-cols-2 lg:grid-cols-3 gap-y-8">
                        <div className="col-span-1">
                            <p className='text-lg font-light'>Reservation No</p>
                            <p className='text-lg font-medium'>#{reservation.reservation_no}</p>
                        </div>
                        <div className="col-span-1">
                            <p className='text-lg font-light'>Type</p>
                            <p className='text-lg font-medium capitalize'>{reservation.type} reservation</p>
                        </div>
                        <div className="col-span-1">
                            <p className='text-lg font-light'>Status</p>
                            <p className='text-lg font-medium'>{reservation.status}</p>
                        </div>
                        <div className="col-span-1">
                            <p className='text-lg font-light'>Check In</p>
                            <p className='text-lg font-medium'>{formatDate(new Date(reservation.date_from), "MMMM dd, yyyy")}</p>
                        </div>
                        <div className="col-span-1">
                            <p className='text-lg font-light'>Check Out</p>
                            <p className='text-lg font-medium'>{formatDate(new Date(reservation.date_to), "MMMM dd, yyyy")}</p>
                        </div>
                        <div className="col-span-1">
                            <p className='text-lg font-light'>Total</p>
                            <p className='text-lg font-medium'>{formatToCurrency(reservation.total)}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className='font-serif text-xl lg:text-2xl text-primary lg:mt-14 mt-10 font-semibold'>Price Breakdown</h4>
                        <div className="lg:mt-5 mt-5 grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4">
                            <div className="col-span-1">
                                <div className='text-base lg:text-lg border px-4 py-3 font-medium'>Rate</div>
                            </div>
                            <div className="col-span-3 text-end">
                                <div className='text-base lg:text-lg border px-4 py-3 font-medium capitalize'>
                                    {formatToCurrency(reservation.type == 'room' ? reservation.room?.price ?? 0 : configuration.resort_rate)}
                                </div>
                            </div>
                        </div>
                        <div className=" grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4">
                            <div className="col-span-1">
                                <div className='text-base lg:text-lg border px-4 py-3 font-medium'>Stay</div>
                            </div>
                            <div className="col-span-3 text-end">
                                <div className='text-base lg:text-lg border px-4 py-3 font-medium capitalize'>
                                    {getTotalNights(reservation.date_from, reservation.date_to)} nights
                                </div>
                            </div>
                        </div>
                        {reservation.addOns && reservation.addOns.length > 0 && (
                            <div className=" grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4">
                                <div className="col-span-full">
                                    <div className='text-base border px-4 py-3 text-gray-600 capitalize'>
                                        Extra Amenities
                                    </div>
                                </div>
                            </div>
                        )}
                        {reservation.addOns && reservation.addOns.map((addOn => (
                            <div key={addOn.id} className=" grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4">
                                <div className="col-span-1">
                                    <div className='text-base lg:text-lg border px-4 py-3 font-medium'>{addOn.amenity?.name}</div>
                                </div>
                                <div className="col-span-3 text-end">
                                    <div className='text-base lg:text-lg border px-4 py-3 font-medium capitalize'>
                                        {formatToCurrency(addOn.price)} x {addOn.quantity}
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                    {/*  */}
                    {reservation.status.toLowerCase() == 'pending' && (
                        <div className="mt-16">
                            <hr />
                            <div className='flex items-center gap-4 mt-8'>
                                <PrimaryButtonLink className='w-max' href={route('reservations.confirm', [reservation.id])}>Confirm Reservation</PrimaryButtonLink>
                                <Link className='text-red-700' method='delete' href={route('reservations.destroy', [reservation.id])}>Delete Reservation</Link>
                            </div>
                        </div>
                    )}
                    <div className="mt-5">
                        {/* confirmed */}
                        {reservation.status.toLowerCase() == 'confirmed' && (
                            <>
                                {/* payment details */}
                                <h4 className='font-serif text-xl lg:text-2xl text-primary lg:mt-14 mt-10 font-semibold'>Payment Details</h4>
                                {
                                    reservation.payment ? (
                                        <div className="lg:mt-5 mt-5 grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4">
                                            <div className="">
                                                <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Payment No</div>
                                                <div className='text-base lg:text-lg border px-4 py-3 font-medium'>#{reservation.payment.payment_no}</div>
                                            </div>
                                            <div className="">
                                                <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Date</div>
                                                <div className='text-base lg:text-lg border px-4 py-3 font-medium capitalize'>{formatDate(new Date(reservation.payment.created_at), "MMMM dd, yyyy")}</div>
                                            </div>
                                            <div className="">
                                                <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Payment Method</div>
                                                <div className='text-base lg:text-lg border px-4 py-3 font-medium capitalize'>{reservation.payment_method == 'cash' ? 'Pay on arrival' : reservation.payment_method}</div>
                                            </div>
                                            <div className="">
                                                <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Status</div>
                                                <div className='text-base lg:text-lg border px-4 py-3 font-medium'>{reservation.payment.status}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className='mt-2'>No payment has been made yet.</p>

                                            <div className="mt-4 flex gap-3 items-center">
                                                <OutlineButtonLink className='w-max' href={route('reservations.payment.create', [reservation.id])}>Pay with GCash</OutlineButtonLink>
                                                <p className="my-1">Or</p>
                                                <OutlinedButton className='w-max' onClick={payOnArrival}>Pay on arrival</OutlinedButton>
                                            </div>
                                        </>

                                    )
                                }
                                <div className='mt-20'>
                                    <Link method='put' href={route('reservations.cancel', [reservation.id])} className='border border-red-200 py-5 px-7 hover:bg-red-100 bg-transparent transition-all text-lg text-red-700'>Cancel Reservation</Link>
                                </div>
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
