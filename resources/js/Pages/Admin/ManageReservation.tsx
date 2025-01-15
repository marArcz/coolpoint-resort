import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AdminLayout from '@/Layouts/AdminLayout'
import { asset, cn, fetchFile, formatToCurrency } from '@/lib/utils'
import { IReservation, IReservationStatus, IRoom } from '@/types/models'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { format, formatDate } from 'date-fns'
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
import CustomSelect from '@/Components/CustomSelect'
import { useMediaQuery } from 'usehooks-ts'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import clsx from 'clsx'
import ConfirmButton from '@/Components/ConfirmButton'
import ReservationStatusMessage from '@/Components/ReservationStatusMessage'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import ProcessRefundDialog from '@/Components/ProcessRefundDialog'
import ImageDialog from '@/Components/ImageDialog'
import ConfirmLink from '@/Components/ConfirmLink'

type Props = {
    reservation: IReservation
}
const ManageReservation = ({ reservation }: Props) => {
    console.log(reservation);
    const [reason, setReason] = useState('');

    const { data, setData, put } = useForm({
        status: reservation.status
    });
    function handleRejectPayment(e: FormEvent): void {
        e.preventDefault();
        if (reservation.payments?.[0]) {
            router.put(route('admin.payments.update', [reservation.payments[0].id]), {
                ...reservation.payments[0],
                status: "Rejected",
                notes: reason
            });
        }
    }

    function handleConfirmPayment(): void {
        if (reservation.payments?.[0]) {
            router.put(route('admin.payments.update', [reservation.payments[0].id]), {
                ...reservation.payments[0],
                status: "Confirmed",
                notes: 'Valid'
            });
        }
    }

    function handleApproveReservation() {
        router.put(route('admin.reservations.update', [reservation.id]), {
            status: IReservationStatus.APPROVED
        });
    }

    function handleDeclineReservation(): void {
        router.put(route('admin.reservations.update', [reservation.id]), {
            status: IReservationStatus.DECLINED
        });
    }

    function handleUpdateStatus(e: FormEvent): void {
        e.preventDefault()
        put(route('admin.reservations.update', [reservation.id]), { preserveState: false })

    }

    const handleApproveCancellation = () => {
        if (reservation.cancellation_request) {
            router.put(route('admin.cancellation_requests.approve', [reservation.cancellation_request.id]));
        }
    }

    return (
        <AdminLayout
            navbarIcon='book'
            navbarTitle="Reservation Details"
        >
            <Head title='Reservation Details' />
            <section className='py-5'>
                <button onClick={() => history.back()} className='flex items-center gap-2 text-secondary font-medium'>
                    <span className="m-icon">arrow_back</span>
                    <span>Reservations</span>
                </button>
                {reservation.status != IReservationStatus.CANCELLED && reservation.payments?.[0] && reservation.payments[0].status == 'Pending' ? (
                    <>
                        <div className={`bg-amber-700/20 px-4 py-3 rounded-lg mt-2`}>
                            <p className="font-medium text-amber-700 flex items-center gap-2 md:text-base text-sm">
                                <span className='m-icon'>info</span>
                                <span>Payment has been sent</span>
                            </p>
                        </div>
                        <div className="flex mt-3 p-6 bg-gray-100 rounded-lg items-center gap-3">
                            <div>
                                <p>Attached proof of payment</p>
                                <ImageDialog dialogTitle='Attached Receipt' imageUrl={`/files/${reservation.payments[0].receipt}`} className='mt-4'>
                                    <img src={`/files/${reservation.payments[0].receipt}`} className='object-cover h-[250px] rounded-md' alt="" />
                                </ImageDialog>
                            </div>
                            <div className='bg-gray-50 border h-max rounded-lg w-max p-5'>
                                <p className='text-gray-700 text-sm '>This payment is pending for your confirmation.</p>
                                <p className="mt-1 font-medium">Please confirm if the payment has been received:</p>

                                <div className="mt-3 flex gap-2">
                                    <ConfirmButton className='py-0 rounded-lg' onClick={handleConfirmPayment}>
                                        Confirm
                                    </ConfirmButton>
                                    {/* reject payment dialog */}
                                    <Dialog>
                                        <DialogTrigger className='text-white px-6 py-3 rounded-lg bg-red-600 font-medium'>
                                            Reject
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Rejecting payment</DialogTitle>
                                                <DialogDescription>
                                                    Enter reason for rejecting payment
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="py-2">
                                                <Textarea placeholder='Reason / note...' required value={reason} onChange={e => setReason(e.target.value)} />
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
                    </>
                ) : (
                    <>
                        {reservation.status != IReservationStatus.PENDING && (
                            <ReservationStatusMessage status={reservation.mStatus} className='mt-2' />
                        )}
                    </>
                )}
                {reservation.cancellation_request && reservation.status == IReservationStatus.CANCELLED && (
                    <div className=" mt-3 mb-10">
                        <div className="mt-4">
                            {reservation.payments?.[0] && reservation.isPaid ? (
                                <>
                                    <p className="font-semibold text-secondary ">Payment Refund Status</p>
                                    <div className="mt-2 p-5 bg-secondary rounded-lg">
                                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-5 items-center'>
                                            <div>
                                                <p className="text-white">{reservation.payments[0].type == 'full' ? 'Full Payment' : 'Down Payment'}</p>
                                                <p className='text-gray-300'>Type</p>
                                            </div>
                                            <div>
                                                <p className="text-white">{formatToCurrency(reservation.payments[0].amount)}</p>
                                                <p className='text-gray-300'>Amount</p>
                                            </div>
                                            <div>
                                                <p className="border text-white p-3 border-dashed w-max ">{reservation.payments[0].is_refundable ? 'REFUNDABLE' : 'NON-REFUNDABLE'}</p>
                                            </div>
                                            {reservation.payments[0].is_refundable == true && (
                                                <div>
                                                    <p className="text-white uppercase">{reservation.payments[0].is_refunded ? 'Refunded' : 'Pending'}</p>
                                                    {reservation.payments[0].is_refunded && (
                                                        <ImageDialog
                                                            imageUrl={`/files/${reservation.payments[0].proof_of_refund}`}
                                                            dialogTitle='Attached proof of refund'
                                                            className='text-gray-300 underline underline-offset-4 text-base'
                                                        >
                                                            Attached proof of refund
                                                        </ImageDialog>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {reservation.payments[0].is_refundable && !reservation.payments[0].is_refunded && (
                                            <ProcessRefundDialog payment={reservation.payments[0]} cancellationRequest={reservation.cancellation_request} />
                                        )}
                                    </div>

                                </>
                            ) : (
                                <div>
                                    <p>No Payment to refund</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {reservation.cancellation_request && reservation.cancellation_request.status == "Pending" && (
                    <div className="rounded-lg bg-secondary/80 p-4 mt-3">
                        <p className="font-semibold text-white">Cancellation request</p>
                        <p className="text-sm text-gray-200">{formatDate(reservation.cancellation_request.created_at, 'MMM dd, yyyy')}</p>

                        <div className="mt-4 p-4 bg-white rounded-lg">
                            <p className='text-secondary font-medium'>Reason</p>
                            <p className="mt-1 text-secondary">{reservation.cancellation_request.reason}</p>
                        </div>
                        <div className="mt-4">
                            {reservation.isPaid && reservation.payments?.[0] && (
                                <>
                                    <p className="font-semibold text-white">Payment Refund</p>
                                    <div className="mt-4 p-5 bg-secondary rounded-lg ">
                                        <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
                                            <div>
                                                <p className="text-white">{reservation.payments[0].type == 'full' ? 'Full Payment' : 'Down Payment'}</p>
                                                <p className='text-gray-300'>Type</p>
                                            </div>
                                            <div>
                                                <p className="text-white">{formatToCurrency(reservation.payments[0].amount)}</p>
                                                <p className='text-gray-300'>Amount</p>
                                            </div>
                                            <div>
                                                <p className="border text-white p-3 border-dashed w-max ">{reservation.payments[0].is_refundable ? 'REFUNDABLE' : 'NON-REFUNDABLE'}</p>
                                            </div>
                                            {reservation.payments[0].is_refundable == true && (
                                                <div>
                                                    <p className="text-white uppercase">{reservation.payments[0].is_refunded ? 'Refunded' : 'Pending'}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="mt-3 text-white">
                            <p className='text-end'>Approving this means the reservation will be cancelled and process refunds if needed.</p>
                        </div>
                        <div className="flex items-center justify-end gap-5 mt-8">
                            <Link href='#' className="text-sm text-white">Decline</Link>
                            <ConfirmButton onClick={handleApproveCancellation} className="text-sm rounded-full w-max">Approve</ConfirmButton>
                        </div>
                    </div>
                )}

                {reservation.status == IReservationStatus.PENDING && (
                    <div className="flex justify-end mt-5 gap-2 rounded">
                        <Dialog>
                            <DialogTrigger className='inline-flex items-center bg-primary rounded-lg hover:bg-primary/90  px-5 py-3 border-0 font-light text-white tracking-widest disabled:pointer-events-none active:scale-105 active:bg-primary-900 focus:outline-none focus:ring-0 ring-0 focus:ring-primary focus:ring-offset-2 transition ease-in duration-150'>
                                Approve
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This reservation will be approved.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="ghost">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="button" onClick={handleApproveReservation}>Confirm</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger className='inline-flex items-center bg-red-600 rounded-lg hover:bg-red-500  px-5 py-3 border-0 font-light text-white tracking-widest disabled:pointer-events-none active:scale-105 active:bg-primary-900 focus:outline-none focus:ring-0 ring-0 focus:ring-primary focus:ring-offset-2 transition ease-in duration-150'>
                                Decline
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='text-red-600'>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This reservation will be declined.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="ghost">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="button" onClick={handleDeclineReservation}>Confirm</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
                <div className='mt-6 grid md:grid-cols-3 grid-cols-2 gap-y-4'>
                    <div className="">
                        <p className=' text-sm'>Reservation No</p>
                        <p className='text-lg mt-1 text-secondary font-medium'>#{reservation.reservation_no}</p>
                    </div>
                    <div className="">
                        <p className=' text-sm'>Reservation Type</p>
                        <p className='text-lg mt-1 text-secondary font-medium capitalize'>{reservation.type}</p>
                    </div>
                    <div className="">
                        <p className='mb-1 text-sm'>Status</p>
                        <Dialog>
                            <DialogTrigger disabled={reservation.isPaid}>
                                <div className={`reservation-status-badge ${reservation.status.toLowerCase()} ${reservation.isPaid && reservation.payments?.[0]?.type == 'full' ? 'paid' : ''}`}>
                                    {reservation.status == IReservationStatus.APPROVED ? (
                                        reservation.isPaid ? (
                                            (reservation.payments?.length == 1 ? (
                                                <>
                                                    <span>Partial Payment</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Paid</span>
                                                    <span className='m-icon filled text-xs ms-2'>check_circle</span>
                                                </>
                                            ))
                                        ) : (
                                            <>
                                                <span>Slot Reserved</span>
                                            </>
                                        )
                                    ) : (
                                        <span>{reservation.status}</span>
                                    )}
                                    {!reservation.isPaid && (
                                        <span className='m-icon filled text-xs ms-2'>keyboard_arrow_down</span>
                                    )}
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Update Reservation Status</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleUpdateStatus}>
                                    <div className="py-3">
                                        <CustomSelect value={data.status} onChange={e => setData('status', e.target.value)}>
                                            <option value={IReservationStatus.APPROVED}>{IReservationStatus.APPROVED}</option>
                                            <option value={IReservationStatus.DECLINED}>{IReservationStatus.DECLINED}</option>
                                            <option value={IReservationStatus.CANCELLED}>{IReservationStatus.CANCELLED}</option>
                                            <option value={IReservationStatus.COMPLETED}>{IReservationStatus.COMPLETED}</option>
                                            <option value={IReservationStatus.NO_SHOW}>{IReservationStatus.NO_SHOW}</option>
                                        </CustomSelect>
                                    </div>
                                    <DialogFooter className='gap-3 pt-3'>
                                        <DialogClose>Cancel</DialogClose>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="md:mt-5 mt-8 grid md:grid-cols-3 grid-cols-1 gap-y-6">
                    <div className="">
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
                            <div className="lg:mx-4 mx-1">
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
                    <div className=" col-span-1">
                        <p className=' text-sm'>Reserved on</p>
                        <p className='text- mt-1 font-medium uppercase'>{format(reservation.created_at, 'MMM dd, yyyy')} @{format(reservation.created_at, 'hh:ii a')}</p>
                    </div>
                    <div className=" col-span-1">
                        <p className=' text-sm'>Remaining Balance</p>
                        <p className='text- mt-1 font-medium uppercase'>{formatToCurrency(reservation.balance)}</p>
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
                                    <div className="flex flex-wrap text-center md:justify-start justify-center gap-3 items-center">
                                        <img src={reservation.user.photo ? asset(reservation.user.photo) : '/images/account.jpg'} className='rounded-full object-cover object-top size-10 md:size-14 ' alt="" />
                                        <div>
                                            <p>{reservation.user.firstname} {reservation.user.lastname}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='border text-sm md:text-base font-medium'>{reservation.user.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {reservation.type == 'room' && reservation.room && (
                    <div className="mt-8">
                        <p className='text-base font-medium text-gray-800'>Room Details</p>
                        <Table className='mt-3'>
                            <TableHeader>
                                <TableRow className=''>
                                    <TableHead className='border xl:w-1/4 w-2/4'>Room</TableHead>
                                    <TableHead className='border'>Rate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='border text-base font-medium'>
                                        <div className="flex flex-wrap gap-3 items-center">
                                            <img src={asset(reservation.room.image)} className='rounded-sm object-cover object-top md:w-[100px] md:h-[100px]' alt="" />
                                            <div>
                                                <p>{reservation.room.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='border text-base font-medium'>{formatToCurrency(reservation.room.price)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
                <div className="mt-8">
                    <p className='text-lg font-semibold text-gray-800'>Payment Details</p>
                    {reservation.payments?.[0] ? (
                        <div>
                            <Table className='mt-3'>
                                <TableHeader>
                                    <TableRow className=''>
                                        <TableHead className='border xl:w-1/4 w-2/4'>Payment No.</TableHead>
                                        <TableHead className='border'>Payment Method</TableHead>
                                        <TableHead className='border'>Status</TableHead>
                                        <TableHead className='border'>Attached proof of payment</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='border text-base font-medium'>#{reservation.reservation_no}</TableCell>
                                        <TableCell className='border text-base font-medium capitalize'>{reservation.payments[0].method}</TableCell>
                                        <TableCell className='border text-base font-medium '>
                                            <span className={cn({
                                                'text-red-500': reservation.payments[0].status == 'Rejected'
                                            })}>{reservation.payments[0].status}</span>
                                            {reservation.payments[0].status == 'Completed' && (
                                                <span className='ms-1 text-secondary'>
                                                    - Pending for your confirmation
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className='py-2'>
                                            <Dialog>
                                                <DialogTrigger className='text-base'>Click to view attachment</DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Attached proof of payment</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="py-3">
                                                        <img src={`/files/${reservation.payments[0].receipt}`} className='object-cover mx-auto h-[60vh]' alt="" />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            {reservation.payments[0].status == 'Completed' && (
                                <div className="mt-8">
                                    <p className='text-base font-medium text-gray-800 mb-2'>Attached proof of payment</p>
                                    <div className="flex gap-4 items-center">
                                        <img src={`/files/${reservation.payments[0].receipt}`} className='object-cover w-1/6' alt="" />
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
                                                            <Button type="button" onClick={handleConfirmPayment}>Confirm</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {reservation.payment_method == 'cash' && reservation.isPaid && reservation.balance > 0 && (
                                <div className="mt-3">
                                    <PrimaryButtonLink className='w-max' href={route('admin.reservation.payments.create', [reservation.id])}>Add Payment</PrimaryButtonLink>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <p>No payment has been made yet.</p>
                            {reservation.status == 'confirmed' && (
                                <p className='text-sm'>Customer can process payment once you approved this reservation.</p>
                            )}
                        </>
                    )}
                </div>
            </section>
        </AdminLayout>
    )
}

export default ManageReservation
