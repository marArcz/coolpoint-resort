import { Link } from '@inertiajs/react'
import React from 'react'
import HeadingTitle from './HeadingTitle'
import OutlinedButton from './OutlinedButton'

const RoomBookingCard = () => {
    return (
        <div>
            <div className='group relative'>
                <div className='w-full h-full absolute group-hover:opacity-100 transition-all opacity-0 flex items-center justify-center'>
                    <Link href='#' className='btn-outlined bg-primary/50 btn'>
                        Book Now
                    </Link>
                </div>
                <img src="/images/rooms/room-1.jpg" className='w-full lg:h-[360px] h-[200px] object-cover' alt="" />
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <HeadingTitle width="w-12" className='me-auto'>
                        <p className='uppercase text-2xl font-medium font-serif'>Family Room #1</p>
                    </HeadingTitle>
                    <p className="font-serif font-medium text-2xl">Php 900.00 / day</p>
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
                    <Link href=''>
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RoomBookingCard
