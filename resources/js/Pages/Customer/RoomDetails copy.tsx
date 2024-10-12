import DatePickerInput from '@/Components/shared/DatePickerInput'
import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency } from '@/lib/utils'
import { IRoom } from '@/types/models'
import { router } from '@inertiajs/react'
import clsx from 'clsx'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'

const Reservation = ({ room }: { room: IRoom }) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    const [mainImage, setMainImage] = useState(room.image);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(3);

    const handleSubmit = () => {
        router.post(route('rooms.reservations.store',))
    }

    return (
        <AppLayout>
            <HeroSection title='Reservation' image='/images/reservation-hero-image.jpg' />
            <section className="py-16 container-padded bg-gray-50">
                <div className="flex flex-col lg:flex-row gap-9 justify-between items-center">
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
                    <img src={mainImage} className='object-cover object-center w-full h-[80vh]' alt="" />
                </div>
                {
                    room.images && (
                        <div className="flex mt-3 overflow-x-auto overflow-y-hidden gap-4 h-max">
                            <img
                            src={room.image}
                            onClick={() => setMainImage(room.image)}
                            alt=""
                            className={clsx('object-cover transition-all border fade-in-5 animate-in object-center size-28 cursor-pointer hover:opacity-80',{
                                'border-primary/80 opacity-80':room.image == mainImage
                            })}
                            />
                            {room.images.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.uri}
                                    onClick={() => setMainImage(image.uri)}
                                    alt={room.name + " image"}
                                    className={clsx('object-cover transition-all object-center border size-28 cursor-pointer hover:opacity-80',{
                                        'border-primary/80 opacity-80':image.uri == mainImage
                                    })}
                                />
                            ))}
                        </div>
                    )
                }
                <div className="lg:mt-14 mt-10 grid lg:grid-cols-5 grid-cols-1 gap-x-12 gap-y-8">
                    <div className='col-span-1 lg:col-span-3'>
                        <h2 className='font-serif font-medium text-4xl'>About Accommodation</h2>
                        <p className='mt-10'>Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum.</p>
                        <hr className='my-10' />
                        <h2 className='font-serif font-medium text-4xl'>Room Amenities</h2>
                        <div className="mt-3">
                            <ul className=" flex flex-wrap gap-6">
                                <li className='flex items-end gap-2 text-secondary'>
                                    <span className='m-icon'>bed</span>
                                    <span>{room.beds} {room.beds > 1 ? "beds" : "bed"}</span>
                                </li>
                                <li className='flex items-end gap-2 text-secondary'>
                                    <span className='m-icon'>group</span>
                                    <span>{room.min_people} - {room.max_people} people</span>
                                </li>
                            </ul>
                            <ul className="flex flex-wrap gap-y-6 gap-x-14 mt-3 list-disc px-5">
                                {
                                    room.amenities && room.amenities.map((amenity, index) => (
                                        <li key={amenity.id} className='text-lg font-l px-0'>{amenity.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="shadow border col-span-1 lg:col-span-2 bg-white p-11">
                        <h3 className='font-serif font-bold text-3xl lg:text-4xl'>Reservation</h3>
                        <div className="mt-6 w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <DatePickerInput date={date} setDate={setDate} />
                                </div>
                                <div className="mb-4">
                                    <PopoverNumberInput value={adults} handleChange={(v) => setAdults(v)} name='adults' label='Adults' />
                                </div>
                                <div className="mb-8">
                                    <PopoverNumberInput min={0} value={children} handleChange={(v) => setChildren(v)} name='children' label='Children' />
                                </div>
                                <PrimaryButton className='w-full text-center mt-12 py-[20px] justify-center' disabled={adults == 0 || date?.from == undefined || date?.to == undefined}>
                                    Make Reservation
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Reservation
