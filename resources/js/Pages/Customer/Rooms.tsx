import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import RoomInfoCard from '@/Components/shared/RoomInfoCard'
import AppLayout from '@/Layouts/AppLayout'
import { formatToCurrency } from '@/lib/utils'
import { IPaginatedData, IRoom } from '@/types/models'
import { Head, Link } from '@inertiajs/react'

type Props = {
    rooms: IPaginatedData<IRoom>
}

const Rooms = ({ rooms }: Props) => {
    console.log(rooms)
    return (
        <AppLayout>
            <Head title='Rooms' />
            <HeroSection title='Rooms' image='/images/rooms-hero-image.jpg' />
            <section className='py-24 container-padded'>
                <HeadingTitle>
                    <p className='font-serif font-semibold lg:text-4xl text-3xl'>Our Rooms</p>
                </HeadingTitle>
                <div className="mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {
                            rooms.data && rooms.data.map((room, index) => (
                                <RoomInfoCard room={room} key={room.id} />
                            ))
                        }
                    </div>
                </div>
                {rooms.total > rooms.per_page && (
                    <>
                        {/* pagination control */}
                        <div className="justify-center mt-3 gap-2 flex">
                            <PrimaryButtonLink disabled={rooms.prev_page_url == null} href={rooms.prev_page_url ?? ''} className=' w-max' >Prev</PrimaryButtonLink>
                            <PrimaryButtonLink disabled={rooms.next_page_url == null} href={rooms.next_page_url ?? ''} className=' w-max' >Next</PrimaryButtonLink>
                        </div>
                    </>
                )}
            </section>
        </AppLayout>
    )
}

export default Rooms
