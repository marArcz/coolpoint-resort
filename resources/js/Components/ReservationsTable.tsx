import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { IPaginatedData, IReservation, IReservationStatus } from '@/types/models'
import { Link, router } from '@inertiajs/react'
import { formatDate } from 'date-fns'
import { formatToCurrency } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { MoreHorizontal } from 'lucide-react'

type Props = {
    reservations: IPaginatedData<IReservation>
}
const ReservationsTable = ({ reservations }: Props) => {
    return (
        <Table className='mt-3 align-middle'>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className='text-nowrap whitespace-nowrap'>Check In - Check Out</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className='hidden md:flex items-center'>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reservations && reservations.data.map((reservation) => (
                    <TableRow key={reservation.id} className='align-middle items-center'>
                        <TableCell className='text-base'>
                            <Link href={route('admin.reservations.show', [reservation.id])} className='text-secondary whitespace-nowrap'>
                                {reservation.reservation_no}
                            </Link>
                        </TableCell>
                        <TableCell className='capitalize text-base'>
                            <div className="flex gap-2 items-center flex-wrap lg:justify-start justify-center text-center">
                                <img src={reservation.user?.photo ?? '/images/account.jpg'} className='rounded-full' alt="" width={40} height={40} />
                                <p className='text-sm whitespace-nowrap'>{reservation.user?.name ?? 'unknown'}</p>
                            </div>
                        </TableCell>
                        <TableCell className='capitalize text-base'>{formatDate(reservation.date_from, 'yyyy')}, {formatDate(reservation.date_from, 'MMM dd')} - {formatDate(reservation.date_to, 'MMM dd')}</TableCell>
                        <TableCell className='capitalize text-base'>{reservation.type}</TableCell>
                        <TableCell className='hidden md:inline-flex capitalize text-base'>{formatToCurrency(reservation.total)}</TableCell>
                        <TableCell className='capitalize text-base'>
                            {reservation.status != IReservationStatus.CANCELLED && reservation.cancellation_request && reservation.cancellation_request.status == 'Pending' ? (
                                <span className={`reservation-status-badge pending`}>Cancellation Requested</span>
                            ) : (
                                <span className={`reservation-status-badge ${reservation.status.toLowerCase()} ${reservation.isPaid ? 'paid' : 'unpaid'}`}>{reservation.status} {reservation.status == 'Approved'? (reservation.isPaid ? '- paid' : '- unpaid'):''}</span>
                            )}

                        </TableCell>
                        <TableCell>
                            {/* <Link className='flex size-10 items-center justify-center text-gray-600 hover:bg-gray-200 rounded-lg transition-all' href={route('admin.reservations.show', [reservation.id])}>
                                <span className="m-icon text-lg ">settings</span>
                            </Link> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {reservation.status == 'Pending' && (
                                        <>
                                            <DropdownMenuItem>
                                                <Link
                                                    as='button'
                                                    method='put'
                                                    data={{ status: 'Approved' }}
                                                    href={route('admin.reservations.update', [reservation.id])}>
                                                    Approve
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link
                                                    as='button'
                                                    method='put'
                                                    data={{ status: 'Declined' }}
                                                    href={route('admin.reservations.update', [reservation.id])}>
                                                    Declined
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    <DropdownMenuItem>
                                        <Link href={route('admin.reservations.show', [reservation.id])}>
                                            Manage Reservation
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
                {reservations.data.length == 0 && (
                    <TableRow>
                        <TableCell colSpan={7} className='text-center'>No data in the table.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default ReservationsTable
