import DashboardCard from '@/Components/DashboardCard'
import { useAdmin, useAdminContext } from '@/context/AdminContext'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"


const Dashboard = () => {
    return (
        <AdminLayout
            navbarIcon='home'
            navbarTitle='Dashboard'
        >
            <Head title='Dashboard' />
            <section className='py-5'>
                <p>Reservation Statistics</p>
                <div className="mt-3 grid gap-3 md:grid-cols-3 grid-cols-1">
                    <DashboardCard
                        icon="group"
                        label='Confirmed Reservations'
                        value='12'
                    />
                    <DashboardCard
                        icon="payment"
                        label='Online Payments Pending for Approval'
                        value='12'
                    />
                    <DashboardCard
                        icon="group"
                        label='Reservations'
                        value='12'
                    />
                </div>

                <div className="mt-10">
                    <p>Latest Reservations</p>
                    <div className="mt-3 border rounded-[30px] p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Reservation Type</TableHead>
                                    <TableHead>Check In</TableHead>
                                    <TableHead>Check Out</TableHead>
                                    <TableHead>Payment</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
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
