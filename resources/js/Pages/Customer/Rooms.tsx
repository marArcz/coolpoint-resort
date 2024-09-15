import HeadingTitle from '@/Components/shared/HeadingTitle'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import AppLayout from '@/Layouts/AppLayout'
import React from 'react'

const Rooms = () => {
    return (
        <AppLayout>
            <section aria-label='hero-section' className='p-5 lg:h-[50vh] h-[30vh] relative flex justify-center items-center'>
                <div className='absolute top-0 left-0 h-full w-full bg-gray-900/60 z-20'></div>
                <img src="/images/rooms-hero-image.jpg" alt="" className="z-10 absolute top-0 left-0 h-full object-cover w-full" />
                <div className="border w-max px-[63px] py-[22px] z-30 bg-gray-600/30 text-white">
                    <p className='font-serif text-xl lg:text-3xl font-medium'>Rooms</p>
                </div>
            </section>
            <section className='py-24 container-padded'>
                <HeadingTitle>
                    <p className='font-serif font-semibold text-2xl'>Family Rooms</p>
                </HeadingTitle>
                <div className="mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className=''>
                            <img src="/images/rooms/room-1.jpg" className='w-full lg:h-[360px] h-[200px] object-cover' alt="" />
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <HeadingTitle width="w-12" className='me-auto'>
                                        <p className='uppercase text-2xl font-medium font-serif'>Family Room #1</p>
                                    </HeadingTitle>
                                    <p className="font-serif font-medium text-2xl">Php 900.00 / night</p>
                                </div>
                                <div className="mt-4">
                                    <ul className="flex flex-wrap gap-6">
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
                                <div className="mt-6">
                                    <OutlinedButton>
                                        Book Now
                                    </OutlinedButton>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <img src="/images/rooms/room-2.jpg" className='w-full lg:h-[360px] h-[200px] object-cover' alt="" />
                            <div className="mt-4">
                                <div className="flex items-center">
                                    <HeadingTitle width="w-12" className='me-auto'>
                                        <p className='uppercase text-2xl font-medium font-serif'>Family Room #2</p>
                                    </HeadingTitle>
                                    <p className="font-serif font-medium text-2xl">Php 2,300.00 / night</p>
                                </div>
                                <div className="mt-4">
                                    <ul className="flex flex-wrap gap-6">
                                        <li className='flex items-end gap-2 text-secondary'>
                                            <span className='m-icon'>bed</span>
                                            <span>2 double deck</span>
                                        </li>
                                        <li className='flex items-end gap-2 text-secondary'>
                                            <span className='m-icon'>group</span>
                                            <span>4 - 8 people</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <OutlinedButton>
                                        Book Now
                                    </OutlinedButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Rooms
