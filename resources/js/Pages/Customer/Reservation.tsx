import DatePickerInput from '@/Components/shared/DatePickerInput'
import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import AppLayout from '@/Layouts/AppLayout'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'

const Reservation = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(3);

    const handleSubmit = () => {

    }

    return (
        <AppLayout>
            <HeroSection title='Reservation' image='/images/reservation-hero-image.jpg' />
            <section className="py-16 container-padded">
                <div className="flex flex-col lg:flex-row gap-9 justify-between items-center">
                    <div>
                        <h1 className='font-serif font-medium text-5xl'>Family Room # 1</h1>
                        <ul className="mt-3 flex flex-wrap gap-6">
                            <li className='flex items-end gap-2 text-secondary'>
                                <span className='m-icon'>bed</span>
                                <span>2 beds</span>
                            </li>
                            <li className='flex items-end gap-2 text-secondary'>
                                <span className='m-icon'>group</span>
                                <span>2 - 4 people</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <HeadingTitle>
                            <p className="text-xl lg:text-2xl text-black font-medium">PHP 2,300.00 / night</p>
                        </HeadingTitle>
                    </div>
                </div>
                <div className="mt-8 grid grid-rows-2 grid-flow-col gap-4 px-5 lg:px-14">
                    <img src="/images/rooms/room-1.jpg" className='object-cover object-center col-span-2 lg:row-span-2 row-span-1 w-full h-full' alt="" />
                    <img src="/images/rooms/room-1.jpg" className='object-cover object-top row-span-1 w-full lg:h-full h-40' alt="" />
                    <img src="/images/rooms/room-1.jpg" className='object-cover object-bottom row-span-1 w-full lg:h-full h-40' alt="" />
                </div>
                <div className="mt-7 grid lg:grid-cols-5 grid-cols-1 gap-8">
                    <div className='col-span-1 lg:col-span-3'>
                        <h2 className='font-serif font-medium text-4xl'>About Accommodation</h2>
                        <p className='mt-10'>Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum. Sit arcu odio aenean vitae eu egestas. Gravida commodo non sem diam faucibus justo dolor. Consectetur nunc scelerisque ut enim tristique sed. At leo urna eu quam cursus dolor. In bibendum sit scelerisque mattis cum.</p>
                        <hr className='my-10' />
                        <h2 className='font-serif font-medium text-4xl'>Room Amenities</h2>
                        <div className="mt-3">
                            <ul className=" flex flex-wrap gap-6">
                                <li className='flex items-end gap-2 text-secondary'>
                                    <span className='m-icon'>bed</span>
                                    <span>2 beds</span>
                                </li>
                                <li className='flex items-end gap-2 text-secondary'>
                                    <span className='m-icon'>group</span>
                                    <span>2 - 4 people</span>
                                </li>
                            </ul>
                            <ul className="flex gap-6 mt-3">
                                <li className=' text-lg font-l'>Air Conditioner</li>
                                <li className=' text-lg font-l'>Free Karaoke</li>
                                <li className=' text-lg font-l'>Kitchen</li>
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
                                    <PopoverNumberInput value={children} handleChange={(v) => setChildren(v)} name='children' label='Children' />
                                </div>
                                <PrimaryButton className='w-full text-center justify-center' disabled={adults == 0 || date?.from == undefined || date?.to == undefined}>
                                    Confirm Reservation
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
