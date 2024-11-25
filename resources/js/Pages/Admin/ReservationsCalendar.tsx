import AdminLayout from '@/Layouts/AdminLayout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IReservation, IReservationStatus } from '@/types/models'
import { Button } from '@/Components/ui/button'
import clsx from 'clsx'
import { EventClickArg } from '@fullcalendar/core/index.js'
import { formatToCurrency } from '@/lib/utils'
import { formatDate } from 'date-fns'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';

type Props = {
    reservations: IReservation[]
}

const ReservationsCalendar = ({ reservations: reservationList }: Props) => {
    console.log('reservations: ', reservationList)
    const [reservations, setReservations] = useState<IReservation[]>(reservationList);
    const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)


    const fetchReservations = () => {
        axios.get<IReservation[]>(route('api.reservations.index'), { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setReservations(res.data);
            })
    }

    function handleEventClick(arg: EventClickArg): void {
        let reservationDetails = arg.event._def.extendedProps as IReservation;
        setSelectedReservation(reservationDetails);
        setShowDetailsModal(true)
    }

    function handleCloseModal(): void {
        setShowDetailsModal(false);
        setSelectedReservation(null);
    }

    return (
        <AdminLayout
            navbarIcon='book'
            navbarTitle='Reservations'
        >
            <section className='py-5'>
                <FullCalendar
                    plugins={[dayGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={reservations.map((reservation) => {
                        let title = reservation.type == 'room' ? reservation.room?.name + ' reservation' : 'Resort Reservation'
                        return {
                            title,
                            start: reservation.date_from,
                            end: reservation.date_to,
                            backgroundColor: "#657372",
                            borderColor: "#d4d4d4",
                            className: 'px-3 py-1 rounded-lg cursor-pointer',
                            extendedProps: {
                                ...reservation
                            },
                        };
                    })}
                    eventClick={handleEventClick}
                />
                {/* modal */}
                <div onClick={handleCloseModal} className={clsx('modal transition-all absolute w-full h-screen box-border z-[8888] bg-gray-900/40 top-0 left-0 flex justify-center items-center', {
                    'hidden': !showDetailsModal
                })}>
                    <div className="bg-white xl:w-2/4 xl:h-3/4 w-full h-full xl:rounded-lg rounded-none p-6 border-t-4 border-t-primary animate-in animate-out flex flex-col">
                        {selectedReservation && (
                            <>
                                <div className='flex-1'>
                                    <div className='flex justify-between items-center'>
                                        <h4 className='text-gray-500 text-nowrap'>Reservation Details</h4>
                                        <Button onClick={handleCloseModal} variant="ghost" className='float-right size-8 p-0 rounded-full'>
                                            <span className='m-icon text-lg text-gray-500'>close</span>
                                        </Button>
                                    </div>
                                    <div className="mt-5">
                                        <div className='flex justify-between'>
                                            <div>
                                                <div className="">
                                                    <p className=' text-sm'>Reservation No</p>
                                                    <p className='text-xl mt-1 text-secondary font-medium'>#{selectedReservation.reservation_no}</p>
                                                </div>
                                                <div className="mt-5">
                                                    <p className=' text-sm'>Reservation Type</p>
                                                    <p className='text-xl mt-1 text-secondary font-medium capitalize'>{selectedReservation.type}</p>
                                                </div>
                                                <div className="mt-5">
                                                    <p className=' text-sm'>Total</p>
                                                    <p className='text-xl mt-1 text-secondary font-medium capitalize'>{formatToCurrency(selectedReservation.total)}</p>
                                                </div>
                                                <div className="mt-5">
                                                    <p className='text-sm font-normal'>Check In - Check Out</p>
                                                    <div className="flex mt-2 items-end">
                                                        <div className="flex items-end">
                                                            <h2 className="xl:text-4xl md:text-3xl text-2xl me-2 font-medium">
                                                                {formatDate(selectedReservation.date_from ?? "", "dd")}
                                                            </h2>
                                                            <h4 className="lg:text-2xl md:text-xl text-lg font-serif font-medium text-nowrap">
                                                                /
                                                                {formatDate(selectedReservation.date_from ?? "", "MMMM")}
                                                            </h4>
                                                        </div>
                                                        <div className="lg:mx-4 mx-1 lg:block hidden">
                                                            <span className="m-icon text-primary">
                                                                remove
                                                            </span>
                                                        </div>
                                                        <div className="flex items-end">
                                                            <h2 className="xl:text-4xl md:text-3xl text-2xl me-2 font-medium">
                                                                {formatDate(selectedReservation.date_to ?? "", "dd")}
                                                            </h2>
                                                            <h4 className="lg:text-2xl md:text-xl text-lg font-serif font-medium text-nowrap">
                                                                /
                                                                {formatDate(selectedReservation.date_to ?? "", "MMMM")}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className={clsx('py-2 px-3 text-sm rounded-lg flex items-center', {
                                                    'bg-gray-300 text-gray-700': selectedReservation.status == IReservationStatus.PENDING,
                                                    'bg-primary text-white': selectedReservation.status == IReservationStatus.CONFIRMED,
                                                    'bg-red-700 text-white': selectedReservation.status == IReservationStatus.CANCELLED,
                                                })}>
                                                    <span>{selectedReservation.status}</span>
                                                    {selectedReservation.status == IReservationStatus.CONFIRMED && (
                                                        <span className='m-icon filled text-sm ms-2'>check_circle</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-end flex gap-3 items-center'>
                                    <OutlinedButton onClick={handleCloseModal} bg='bg-secondary/55' className=' rounded-lg'>Close</OutlinedButton>
                                    <PrimaryButtonLink href={route('admin.reservations.show', [selectedReservation.id])} bg='bg-secondary' className='w-full rounded-lg text-center justify-center'>Manage</PrimaryButtonLink>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </AdminLayout>
    )
}

export default ReservationsCalendar
