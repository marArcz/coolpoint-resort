import { IRoom } from '@/types/models'
import React from 'react'
import OutlinedButton from './OutlinedButton'
import { Link } from '@inertiajs/react'
import HeadingTitle from './HeadingTitle'
import { formatToCurrency } from '@/lib/utils'

type Props = {
    room: IRoom
}
const RoomInfoCard = ({ room }: Props) => {
    return (
        <div className='room-card'>
            <div className='group relative'>
                <div className='w-full h-full absolute group-hover:opacity-100 transition-all opacity-0 flex items-center justify-center'>
                    <Link href={route('rooms.show', [room.id])} className='btn-outlined bg-primary/50 btn'>
                        View Details
                    </Link>
                </div>
                <img src={room.image ?? ''} className='w-full lg:h-[360px] h-[200px] object-cover' alt="" />
            </div>
            <div className="mt-4">
                <div className="flex items-center">
                    <HeadingTitle reverse width="w-12" className='me-auto'>
                        <p className='uppercase text-2xl font-medium font-serif'>{room.name}</p>
                    </HeadingTitle>
                    <p className="font-sans font-medium lg:text-xl text-lg">{formatToCurrency(room.price)} / night</p>
                </div>
                <div className="mt-4">
                    <ul className="flex flex-wrap gap-6">
                        <li className='flex items-end gap-2 text-secondary'>
                            <span className='m-icon'>bed</span>
                            <span>{room.beds} beds</span>
                        </li>
                        <li className='flex items-end gap-2 text-secondary'>
                            <span className='m-icon'>group</span>
                            <span>{room.min_people} - {room.max_people} people</span>
                        </li>
                    </ul>
                </div>
                {/* <div className="mt-6">
                    <Link href={route('rooms.show', [room.id])} className='btn-outlined text-gray-800 hover:text-white btn'>
                        Book Now
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

export default RoomInfoCard
