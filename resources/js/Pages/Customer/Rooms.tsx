import HeroSection from '@/Components/shared/HeroSection'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import RoomInfoCard from '@/Components/shared/RoomInfoCard'
import AppLayout from '@/Layouts/CustomerLayout'
import { IPaginatedData, IRoom } from '@/types/models'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

type Props = {
    rooms: IPaginatedData<IRoom>
}

const Rooms = ({ rooms }: Props) => {
    return (
        <AppLayout>
            <Head title='Rooms' />

            <HeroSection
                title='Our Rooms'
                image='/images/rooms-hero-image.jpg'
                eyebrow='Private Stays'
                description='Browse room options for quiet getaways, family stays, and larger private bookings at Cool Point.'
            />

            <section className='bg-white py-24 md:py-32'>
                <div className="container-padded">
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                        <div>
                            <p className="customer-eyebrow">Stay Selection</p>
                            <h1 className="customer-section-title mt-5">
                                Spaces designed for short escapes and longer group stays.
                            </h1>
                        </div>

                        <div className="rounded-[30px] border border-slate-200 bg-slate-50/80 p-6">
                            <p className="text-sm leading-7 text-slate-600">
                                Each room includes the comfort and flexibility needed for resort stays. Browse current options, compare room capacity, and open details for booking information.
                            </p>
                            <Link
                                href={route('availability.index')}
                                className="customer-link mt-5"
                            >
                                Search by dates
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-10">
                        {rooms.data.map((room) => (
                            <RoomInfoCard room={room} key={room.id} />
                        ))}
                    </div>

                    {rooms.total > rooms.per_page && (
                        <div className="mt-14 flex justify-center gap-3">
                            <PrimaryButtonLink
                                disabled={rooms.prev_page_url == null}
                                href={rooms.prev_page_url ?? ''}
                                className='rounded-full border border-slate-300 bg-white px-6 py-3 text-sm text-slate-800 hover:bg-slate-100'
                            >
                                Previous
                            </PrimaryButtonLink>
                            <PrimaryButtonLink
                                disabled={rooms.next_page_url == null}
                                href={rooms.next_page_url ?? ''}
                                className='rounded-full border border-slate-900 bg-slate-900 px-6 py-3 text-sm text-white hover:bg-slate-800'
                            >
                                Next
                            </PrimaryButtonLink>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}

export default Rooms
