import HeadingTitle from '@/Components/shared/HeadingTitle'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import TextInput from '@/Components/shared/TextInput'
import { Calendar } from '@/Components/ui/calendar'
import { Label } from '@/Components/ui/label'
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency, getTotalNights } from '@/lib/utils'
import { IAddReservation, IReservation, IUpdateReservation } from '@/types/models'
import { useForm } from '@inertiajs/react'
import { differenceInDays, format } from 'date-fns'
import React, { FormEvent, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

type Props = {
    reservation: IReservation
}
const Reschedule = ({ reservation }: Props) => {
    console.log('data: ', reservation)
    const [bookedDates, setBookedDates] = useState<DateRange[]>([])

    const { data, setData, put, processing, errors, reset } = useForm<IUpdateReservation>({
        date_from: reservation.date_from,
        date_to: reservation.date_to,
    })

    const [minDate, setMinDate] = useState(new Date())
    const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)

    const nights: number = getTotalNights(data.date_from, data.date_to);

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        put(route('reservations.update', reservation.id));
    }
    function isDateAvailable(date: Date) {
        for (let bookedDate of bookedDates) {
            if (bookedDate?.from?.toDateString() == date.toDateString() || bookedDate?.to?.toDateString() == date.toDateString()) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        setCalendarDateRange({ from: data.date_from, to: data.date_to, }, data.date_from)
    }, [])

    function setCalendarDateRange(range: DateRange | undefined, selectedDay?: Date): void {

        // adjust date range of selectable date
        if (range) {
            if (selectedDay) {
                let start = new Date(selectedDay);

                // find where to start
                while (differenceInDays(new Date(start), new Date()) >= 1) {
                    console.log('start')
                    if (!isDateAvailable(start)) {
                        console.log('break on start')
                        break; // Exit if date is not available
                    }
                    start.setDate(start.getDate() - 1)
                }

                setMinDate(start);

                // find where to end
                let end = new Date(selectedDay);

                while (differenceInDays(new Date(end), data.date_from ?? selectedDay) <= 20) {
                    if (!isDateAvailable(end)) {
                        break; // Exit if date is not available
                    }
                    end.setDate(end.getDate() + 1);
                }

                setMaxDate(end);
            }
        }
        else {
            console.log('has no range')
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

    return (
        <AppLayout>
            <section className="py-16 container-padded bg-gray-50">
                <HeadingTitle>
                    <h1 className=' font-medium font-serif text-3xl'>Reschedule reservation</h1>
                </HeadingTitle>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row gap-10 mt-8">
                        <div>
                            <Calendar
                                mode="range"
                                numberOfMonths={2}
                                selected={{ from: data.date_from, to: data.date_to }}
                                onSelect={setCalendarDateRange}
                                modifiers={{
                                    booked: bookedDates
                                }}
                                disabled={bookedDates}
                                fromDate={minDate}
                                toDate={maxDate}
                                modifiersClassNames={{
                                    booked: " text-red-700 bg-red-100 font-semibold"
                                }}
                                className="rounded-md border w-max m-auto bg-white"
                            />
                            <div className="mt-3 justify-center hidden lg:flex">
                                <span>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                                <span className='mx-4'>-</span>
                                <span>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
                            </div>
                        </div>
                        <div className="lg:w-2/5">
                            <TextInput className='mb-4 w-full bg-gray-100' value={reservation.reservation_no} floatingLabel readOnly placeholder='Reservation No' />
                            {/* <TextInput className='mb-4 w-full bg-gray-100 uppercase' value={reservation.type} floatingLabel readOnly placeholder='Reservation type' /> */}
                            <div className="mb-4">
                                <div className="border bg-gray-50 px-5 py-4 flex w-full items-center justify-between">
                                    <label className=' pointer-events-none flex w-max'>
                                        <span className='w-max text-nowrap'>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                                        <span className='mx-4'>-</span>
                                        <span className='w-max text-nowrap'>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
                                    </label>
                                    {data.date_from && data.date_to && (
                                        <div className="flex items-center">
                                            <input type="text" value={nights} className='w-full text-end border-0 pointer-events-none bg-transparent' readOnly />
                                            <span>{nights > 1 ? "Days" : "Day"}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {
                                reservation.type == 'room' && reservation.room && (
                                    <div className="mb-4">
                                        <div className="border bg-gray-50 px-5 py-4 flex w-full items-center justify-between">
                                            <label className=' pointer-events-none flex'>
                                                <span>Rate / day</span>
                                            </label>
                                            <div className="flex items-center gap-2 flex-col">
                                                <div className="flex gap-2">
                                                    <span className='text-gray-600'>{formatToCurrency(reservation.room?.price ?? 0)}</span>
                                                    <span className='text-gray-600'>x {nights}</span>
                                                </div>
                                                {data.date_from && data.date_to && (
                                                    <div>
                                                        <span>
                                                            ({formatToCurrency(reservation.room?.price ?? 0 * nights)})
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <PrimaryButton className='w-full text-center justify-center' type='submit'>Submit</PrimaryButton>
                        </div>
                    </div>
                </form>
            </section>
        </AppLayout>
    )
}

export default Reschedule
