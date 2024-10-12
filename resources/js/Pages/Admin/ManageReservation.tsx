import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AdminLayout from '@/Layouts/AdminLayout'
import { asset, fetchFile, formatToCurrency } from '@/lib/utils'
import { IReservation, IReservationStatus, IRoom } from '@/types/models'
import { Link, router } from '@inertiajs/react'
import clsx from 'clsx'
import { formatDate } from 'date-fns'
import { FormEvent, useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Button } from '@/Components/ui/button'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'

type Props = {
    reservation: IReservation
}
const ManageReservation = ({ reservation }: Props) => {
    const [reason, setReason] = useState('');


    function handleRejectPayment(e: FormEvent): void {
        e.preventDefault();
        alert('pppaspasa')
        if (reservation.payment) {
            router.put(route('admin.payments.update', [reservation.payment.id]), {
                ...reservation.payment,
                status: "Rejected",
                notes: reason
            });
        }
    }

    return (
        <AdminLayout
            navbarIcon='book'
            navbarTitle="Reservation Details"
        >
            <section className='py-5'>
                <button onClick={() => history.back()} className='flex items-center gap-2 text-secondary font-medium'>
                    <span className="m-icon">arrow_back</span>
                    <span>Reservations</span>
                </button>
                <div className='mt-4 grid grid-cols-3'>
                    <div className="">
                        <p className=' text-sm'>Reservation No</p>
                        <p className='text-lg mt-1 text-secondary font-medium'>#{reservation.reservation_no}</p>
                    </div>
                    <div className="">
                        <p className=' text-sm'>Reservation Type</p>
                        <p className='text-lg mt-1 text-secondary font-medium capitalize'>{reservation.type}</p>
                    </div>
                    <div className="">
                        <p className=' text-sm'>Status</p>
                        <p className={clsx('py-2 px-3 mt-1 text-xs rounded-lg flex items-center w-max', {
                            'bg-gray-300 text-gray-700': reservation.status == IReservationStatus.PENDING,
                            'bg-primary text-white': reservation.status == IReservationStatus.CONFIRMED,
                            'bg-red-700 text-white': reservation.status == IReservationStatus.CANCELLED,
                        })}>
                            <span>{reservation.status}</span>
                            {reservation.status == IReservationStatus.CONFIRMED && (
                                <span className='m-icon filled text-xs ms-2'>check_circle</span>
                            )}
                        </p>
                    </div>
                </div>
                <div className="mt-5">
                    <p className='text-sm font-normal'>Check In - Check Out</p>
                    <div className="flex mt-2 items-end">
                        <div className="flex items-end">
                            <h2 className="xl:text-5xl md:text-3xl text-2xl me-2 font-medium">
                                {formatDate(reservation.date_from ?? "", "dd")}
                            </h2>
                            <h4 className="lg:text-2xl md:text-xl text-lg font-serif font-medium text-nowrap">
                                /
                                {formatDate(reservation.date_from ?? "", "MMMM")}
                            </h4>
                        </div>
                        <div className="lg:mx-4 mx-1 lg:block hidden">
                            <span className="m-icon text-primary">
                                remove
                            </span>
                        </div>
                        <div className="flex items-end">
                            <h2 className="xl:text-5xl md:text-3xl text-2xl me-2 font-medium">
                                {formatDate(reservation.date_to ?? "", "dd")}
                            </h2>
                            <h4 className="lg:text-2xl md:text-xl text-lg font-serif font-medium text-nowrap">
                                /
                                {formatDate(reservation.date_to ?? "", "MMMM")}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <p className='text-base font-medium text-gray-800'>Customer Details</p>
                    <Table className='mt-3'>
                        <TableHeader>
                            <TableRow className=''>
                                <TableHead className='border xl:w-1/4 w-2/4'>Customer</TableHead>
                                <TableHead className='border'>Email Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className='border text-base font-medium'>
                                    <div className="flex gap-3 items-center">
                                        <img src={reservation.user.photo ? asset(reservation.user.photo) : '/images/account.jpg'} className='rounded-full object-cover object-top' width={60} height={60} alt="" />
                                        <div>
                                            <p>{reservation.user.name}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='border text-base font-medium'>{reservation.user.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {reservation.payment && (
                    <div className="mt-8">
                        <p className='text-base font-medium text-gray-800'>Payment Details</p>
                        <Table className='mt-3'>
                            <TableHeader>
                                <TableRow className=''>
                                    <TableHead className='border xl:w-1/4 w-2/4'>Payment No.</TableHead>
                                    <TableHead className='border'>Payment Method</TableHead>
                                    <TableHead className='border xl:w-2/4'>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='border text-base font-medium'>#{reservation.reservation_no}</TableCell>
                                    <TableCell className='border text-base font-medium capitalize'>{reservation.payment.method}</TableCell>
                                    <TableCell className='border text-base font-medium '>
                                        <span>{reservation.payment.status}</span>
                                        {reservation.payment.method == 'gcash' && reservation.payment.status == 'Completed' && (
                                            <span className='ms-1 text-secondary'>
                                                - Pending for your confirmation
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {reservation.payment.method == 'gcash' && reservation.payment.status == 'Completed' && (
                            <div className="mt-8">
                                <p className='text-base font-medium text-gray-800 mb-2'>Attached proof of payment</p>
                                <div className="flex gap-4 items-center">
                                    <img src={`/files/${reservation.payment.receipt}`} className='object-cover w-1/6' alt="" />
                                    <div className='bg-gray-50 border rounded-lg w-max p-5'>
                                        <p className='text-gray-700 text-sm '>This payment is pending for your confirmation.</p>
                                        <p className="mt-1 font-medium">Please confirm if the payment has been received:</p>
                                        <div className="mt-3 flex gap-3">
                                            {/* confirm payment dialog */}
                                            <Dialog>
                                                <DialogTrigger className='text-green-700 font-semibold'>Confirm</DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This will set the payment as confirmed.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="ghost">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <Button type="submit">Confirm</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            {/* reject payment dialog */}
                                            <Dialog>
                                                <DialogTrigger className='text-red-700 font-semibold'>Reject</DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Rejecting payment</DialogTitle>
                                                        <DialogDescription>
                                                            This will set the payment as reject.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-2">
                                                        <Label>Reason / Note:</Label>
                                                        <Textarea required value={reason} onChange={e => setReason(e.target.value)} />
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="ghost">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <Button onClick={handleRejectPayment} disabled={reason == ''} type="button">Submit</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </AdminLayout>
    )
}

export default ManageReservation
