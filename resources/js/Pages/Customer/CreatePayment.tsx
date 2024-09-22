import HeadingTitle from '@/Components/shared/HeadingTitle'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import AppLayout from '@/Layouts/AppLayout'
import { formatToCurrency, getTotalNights } from '@/lib/utils'
import { IReservation } from '@/types/models'
import { useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'

type Props = {
    reservation: IReservation
}
const CreatePayment = ({ reservation }: Props) => {
    const settings = {
        name: "John Doe",
        qrcode: "/images/gcash-qr.png",
        phone: "09123456789"
    };
    const resortRate = 10000;
    const totalBill = getTotalNights(reservation.date_from, reservation.date_to) * (reservation.room?.price ?? resortRate);

    const { data, setData, post } = useForm<{ receipt: File | null, amount: number }>({
        receipt: null,
        amount: totalBill
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("reservations.payment.store", [reservation.id]));
    }

    return (
        <AppLayout>
            <section className="py-12 container-padded">
                <HeadingTitle reverse>
                    <h1 className='text-2xl lg:text-3xl font-serif font-semibold'>Process Payment</h1>
                </HeadingTitle>

                <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-14">
                    <div className="col-span-full lg:col-span-3">
                        <img src={settings.qrcode} className='lg:w-full w-2/4 object-cover' alt="" />
                        <div className="mt-4 px-2">
                            <p className="font-medium ">Number: {settings.phone}</p>
                            <p className="font-medium mt-2">Account Name: {settings.name}</p>
                        </div>
                    </div>
                    <div className="col-span-full lg:col-span-9">
                        <h4 className='text-2xl font-medium'>Pay using GCash</h4>
                        <p className='mt-3'>Open your GCash app and scan the qr code or enter the phone number to pay. Make sure to send the exact amount equal to the total bill of your reservation.</p>
                        <hr className="my-3" />
                        <div className="p-5 bg-white border">
                            <div className="flex items-center justify-between">
                                <p className='text-lg font-medium'>Reservation No:</p>
                                <p className='text-lg font-medium'>#{reservation.reservation_no}</p>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <p className='text-lg font-medium'>Total Bill:</p>
                                <p className='text-lg font-medium'>{formatToCurrency(totalBill)}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <form onSubmit={handleSubmit}>
                                <Label className='text-base' htmlFor='receipt'>Upload the payment receipt or a screenshot as proof of your payment.</Label>
                                <Input id="receipt" type="file" className='mt-3' onChange={e => setData('receipt', e.target.files?.item(0) ?? null)} />

                                <div className="mt-14 flex items-center gap-2">
                                    <Checkbox required id="checkbox-confirm"/>
                                    <Label htmlFor='checkbox-confirm' className='text-base text-secondary'>I affirm the validity of the attached proof of payment and that I have paid the correct amount.</Label>
                                </div>

                                <PrimaryButton disabled={data.receipt == null} type='submit' className='w-full mt-5 text-center justify-center'>Submit</PrimaryButton>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default CreatePayment
