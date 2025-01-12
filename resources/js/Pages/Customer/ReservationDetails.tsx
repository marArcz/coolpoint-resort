import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import AppLayout from '@/Layouts/CustomerLayout'
import { asset, formatToCurrency, getTotalNights } from '@/lib/utils'
import { IReservation, IReservationConfiguration } from '@/types/models'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { formatDate } from 'date-fns'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { FormEvent, useEffect, useState } from 'react'
import { Button } from '@/Components/ui/button'
import { Textarea } from '@/Components/ui/textarea'
import { Label } from '@/Components/ui/label'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import ConfirmLink from '@/Components/ConfirmLink'
import ReservationStatusMessage from '@/Components/ReservationStatusMessage'
import ImageDialog from '@/Components/ImageDialog'
import { echo } from '@/echo'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { Input } from '@/Components/ui/input'
import TextInput from '@/Components/shared/TextInput'


type Props = {
    reservation: IReservation
    configuration: IReservationConfiguration
}
const ReservationDetails = ({ reservation: data, configuration }: Props) => {
    console.log('reservation: ', data)
    const [reservation, setReservation] = useState<IReservation>(data)
    const [receipt, setReceipt] = useState<File | null>(null);
    const { flash } = usePage().props
    const [reason, setReason] = useState<string>('')

    const fetchReservation = async () => {
        try {
            const res = await axios.get<IReservation>(route('api.reservations.show', [reservation.id]));
            setReservation(res.data)
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Cannot fetch reservation details"
            })
        }
    }

    useEffect(() => {
        // listen for realtime updates
        echo.private(`reservations.${reservation.id}`)
            .listen(".reservation.updated", function (data: any) {
                console.log(data);
                fetchReservation()
            })
            .subscribed(function () {
                console.log('subscribed to channel')
            })
            .error((error: any) => {
                console.error('Error: ', error);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Cannot fetch real time updates"
                })
            })
    }, []);

    const handleCancelReservation = (e: FormEvent) => {
        e.preventDefault();
        router.put(route('reservations.cancel', [reservation.id]), { reason });
    }

    function handleSubmitNewPayment(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();

    }

    return (
        <AppLayout>
            <Head title='Reservation Details' />
            <HeroSection
                title='Reservation Details'
                image='/images/reservation-hero-image.jpg'
            />
            <section className=" py-10 container-padded">
                {/* display success message */}
                {flash.message.success && (
                    <HeadingTitle className='mb-10'>
                        <h3 className='md:text-2xl text-lg lg:text-3xl font-semibold font-serif'>{flash.message.success}</h3>
                    </HeadingTitle>
                )}
                {/* display when payment is rejected */}
                {reservation.status == 'Approved' && reservation.cancellation_request == null && reservation.payments?.[0] && reservation.payments[0].status == 'Rejected' && (
                    <div className='mb-8  border p-3 '>
                        <p className="bg-red-100 p-4  text-red-600 font-normal text-lg">Oh no! The payment you submitted has been rejected</p>
                        <img src={`/files/${reservation.payments[0].receipt}`} className='h-[30vh] mt-4 rounded-md' alt="" />
                        <p className='mt-5 mb-2 text-gray-600 text-sm'>Note by owner:</p>
                        <p className='text-red-500'>{reservation.payments[0].notes}</p>
                        <div className="mt-5 text-end">
                            <PrimaryButtonLink className='ms-auto w-max' href={route('reservations.payment.create', [reservation.id])}>Create another payment</PrimaryButtonLink>
                        </div>
                        {/* <div className="mt-3 border border-dashed border-gray-400 p-3 rounded-lg">
                            <form onSubmit={handleSubmitNewPayment}>
                                <Label className='text-gray-600 font-normal'>Attach new receipt / proof of payment</Label>
                                <TextInput required onChange={e => setReceipt(e.target.files?.item(0) ?? null)} accept='image/*' type='file' className='mt-1 w-full' />
                                <div className="mt-4 text-end">
                                    <PrimaryButton type='submit'>Submit</PrimaryButton>
                                </div>
                            </form>
                        </div> */}
                    </div>
                )}

                {reservation.cancellation_request && reservation.cancellation_request.status == 'Pending' ? (
                    <div className='bg-secondary p-6 mb-10'>
                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="">
                                <p className='text-lg text-white'>Cancellation Request</p>
                                <p className='text-gray-200 mt-3'>You submitted a request for cancellation on <span className="text-white">{formatDate(reservation.cancellation_request.created_at, 'MMM dd, yyyy')}.</span></p>
                                <p className=' text-gray-300 mt-5'>Reason:</p>
                                <p className='mt-1 text-white'>{reservation.cancellation_request.reason}</p>
                            </div>
                            <div className=' text-white font-medium'>
                                <p className="text-gray-200 font-light">Status:</p>
                                {reservation.cancellation_request.status}
                            </div>
                        </div>
                        <ConfirmLink as='button' method='delete' dialogTitle='Delete Cancellation Request?' href={route('cancellation_requests.destroy', [reservation.cancellation_request.id])} className='mt-5 ms-auto w-max'>Cancel</ConfirmLink>
                    </div>
                ) : (
                    <div>
                        {reservation.status == 'Pending' && (
                            <div className="bg-gray-300 text-gray-800 font-medium rounded-lg px-4 py-4 mb-10 text-lg">
                                <p>Your reservation is currently being reviewed.</p>
                            </div>
                        )}
                        {reservation.status == 'Approved' && (reservation.payments == null || reservation.payments.length == 0) && (
                            <div className="bg-amber-800/10 text-amber-800 font-medium rounded-lg px-4 py-4 mb-10 md:text-lg text-base">
                                <p>Your slot has been reserved. Automatic cancellation will be done if no payment is made within eight (8) hours after booking time.</p>
                            </div>
                        )}
                        {reservation.status == 'Cancelled' && (
                            // <ReservationStatusMessage status='Cancelled'/>
                            <div className="bg-gray-300 text-gray-800 font-medium rounded-lg px-4 py-4 mb-10 text-lg">
                                <p className='flex items-center gap-2'>
                                    <span className='m-icon'>info</span>
                                    <span>This reservation has been cancelled</span>
                                </p>
                            </div>
                        )}
                    </div>
                )}
                <div className="mt-2 lg:mt-2">
                    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-y-8">
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
                            <p className={` font-medium reservation-status-badge ${reservation.status.toLowerCase()} w-max`}>
                                {reservation.mStatus}
                            </p>
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
                        <div className="col-span-1">
                            <p className='text-lg font-light'>Payment Method</p>
                            <p className='text-lg font-medium'>{reservation.payment_method == 'cash' ? 'Pay on arrival' : 'GCash'}</p>
                        </div>
                    </div>
                    {/* room details */}
                    {reservation.type == 'room' && reservation.room && (
                        <div>
                            <h4 className='font-serif text-xl lg:text-2xl text-primary lg:mt-14 mt-10 font-semibold'>Room Details</h4>
                            <div className="lg:mt-5 mt-5 grid lg:grid-cols-3 grid-cols-2 lg:gap-y-0 gap-y-4">
                                <div className="h-100 flex flex-col ">
                                    <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Room </div>
                                    <div className='text-base lg:text-lg flex items-center border flex-1 px-4 py-3 font-medium'>{reservation.room.name}</div>
                                </div>
                                <div className="h-100 flex flex-col">
                                    <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Image</div>
                                    <div className='text-base lg:text-lg border flex items-center flex-1 px-4 py-3 font-medium capitalize'>
                                        <ImageDialog
                                            imageUrl={asset(reservation.room.image)}
                                            dialogTitle='Room image'
                                            className='text-gray-300 underline underline-offset-4 text-base'
                                        >
                                            <img src={asset(reservation.room.image)} width={80} height={80} alt="" />
                                        </ImageDialog>
                                    </div>
                                </div>
                                <div className="h-100 flex flex-col">
                                    <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Price</div>
                                    <div className='text-base lg:text-lg border flex items-center flex-1 px-4 py-3 font-medium capitalize'>{formatToCurrency(reservation.room.price)}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* price breakdown */}
                    <div>
                        <h4 className='font-serif text-xl lg:text-2xl text-primary lg:mt-14 mt-10 font-semibold'>Price Breakdown</h4>
                        <div className="mt-3 grid grid-cols-3 lg:gap-y-0 gap-y-4">
                            <div className="col-span-2 h-full align-middle">
                                <div className='text-base h-full border px-4 py-3 font-medium'>Rate</div>
                            </div>
                            <div className="col-span-1 text-end">
                                <div className=' flex-wrap border px-4 py-3 font-medium capitalize flex justify-end items-center '>
                                    <span className='text-wrap'>
                                        {formatToCurrency(reservation.type == 'room' ? reservation.room?.price ?? 0 : configuration.resort_rate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className=" grid grid-cols-3 lg:gap-y-0 gap-y-4">
                            <div className="col-span-2 h-full align-middle">
                                <div className='text-base h-full border px-4 py-3 font-medium'>Stay</div>
                            </div>
                            <div className="col-span-1 text-end">
                                <div className=' flex-wrap border px-4 py-3 font-medium capitalize flex justify-end items-center '>
                                    <span className='text-wrap'> {getTotalNights(reservation.date_from, reservation.date_to)} nights</span>
                                </div>
                            </div>
                        </div>
                        {reservation.add_ons && reservation.add_ons.length > 0 && (
                            <div className=" grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4">
                                <div className="col-span-full">
                                    <div className='text-base border px-4 py-2 bg-gray-100 text-black capitalize'>
                                        Add Ons
                                    </div>
                                </div>
                            </div>
                        )}
                        {reservation.add_ons && reservation.add_ons.map((addOn => (
                            <div key={addOn.id} className=" grid grid-cols-3 lg:gap-y-0 gap-y-4 align-middle items-center">
                                <div className="col-span-2 h-full align-middle">
                                    <div className='text-base h-full border px-4 py-3 font-medium'>{addOn.amenity?.name}</div>
                                </div>
                                <div className="col-span-1 text-end">
                                    <div className=' flex-wrap border px-4 py-3 font-medium capitalize flex justify-end items-center '>
                                        <span className='text-wrap'>{formatToCurrency(addOn.price)}</span>
                                        <span className='m-icon text-sm'>close</span>
                                        <span className='text-sm font-normal'>{addOn.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                    <div className="mt-5">
                        {reservation.status != 'Cancelled' && (
                            <>
                                <h4 className='font-serif text-2xl lg:text-2xl text-primary lg:mt-14 mt-10 font-semibold'>Payment Details</h4>
                                {reservation.status == 'Approved' || reservation.status == 'Completed' ? (
                                    <>
                                        {
                                            reservation.payments?.[0] ? (
                                                <>
                                                    <div className="lg:mt-5 align-middle mt-5 grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4 relative h-max">
                                                        <div className="">
                                                            <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Payment No</div>
                                                            <div className=' text-base lg:text-lg border px-4 py-3 font-medium'>#{reservation.payments[0].payment_no}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Date</div>
                                                            <div className='text-sm lg:text-lg border px-4 py-3 font-medium capitalize'>{formatDate(new Date(reservation.payments[0].created_at), "MMMM dd, yyyy")}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Payment Method</div>
                                                            <div className='text-base lg:text-lg border px-4 py-3 font-medium capitalize'>{reservation.payment_method == 'cash' ? 'Pay on arrival' : reservation.payment_method}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Status</div>
                                                            <div className='text-base lg:text-lg border px-4 py-3 font-medium'>{reservation.payments[0].status}</div>
                                                        </div>
                                                    </div>
                                                    <div className="lg:mt-5 mt-5 grid lg:grid-cols-4 grid-cols-2 lg:gap-y-0 gap-y-4">
                                                        <div className="">
                                                            <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Type</div>
                                                            <div className='text-base lg:text-lg border px-4 py-3 font-medium'>{reservation.payment_method == 'gcash' ? 'Full Payment' : 'Down Payment'}</div>
                                                        </div>
                                                        <div className="">
                                                            <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Proof of payment</div>
                                                            <div className='text-base lg:text-lg border px-4 py-3 font-medium capitalize'>
                                                                {/* <img src={`/files/${reservation.payment.receipt}`} width={200} className='object-cover' alt="" /> */}
                                                                <Dialog>
                                                                    <DialogTrigger className='text-sm text-secondary'>Click to view attachment</DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>Attached proof of payment</DialogTitle>
                                                                            <DialogDescription>
                                                                                This will be reviewed for validity.
                                                                            </DialogDescription>
                                                                        </DialogHeader>
                                                                        <div className="py-3">
                                                                            <img src={`/files/${reservation.payments[0].receipt}`} className='object-cover mx-auto h-[60vh]' alt="" />
                                                                        </div>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className='lg:text-base text-sm border px-4 lg:py-3 py-2 font-regular text-gray-500'>Amount</div>
                                                            <div className='text-base lg:text-lg border px-4 py-3 font-medium'>{formatToCurrency(reservation.payments[0].amount)}</div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {reservation.payment_method == 'cash' ? (
                                                        <p className='mt-2 text-lg'>To proceed with your reservation, <span className='font-medium text-amber-700'>You need to pay 50% down payment in advance via GCash and pay the rest on your arrival.</span></p>
                                                    ) : (
                                                        <p className='mt-2 text-lg'>No payment has been made yet.</p>
                                                    )}
                                                    <div className="mt-4 flex gap-3 items-center">
                                                        <PrimaryButtonLink className='w-max' href={route('reservations.payment.create', [reservation.id])}>Process Payment</PrimaryButtonLink>
                                                    </div>
                                                </>

                                            )
                                        }
                                        {
                                            reservation.cancellation_request == null && reservation.status != 'Completed' && (
                                                <div className='mt-20 flex flex-col md:flex-row gap-2 items-center'>
                                                    <Link href={route('reservations.cancellation_requests.create', [reservation.id])} className='border md:w-max w-full text-center border-red-200 py-5 px-7 hover:bg-red-100 bg-transparent transition-all text-lg text-red-700'>Cancel Reservation</Link>
                                                    <Link href={route('reservations.edit', [reservation.id])} className='border md:w-max w-full text-center border-gray-300 py-5  px-7 hover:bg-gray-200 bg-transparent transition-all text-lg text-gray-700'>Reschedule</Link>
                                                </div>
                                            )
                                        }
                                    </>
                                ) : (
                                    <p className='mt-3 text-gray-500 text-lg'>You can process payment once your reservation is approved.</p>
                                )}
                            </>
                        )}

                        {/* cancelled */}
                        {reservation.status == 'Cancelled' && (
                            <div className='mt-10'>
                                <p className='mb-7 text-xl bg-red-100 w-full px-5 py-3 text-red-700'>Reservation was cancelled.</p>
                            </div>
                        )}

                        <div className="mt-8">
                            {/* reservation is pending */}
                            {reservation.status == 'Pending' && (
                                <Link href={route('reservations.cancellation_requests.create', [reservation.id])} className='border border-red-200 py-3 px-4 hover:bg-red-100 bg-transparent transition-all text-lg text-red-700'>Cancel Reservation</Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default ReservationDetails
