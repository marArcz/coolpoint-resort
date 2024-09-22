import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import RoomInfoCard from '@/Components/shared/RoomInfoCard'
import AppLayout from '@/Layouts/AppLayout'
import { formatToCurrency } from '@/lib/utils'
import { IRoom } from '@/types/models'
import { Head, Link } from '@inertiajs/react'

type Props = {
    rooms: IRoom[]
}

const Rooms = ({ rooms }: Props) => {

    return (
        <AppLayout>
            <Head title='Rooms'/>
            <HeroSection title='Rooms' image='/images/rooms-hero-image.jpg' />
            <section className='py-24 container-padded'>
                <HeadingTitle>
                    <p className='font-serif font-semibold lg:text-4xl text-3xl'>Our Rooms</p>
                </HeadingTitle>
                <div className="mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {
                            rooms && rooms.map((room, index) => (
                               <RoomInfoCard room={room} key={room.id}/>
                            ))
                        }
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default Rooms
