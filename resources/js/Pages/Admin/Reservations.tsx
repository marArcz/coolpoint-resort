import AdminLayout from '@/Layouts/AdminLayout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import React, { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { ICursorPaginatedData, IPaginatedData, IReservation, IReservationStatus } from '@/types/models'
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
import { Link, useForm } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import CustomSelect from '@/Components/CustomSelect';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible"
import ReservationsTable from '@/Components/ReservationsTable';

type Props = {
    reservations: IPaginatedData<IReservation>;
    month?: number | string;
    type?: string;
    status?: string;
    years?: string[]
    year?: number | string;
}

const Reservations = ({ reservations, month = '', type = '', status = '', year = '', years = [] }: Props) => {
    const hasFilter = (): boolean => (month != '' || type != '' || status != '' || year != '');

    const [selectedReservation, setSelectedReservation] = useState<IReservation | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [fetchingReservations, setFetchingReservations] = useState<boolean>(false)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [showFilterControl, setShowFilterControl] = useState(hasFilter())
    const { data, setData, get } = useForm({
        month,
        type,
        status,
        year
    })

    function handleCloseModal(): void {
        setShowDetailsModal(false);
        setSelectedReservation(null);
    }

    const handleFilterFormSubmit = (e: FormEvent) => {
        e.preventDefault()
        get(route('admin.reservations.index'))
    }


    return (
        <AdminLayout
            navbarIcon='book'
            navbarTitle='Reservations'
        >
            <section className='py-5 h-full lg:overflow-hidden lg:flex lg:flex-col'>
                {hasFilter() && (
                    <div className="border p-4 mb-2 bg-secondary rounded-lg text-white">
                        <p className='text-sm text-gray-400'>Active Filter</p>
                        <div className="mt-2 flex gap-4">
                            {year != '' && (
                                <div>
                                    <p>Year: <span className='capitalize'>{year}</span></p>
                                </div>
                            )}
                            {month != '' && (
                                <div>
                                    <p>Month: <span>{months[Number(month) - 1]}</span></p>
                                </div>
                            )}
                            {type != '' && (
                                <div>
                                    <p>Type: <span className='capitalize'>{type}</span></p>
                                </div>
                            )}
                            {status != '' && (
                                <div>
                                    <p>Status: <span className='capitalize'>{status}</span></p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <Collapsible open={showFilterControl} onOpenChange={(o) => setShowFilterControl(o)} className='py-2 w-full'>
                    <CollapsibleTrigger className={clsx('px-4 py-1 transition-all flex gap-2 items-center rounded-xl', {
                        'bg-primary/70 text-white': showFilterControl,
                        'bg-transparent text-primary': !showFilterControl,
                    })}>
                        <span className='m-icon'>filter_list</span>
                        <span>Filter</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='py-3'>
                        <form onSubmit={handleFilterFormSubmit}>
                            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2  w-full gap-2 items-center pb-3">
                                <div className="">
                                    <CustomSelect
                                        id='year'
                                        active={year != ''}
                                        label='Year'
                                        value={data.year}
                                        onChange={e => setData('year', e.target.value)}
                                    >
                                        <option value="">Any</option>
                                        {years && years.map((year, index) => (
                                            <option key={index} value={year}>{year}</option>
                                        ))}
                                        {years && years.length == 0 && (
                                            <option value={new Date().getFullYear()} selected>{new Date().getFullYear()}</option>
                                        )}
                                    </CustomSelect>
                                </div>
                                <div className="">
                                    <CustomSelect
                                        id='month'
                                        active={month != ''}
                                        label='Month'
                                        value={data.month}
                                        onChange={e => setData('month', e.target.value)}
                                    >
                                        <option value="">Any</option>
                                        {months.map((month, index) => (
                                            <option key={index} value={index + 1}>{month}</option>
                                        ))}
                                    </CustomSelect>
                                </div>
                                <div className="">
                                    <CustomSelect
                                        id='type'
                                        active={type != ''}
                                        label='Type'
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                    >
                                        <option value="">Any</option>
                                        <option value="room">Room</option>
                                        <option value="resort">Resort</option>
                                    </CustomSelect>
                                </div>
                                <div className="">
                                    <CustomSelect
                                        id='status'
                                        active={status != ''}
                                        label='Status'
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="">Any</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </CustomSelect>
                                </div>
                                <div className=''>
                                    <div className="flex gap-1">
                                        <Link href={route('admin.reservations.index')} className='rounded-md text-gray-800 text-center bg-gray-300 font-medium py-2 px-10 border-gray-800 flex-1'>
                                            Clear
                                        </Link>
                                        <button type='submit' className='rounded-md bg-primary text-white font-medium py-2 px-10 border-gray-800 flex-1'>
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CollapsibleContent>
                </Collapsible>

                {/* table */}
                <ReservationsTable reservations={reservations} />

                {/* pagination controls */}
                {reservations && reservations.total > reservations.per_page && (
                    <div className="justify-center gap-3 flex pt-5">
                        <Link disabled={reservations.prev_page_url == null} href={reservations.prev_page_url ?? ''} className={clsx('rounded-xl hover:bg-primary size-10 text-white flex justify-center items-center', {
                            'bg-primary/40 pointer-events-none': reservations.prev_page_url == null,
                            'bg-primary/90': reservations.prev_page_url != null
                        })} >
                            <span className="m-icon text-sm ">chevron_left</span>
                        </Link>
                        <div className="flex gap-2">
                            {reservations.links.length > 4 && reservations.links.map((link, index) => {
                                if ((index >= reservations.current_page - 2 && index <= reservations.current_page + 2) && (index != 0 && index != reservations.links.length - 1)) {
                                    return (
                                        <Link key={index} disabled={link.url == null || link.active} href={link.url ?? ''} className={clsx('rounded-xl size-10 flex justify-center items-center', {
                                            'bg-secondary/40 text-primary pointer-events-none border-b-2 border-b-primary': link.url == null || link.active,
                                            'bg-secondary text-white': link.url != null || !link.active,
                                        })} >
                                            <span className="text-sm" dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Link>
                                    )
                                }
                                return null
                            })}
                        </div>
                        <Link disabled={reservations.next_page_url == null} href={reservations.next_page_url ?? ''} className={clsx('rounded-xl hover:bg-primary size-10 text-white flex justify-center items-center', {
                            'bg-primary/40 pointer-events-none': reservations.next_page_url == null,
                            'bg-primary/90': reservations.next_page_url != null
                        })} >
                            <span className="m-icon text-sm">chevron_right</span>
                        </Link>
                    </div>
                )}
            </section>
        </AdminLayout>
    )
}

export default Reservations
