import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import { Calendar } from '@/Components/ui/calendar'
import AppLayout from '@/Layouts/AppLayout'
import { formatToCurrency } from '@/lib/utils'
import { IAddReservation, ISearchAvailability } from '@/types/models'
import { useForm } from '@inertiajs/react'
import { addDays, differenceInDays, format } from 'date-fns'
import React from 'react'

const CreateReservation = () => {
    const { data, setData, post, processing, errors, reset } = useForm<ISearchAvailability>({
        date_from: undefined,
        date_to: undefined,
        adults: 1,
        children: 0,
    })

    const nights: number = data.date_from && data.date_to ? differenceInDays(addDays(data.date_to, 1), data.date_from) : 0;

    const handleSubmit = () => {
        // post(route('cart.store'));
    }

    return (
        <AppLayout>
            <HeroSection title='Reservation' image='/images/reservation-hero-image.jpg' />
            <section className="py-16 container-padded">
                <HeadingTitle reverse>
                    <h2 className='text-5xl font-serif font-semibold'>Find Available Rooms</h2>
                </HeadingTitle>
                <div className="mt-7 font-light text-lg">
                    <p>Select the dates of your reservations and the number of people to accomodate.</p>
                </div>
                <div className="flex mt-8">
                    <div className='w-max'>
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
                            className="rounded-md border w-max bg-white"
                        />
                        <div className="flex mt-3 justify-center">
                            <span>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                            <span className='mx-4'>-</span>
                            <span>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
                        </div>
                    </div>
                    <div className="flex-grow px-10">
                        <div className="mb-4">
                            <div className="border bg-gray-50 px-5 py-4 flex w-full items-center justify-between">
                                <label className=' pointer-events-none flex'>
                                    <span>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                                    <span className='mx-4'>-</span>
                                    <span>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
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
                <div className="mt-28">
                    <HeadingTitle>
                        <h3 className='text-4xl font-semibold font-serif text-primary'>Or book the entire resort</h3>
                    </HeadingTitle>
                    <p className='mt-4 text-xl font-light'>Book the whole resort and experience exclusive luxury! During your stay, our entire resort becomes your personal playground. </p>
                </div>
            </section>
        </AppLayout>
    )
}

export default CreateReservation
