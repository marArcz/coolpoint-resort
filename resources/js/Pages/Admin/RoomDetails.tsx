import HeadingTitle from '@/Components/shared/HeadingTitle'
import AdminLayout from '@/Layouts/AdminLayout'
import { asset } from '@/lib/utils'
import { IRoom } from '@/types/models'
import clsx from 'clsx'
import React, { useState } from 'react'

type Props = {
    room: IRoom
}
const RoomDetails = ({ room }: Props) => {
    const [mainImage, setMainImage] = useState(room.image);

    return (
        <AdminLayout
            navbarIcon='bed'
            navbarTitle="Room Details"
        >
            <section className='py-5'>
                <p>Room Details</p>
                <img src={asset(mainImage)} alt="" className='w-full h-[60vh] object-cover mt-3 rounded-lg' />
                <div className="mt-3 flex gap-2">
                    <img
                        src={asset(room.image)}
                        onClick={() => setMainImage(room.image)}
                        alt=""
                        className={clsx('object-cover transition-all border-2 fade-in-5 animate-in object-center size-20 rounded-lg cursor-pointer hover:opacity-80', {
                            'border-primary/80 opacity-80': room.image == mainImage
                        })}
                    />
                    {room.images.map((image) => (
                        <img
                            key={image.id}
                            src={asset(image.uri)}
                            onClick={() => setMainImage(image.uri)}
                            alt={room.name + " image"}
                            className={clsx('object-cover transition-all object-center border-2 size-20 rounded-lg cursor-pointer hover:opacity-80', {
                                'border-primary/80 opacity-80': image.uri == mainImage
                            })}
                        />
                    ))}
                </div>
                <div className="mt-7">
                    <div className="">
                        <h1 className='font-serif font-semibold text-4xl text-primary'>{room.name}</h1>
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
                        {room.amenities && room.amenities.length > 0 && (
                            <>
                                <p className='mt-3'>Amenities</p>
                                <ul className="flex flex-wrap gap-y-6 gap-x-14 mt-2 list-disc px-5">
                                    {
                                        room.amenities.map((amenity, index) => (
                                            <li key={amenity.id} className='text-lg font-l px-0'>{amenity.name}</li>
                                        ))
                                    }
                                </ul>
                            </>
                        )}
                        <div className="mt-4">
                            <p className='font-medium text-primary text-lg'>Room Description</p>
                            <p className='font-normal text-gray-600 text-justify mt-2'>{room.description}</p>
                        </div>
                    </div>
                    {/* reservations */}
                    <div className="mt-10">
                        <HeadingTitle reverse>
                            <h1 className=' text-xl font-medium text-secondary flex items-center gap-2'>
                                <span className="m-icon filled">book</span>
                                <span>Reservations</span>
                            </h1>
                        </HeadingTitle>
                        <ul className="mt-4 flex flex-col flex-wrap gap-3">
                            {room.reservations && room.reservations.map((reservation, index) => (
                                <li className='border-b pb-2'>
                                    <p className='text-secondary'>{reservation.reservation_no}</p>
                                    <p className='text-secondary text-sm'>{reservation.status}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </AdminLayout>
    )
}

export default RoomDetails
