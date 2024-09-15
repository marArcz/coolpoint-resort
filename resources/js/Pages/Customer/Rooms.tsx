import HeadingTitle from '@/Components/shared/HeadingTitle'
import HeroSection from '@/Components/shared/HeroSection'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import AppLayout from '@/Layouts/AppLayout'
import { Link } from '@inertiajs/react'

const Rooms = () => {
    return (
        <AppLayout>
            <HeroSection title='Rooms' image='/images/rooms-hero-image.jpg' />
            <section className='py-24 container-padded'>
                <HeadingTitle>
                    <p className='font-serif font-semibold text-2xl'>Family Rooms</p>
                </HeadingTitle>
                <div className="mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className=''>
                            <div className='group relative'>
                                <div className='w-full h-full absolute group-hover:opacity-100 transition-all opacity-0 flex items-center justify-center'>
                                    <Link href={route('customer.reservations.create')} className='btn-outlined bg-primary/50 btn'>
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
                            <div className='group relative'>
                                <div className='w-full h-full absolute group-hover:opacity-100 transition-all opacity-0 flex items-center justify-center'>
                                    <Link href={route('customer.reservations.create')} className='btn-outlined bg-primary/50 btn'>
                                        Book Now
                                    </Link>
                                </div>
                                <img src="/images/rooms/room-2.jpg" className='w-full lg:h-[360px] h-[200px] object-cover' alt="" />
                            </div>
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
