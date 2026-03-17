import DashboardCard from '@/Components/DashboardCard'
import { useAdmin, useAdminContext } from '@/context/AdminContext'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { ICancellationRequest, IPayment, IReservation } from '@/types/models'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { echo } from '@/echo'
import { PusherEvent } from 'pusher-js/types/src/core/connection/protocol/message-types'
import { useApprovedReservationsStore, usePendingReservationsStore } from '@/lib/stores'
import { formatDate } from 'date-fns'
import DashboardCards from '@/Components/DashboardCards'

const Dashboard = () => {
    const { data: approvedReservations, fetching: fetchingReservations, fetchAll: fetchReservations } = useApprovedReservationsStore();
    const [newPayments, setNewPayments] = useState<IPayment[]>([]);
    const { toast } = useToast();
    const { user } = usePage().props.auth;

    return (
        <AdminLayout
            navbarIcon='home'
            navbarTitle='Dashboard'
        >
            <Head title='Dashboard' />
            <section className='py-5'>
                <p>Reservation Statistics</p>
                <DashboardCards/>
                <div className="mt-10">
                    <p>Latest Reservations</p>
                    <div className="mt-3 border rounded-3xl p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Reservation Type</TableHead>
                                    <TableHead>Check In</TableHead>
                                    <TableHead>Check Out</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {approvedReservations && approvedReservations.map((reservation) => (
                                    <TableRow key={reservation.id}>
                                        <TableCell>{reservation.reservation_no}</TableCell>
                                        <TableCell>{reservation.user.firstname } {reservation.user.lastname}</TableCell>
                                        <TableCell>{reservation.type_description}</TableCell>
                                        <TableCell>{formatDate(reservation.date_from,'MMM d, yyyy')}</TableCell>
                                        <TableCell>{formatDate(reservation.date_to,'MMM d, yyyy')}</TableCell>
                                        <TableCell>{reservation.status}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={6} className='text-center font-light text-sm'>
                                        No data to show in the table
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>
        </AdminLayout>
    )
}

export default Dashboard
