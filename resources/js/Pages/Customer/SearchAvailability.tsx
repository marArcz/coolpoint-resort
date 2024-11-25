import AvailabilityCheckCard from '@/Components/shared/AvailabilityCheckCard';
import HeadingTitle from '@/Components/shared/HeadingTitle';
import RoomBookingCard from '@/Components/shared/RoomBookingCard';
import RoomInfoCard from '@/Components/shared/RoomInfoCard';
import AppLayout from '@/Layouts/CustomerLayout'
import { IPaginatedData, IRoom } from '@/types/models'
import { Link, router } from '@inertiajs/react';
import { addDays, formatDate } from 'date-fns';
import React from 'react'
import { DateRange } from 'react-day-picker';

type Props = {
    rooms?: IPaginatedData<IRoom>;
    dateFrom?: Date
    dateTo?: Date,
    adults?: number,
    children?: number,
    isResortAvailable?: boolean
}

const SearchAvailability = ({ rooms, dateFrom = new Date(), dateTo = addDays(new Date, 3), adults = 3, children = 1, isResortAvailable = false }: Props) => {

    const handleSearchAvailability = (selectedDate: DateRange, adults: number, children: number) => {
        router.get(route('availability.index'), {
            date_from: selectedDate.from,
            date_to: selectedDate.to,
            adults,
            children
        });
    }

    return (
        <AppLayout>
            <section className='py-12 container-padded'>
                <HeadingTitle reverse>
                    <h3 className='lg:text-4xl md:text-3xl text-2xl font-serif font-semibold'>
                        <span className='m-icon md:text-3xl text-2xl me-3'>search</span>
                        <span>Search Availability</span>
                    </h3>
                </HeadingTitle>

                <div className="mt-8">
                    <AvailabilityCheckCard
                        defaultDate={{
                            from: dateFrom,
                            to: dateTo
                        }}
                        defaultAdults={adults}
                        defaultChildren={children}
                        onSubmit={handleSearchAvailability}
                    />
                </div>
                <div className="mt-10">
                    <h5 className='font-serif text-2xl font-semibold'>Book the entire resort?</h5>
                    <p className='font-light text-xl mt-4'>
                        Resort reservation availability ({formatDate(dateFrom, "MMM. dd, yyyy")} - {formatDate(dateTo, "MMM. dd, yyyy")}): <span className='text-primary font-semibold'>{isResortAvailable ? 'Available' : 'Not available'}</span>
                    </p>
                    {isResortAvailable ? (
                        <Link href={route('resort_reservation',{dateFrom,dateTo,adults,children})} className='underline text-lg block font-medium mt-5'>Click here to book entire resort</Link>
                    ) : (
                        <Link href={route('resort_reservation')} className='underline text-lg block mt-5'>See available dates</Link>
                    )}
                </div>

                {rooms && (
                    <>
                        <hr className="my-14" />
                        <h3 className='text-center text-4xl font-serif font-semibold capitalize'>Available rooms</h3>
                        <div className="mt-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                {
                                    rooms?.data && rooms.data.map((room, index) => (
                                        <RoomInfoCard
                                            href={route('rooms.show', {
                                                room: room.id,
                                                date_from:dateFrom,
                                                date_to:dateTo,
                                                adults,
                                                children
                                            })}
                                            room={room}
                                            key={room.id}
                                            />
                                    ))
                                }
                            </div>
                            {
                                rooms.data?.length == 0 && (
                                    <p className='text-center text-secondary text-lg'>Sorry no available rooms found.</p>
                                )
                            }
                        </div>
                    </>
                )}
            </section>
        </AppLayout>
    )
}

export default SearchAvailability
