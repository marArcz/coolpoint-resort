import DatePickerInput from '@/Components/shared/DatePickerInput'
import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import TextInput from '@/Components/shared/TextInput'
import { Calendar } from '@/Components/ui/calendar'
import AppLayout from '@/Layouts/CustomerLayout'
import { asset, formatToCurrency, getTotalNights } from '@/lib/utils'
import { PageProps } from '@/types'
import { IAddReservation, IRoom, IRoomWithReservations } from '@/types/models'
import { router, useForm, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { addDays, differenceInCalendarDays, differenceInDays, format } from 'date-fns'
import React, { useState } from 'react'
import { ActiveModifiers, DateRange, DayModifiers } from 'react-day-picker'

type Props = {
    room: IRoomWithReservations,
    date_from: Date | undefined,
    date_to: Date | undefined,
    adults?: number,
    children?: number,
}
const Reservation = ({ room, date_from, date_to, adults = 1, children = 0 }: Props) => {

    const [mainImage, setMainImage] = useState(room.image);
    const { data, setData, post, processing, errors, reset } = useForm<IAddReservation>({
        room_id: room.id,
        date_from,
        date_to,
        adults,
        children,
    })
    const nights: number = getTotalNights(data.date_from, data.date_to);

    const modifiers = {
        booked: room.reservations.filter((reservation) => reservation.status == 'confirmed').map((reservation) => ({
            from: new Date(reservation.date_from),
            to: new Date(reservation.date_to)
        }))
    }

    const handleSubmit = () => {
        post(route('reservations.store'));
    }

    function handleOnSelectDate(range: DateRange | undefined, selectedDay: Date, activeModifiers: ActiveModifiers): void {
        setData({
            ...data,
            date_to: range?.to,
            date_from: range?.from
        })
    }

    return (
        <AppLayout>
            <HeroSection title='Room Details' image={asset(room.image)} />
            <section className="py-16 container-padded bg-gray-50">
                <div className="flex flex-col lg:flex-row gap-9 lg:justify-between lg:items-center">
                    <div>
                        <h1 className='font-serif font-medium text-5xl'>{room.name}</h1>
                        <ul className="mt-3 flex flex-wrap gap-6">
                            <li className='flex items-end gap-2 text-secondary'>
                                <span className='m-icon'>bed</span>
                                <span>{room.beds} {room.beds > 1 ? "beds" : "bed"}</span>
                            </li>
                            <li className='flex items-end gap-2 text-secondary'>
                                <span className='m-icon'>group</span>
                                <span>{room.min_people} - {room.max_people} people</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <HeadingTitle reverse>
                            <p className="text-xl lg:text-2xl text-black">{formatToCurrency(room.price)} / night</p>
                        </HeadingTitle>
                    </div>
                </div>
                <div className="mt-8">
                    <img src={asset(mainImage)} className='object-cover  object-center w-full rounded-lg md:h-[80vh] h-[60vh]' alt="" />
                </div>
                {
                    room.images && (
                        <div className="flex mt-3 overflow-x-auto overflow-y-hidden gap-4 h-max">
                            <img
                                src={asset(room.image)}
                                onClick={() => setMainImage(room.image)}
                                alt=""
                                className={clsx('rounded-lg object-cover transition-all border fade-in-5 animate-in object-center size-24 cursor-pointer hover:opacity-80', {
                                    'border-primary/80 opacity-80': room.image == mainImage
                                })}
                            />
                            {room.images.map((image) => (
                                <img
                                    key={image.id}
                                    src={asset(image.uri)}
                                    onClick={() => setMainImage(image.uri)}
                                    alt={room.name + " image"}
                                    className={clsx('rounded-lg object-cover transition-all object-center border size-24 cursor-pointer hover:opacity-80', {
                                        'border-primary/80 opacity-80': image.uri == mainImage
                                    })}
                                />
                            ))}
                        </div>
                    )
                }
                <div className='mt-14'>
                    <h2 className='font-serif font-medium text-3xl lg:text-4xl'>About Accommodation</h2>
                    <p className='mt-10'>Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum.</p>
                    <hr className='my-10' />
                    <h2 className='font-serif font-medium text-3xl lg:text-4xl'>Room Amenities</h2>
                    <div className="mt-3">
                        <ul className=" flex flex-wrap gap-6">
                            <li className='flex items-end gap-2 text-lg text-primary'>
                                <span className='m-icon'>bed</span>
                                <span>{room.beds} {room.beds > 1 ? "beds" : "bed"}</span>
                            </li>
                            <li className='flex items-end gap-2 text-lg text-primary'>
                                <span className='m-icon'>group</span>
                                <span>{room.min_people} - {room.max_people} people</span>
                            </li>
                        </ul>
                        <ul className="flex flex-wrap gap-y-6 gap-x-14 mt-8 list-disc px-5">
                            {
                                room.amenities && room.amenities.map((amenity, index) => (
                                    <li key={amenity.id} className='text-lg font-l px-0'>{amenity.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <hr className='my-10' />
                <div className="">
                    <HeadingTitle>
                        <h3 className='font-serif font-semibold lg:text-3xl text-primary text-3xl uppercase'>Reserve This Room</h3>
                    </HeadingTitle>
                    <div className="mt-8 flex lg:flex-row flex-col gap-10">
                        <div className='lg:w-max w-auto'>
                            <Calendar
                                mode="range"
                                numberOfMonths={2}
                                selected={{
                                    to: data.date_to,
                                    from: data.date_from,
                                }}
                                onSelect={handleOnSelectDate}
                                fromDate={new Date()}
                                onDayClick={(date, dateModifiers) => {
                                    if (dateModifiers.booked) {
                                        // to do
                                        alert('Date is booked')
                                    }
                                }}
                                modifiers={modifiers}
                                disabled={modifiers.booked}
                                className="rounded-md border w-max m-auto bg-white"
                            />
                            <div className="mt-3 justify-center hidden lg:flex">
                                <span>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                                <span className='mx-4'>-</span>
                                <span>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
                            </div>
                        </div>
                        <div className="flex-grow ">
                            <div className="mb-4">
                                <div className="border bg-gray-50 px-5 py-4 flex w-full items-center justify-between">
                                    <label className=' pointer-events-none flex w-max'>
                                        <span className='w-max text-nowrap'>{data.date_from ? format(data.date_from, "MMM. dd") : "Check In"}</span>
                                        <span className='mx-4'>-</span>
                                        <span className='w-max text-nowrap'>{data.date_to ? format(data.date_to, "MMM. dd") : "Check Out"}</span>
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
                                <div className="border bg-gray-50 px-5 py-4 flex w-full items-center justify-between">
                                    <label className=' pointer-events-none flex'>
                                        <span>Rate / night</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className='text-gray-600'>{formatToCurrency(room.price)}</span>
                                        {data.date_from && data.date_to && (
                                            <>
                                                <span className='text-gray-600'>x {nights}</span>
                                                <span>
                                                    ({formatToCurrency(room.price * nights)})
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <PopoverNumberInput max={room.max_people} value={data.adults} handleChange={(v) => setData('adults', v)} name='adults' label='Adults' />
                            </div>
                            <div className="">
                                <PopoverNumberInput min={0} value={data.children} handleChange={(v) => setData('children', v)} name='children' label='Children' />
                            </div>
                            <p className=' text-sm text-secondary mt-2'>Note: This room is recommended for {room.min_people} to {room.max_people} people</p>
                            <PrimaryButton onClick={handleSubmit} className='w-full text-center mt-12 py-[14px] justify-center' disabled={data.adults == 0 || data.date_from == undefined || data.date_to == undefined}>
                                Make Reservation
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Reservation
