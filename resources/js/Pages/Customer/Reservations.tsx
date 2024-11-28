import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink'
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import { Calendar } from '@/Components/ui/calendar'
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency } from '@/lib/utils'
import { IAddReservation, IPaginatedData, IReservation, ISearchAvailability } from '@/types/models'
import { Head, Link, useForm } from '@inertiajs/react'
import { addDays, differenceInDays, format, formatDate } from 'date-fns'
import React from 'react'

type Props = {
    reservations: IPaginatedData<IReservation>;
}
const Reservations = ({ reservations }: Props) => {
    console.log(reservations)
    const { data, setData, get, processing, errors, reset } = useForm<ISearchAvailability>({
        date_from: undefined,
        date_to: undefined,
        adults: 1,
        children: 0,
    })

    const nights: number = data.date_from && data.date_to ? differenceInDays(addDays(data.date_to, 1), data.date_from) : 0;

    const handleSubmit = () => {
        get(route('availability.index'));
    }

    return (
        <AppLayout>
            <Head title='Reservations' />
            <section className="py-16 container-padded">
                <h2 className='text-4xl font-serif font-semibold'>Your Reservations</h2>
                <div className="mt-4">
                    {reservations.data.length > 0 ? (
                        <>
                            <div className="w-full font-normal">
                                <div className=' text-left bg-gray-50 border-b border-gray-200'>
                                    <div className='lg:grid lg:grid-cols-5 hidden  items-center gap-4 bg-secondary text-white '>
                                        <div className='px-6 py-4 col-span-1'>Reservation</div>
                                        <div className='px-6 py-4 col-span-1'>Total</div>
                                        <div className='px-6 py-4 col-span-1'>Status</div>
                                        <div className='px-6 py-4 col-span-1'>Payment Method</div>
                                        <div className='px-6 py-4 col-span-1 text-left'>Payment</div>
                                    </div>
                                    {/* rows */}
                                    {reservations.data && reservations.data.map((reservation) => (
                                        <Link href={route('reservations.show', [reservation.id])} key={reservation.id} className='row group'>
                                            <div className='grid lg:grid-cols-5 grid-cols-4 items-center gap-4 group-hover:bg-gray-500/10 text-gray-900 border-b border-gray-300 py-4'>
                                                <div className='px-6 py-2 lg:py-4 col-span-full lg:col-span-1'>
                                                    <p className='text-primary font-medium mb-2 block lg:hidden'>Reservation</p>
                                                    <p className='mb-1'>#{reservation.reservation_no}</p>
                                                    <p className='mb-1'>{formatDate(new Date(reservation.date_from), "MMM. dd, yyyy")} - {formatDate(new Date(reservation.date_to), "MMM. dd, yyyy")}</p>
                                                    <p className=''>{reservation.adults} Adults, {reservation.children} Children</p>
                                                    <p className='mt-2 block '>{reservation.room?.name}</p>
                                                </div>
                                                <div className='px-6 py-2 lg:py-4 col-span-2 lg:col-span-1 text-lg'>
                                                    <p className='text-primary font-medium mb-2 block lg:hidden text-sm'>Total</p>
                                                    <p className='lg:text-lg text-base'>{formatToCurrency(reservation.total)}</p>
                                                </div>
                                                <div className='px-6 py-2 lg:py-4 col-span-2 lg:col-span-1'>
                                                    <p className='text-primary font-medium mb-2 block lg:hidden text-sm'>Status</p>
                                                    {reservation.status.toLowerCase() == "pending" ? (
                                                        <p className=''>
                                                            <span>Pending for confirmation</span>
                                                        </p>
                                                    ) : (
                                                        <p className={`font-medium ${reservation.status == 'Approved'?'text-green-700':'text-gray-600'}`}>{reservation.status}</p>
                                                    )}
                                                </div>
                                                <div className='px-6 py-2 lg:py-4 col-span-2 lg:col-span-1 text-lg capitalize'>
                                                    <p className='text-primary font-medium mb-2 block lg:hidden text-sm'>Payment Method</p>
                                                    <p>{reservation.payment_method || "-"}</p>
                                                </div>
                                                <div className='px-6 py-4 col-span-2 lg:col-span-1 text-left'>
                                                <p className='text-primary font-medium mb-2 block lg:hidden text-sm'>Payment Status</p>
                                                    {reservation.payments?.[0] ? (
                                                        <p>{reservation.payments[0].status}</p>
                                                    ) : (
                                                        <p>None</p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {/* pagination control */}
                                <div className="justify-center mt-3 gap-2 flex">
                                    <PrimaryButtonLink disabled={reservations.prev_page_url == null} href={reservations.prev_page_url?? ''} className=' w-max' >Prev</PrimaryButtonLink>
                                    <PrimaryButtonLink disabled={reservations.next_page_url == null} href={reservations.next_page_url?? ''} className=' w-max' >Next</PrimaryButtonLink>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className='border p-4'>No active reservations found.</p>
                    )}
                </div>
            </section>
            <section className="py-16 container-padded">
                <HeadingTitle reverse>
                    <h2 className='text-3xl font-serif font-semibold'>Search for availability</h2>
                </HeadingTitle>
                <div className="mt-7 font-light text-lg">
                    <p>Select the dates of your reservations and the number of people to accomodate.</p>
                </div>
                <div className="flex mt-8 flex-wrap gap-y-10">
                    <div className='w-max m-auto'>
                        <Calendar
                            mode="range"
                            numberOfMonths={2}
                            selected={{
                                to: data.date_to,
                                from: data.date_from,
                            }}
                            onSelect={(range, selectedDay, modifiers) => {
                                setData('date_from', range?.from ?? undefined)
                                if (range?.from == data.date_from) {
                                    setData('date_to', range?.to ?? undefined)
                                }

                            }}
                            fromDate={new Date()}
                            className="rounded-md border lg:w-max w-auto m-auto bg-white"
                        />
                        <div className="lg:flex hidden mt-3 justify-center">
                            <span>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                            <span className='mx-4'>-</span>
                            <span>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
                        </div>
                    </div>
                    <div className="flex-grow lg:px-10">
                        <div className="mb-4">
                            <div className="border bg-gray-50 px-5 py-4 flex w-full items-center justify-between">
                                <label className=' pointer-events-none flex'>
                                    <span className='text-nowrap'>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                                    <span className='mx-4'>-</span>
                                    <span className='text-nowrap'>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
                                </label>
                                {data.date_from && data.date_to && (
                                    <div className="flex items-center">
                                        <input type="text" value={nights} className='w-full text-end border-0 pointer-events-none' readOnly />
                                        <span>{nights > 1 ? "Nights" : "Night"}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <PopoverNumberInput value={data.adults} handleChange={(v) => setData('adults', v)} name='adults' label='Adults' />
                        </div>
                        <div className="">
                            <PopoverNumberInput min={0} value={data.children} handleChange={(v) => setData('children', v)} name='children' label='Children' />
                        </div>
                        <PrimaryButton onClick={handleSubmit} className='w-full text-center mt-12 py-[14px] justify-center' disabled={data.adults == 0 || data.date_from == undefined || data.date_to == undefined}>
                            Search Availability
                        </PrimaryButton>
                    </div>
                </div>
                {/* <div className="mt-28">
                    <HeadingTitle>
                        <h3 className='text-3xl lg:text-4xl font-semibold font-serif text-primary'>Or book the entire resort</h3>
                    </HeadingTitle>
                    <p className='mt-4 text-xl font-light'>Book the whole resort and experience exclusive luxury! During your stay, our entire resort becomes your personal playground. </p>
                    <OutlineButtonLink className='mt-5 lg:w-max w-full' href='#'>Book Now</OutlineButtonLink>
                </div> */}
            </section>
        </AppLayout>
    )
}

export default Reservations
