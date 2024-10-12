import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import { Calendar } from '@/Components/ui/calendar'
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency } from '@/lib/utils'
import { IAddReservation, IReservation, ISearchAvailability } from '@/types/models'
import { useForm } from '@inertiajs/react'
import { addDays, differenceInDays, format, subDays } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { ActiveModifiers, DateRange, SelectRangeModifiers } from 'react-day-picker'

type Props = {
    reservations?: IReservation[],
    dateFrom: Date | undefined,
    dateTo: Date | undefined,
    adults?: number,
    children?: number
}
const CreateReservation = ({ reservations = [], dateFrom, dateTo, adults = 1, children = 0 }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm<IAddReservation>({
        date_from: dateFrom,
        date_to: dateTo,
        adults,
        children,
        type: 'resort'
    })

    const [minDate, setMinDate] = useState(new Date())
    const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)


    const nights: number = data.date_from && data.date_to ? differenceInDays(addDays(data.date_to, 1), data.date_from) : 0;

    const modifiers = {
        booked: reservations.map((reservation) => ({
            from: new Date(reservation.date_from),
            to: new Date(reservation.date_to)
        }))
    }

    const handleSubmit = () => {
        post(route('reservations.store'));

    }

    function isDateAvailable(date: Date) {
        for (let reservation of reservations) {
            if (new Date(reservation.date_from).toDateString() == date.toDateString() || new Date(reservation.date_to).toDateString() == date.toDateString()) {
                return false;
            }
        }
        return true;
    }

    function handleRangeChange(range: DateRange | undefined, selectedDay: Date, activeModifiers: ActiveModifiers): void {

        // adjust date range of selectable date
        if (range) {
            if (selectedDay) {
                let start = new Date(selectedDay);
                // find where to start
                while (differenceInDays(new Date(start), new Date()) >= 1 && isDateAvailable(start)) {
                    start = subDays(start, 1);
                }
                setMinDate(start)
                // find where to end
                let end = new Date(selectedDay);
                while (differenceInDays(new Date(), new Date(end)) <= 20 && isDateAvailable(end)) {
                    end = addDays(end, 1);
                }
                setMaxDate(end)
            }
        }
        else {
            setMinDate(new Date());
            setMaxDate(undefined)
        }

        // update selected dates
        setData({
            ...data,
            date_to: range?.to,
            date_from: range?.from
        })
    }

    function resetCalendar(): void {
        setData({ ...data, date_from: undefined, date_to: undefined });
        setMinDate(new Date())
        setMaxDate(undefined)
    }

    return (
        <AppLayout>
            <HeroSection title='Reservation' image='/images/reservation-hero-image.jpg' />
            <section className="py-16 container-padded">
                <HeadingTitle reverse>
                    <h2 className='text-4xl font-serif font-semibold'>Book Entire Resort</h2>
                </HeadingTitle>
                <p className='mt-4 text-xl font-light'>Book the whole resort and experience exclusive luxury! During your stay, our entire resort becomes your personal playground. </p>
                <div className="flex flex-wrap gap-y-10 justify-center mt-8">
                    <div className='w-max'>
                        <div className="text-end">
                            <PrimaryButton onClick={resetCalendar} className='text-sm mb-2'>Reset</PrimaryButton>
                        </div>
                        <Calendar
                            mode="range"
                            numberOfMonths={2}
                            selected={{ from: data.date_from, to: data.date_to }}
                            onSelect={handleRangeChange}
                            modifiers={modifiers}
                            disabled={modifiers.booked}
                            fromDate={minDate}
                            toDate={maxDate}
                            modifiersClassNames={{
                                booked: " text-red-700 bg-red-100 font-semibold"
                            }}
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
                            Make Reservation
                        </PrimaryButton>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default CreateReservation
