import React, { FormEvent, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import PrimaryButton from './shared/PrimaryButton'
import { ICancellationRequest, IPayment, IUpdatePayment } from '@/types/models'
import { formatToCurrency } from '@/lib/utils'
import DropdownSelect from './shared/DropdownSelect'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { router, useForm } from '@inertiajs/react'
import { error } from 'console'

type Props = {
    cancellationRequest: ICancellationRequest;
    payment: IPayment
}
const ProcessRefundDialog = ({ cancellationRequest, payment }: Props) => {
    const [image, setImage] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files?.[0] ?? null);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // post(route('admin.payments.update', [payment.id]), {
        //     preserveState: false,
        // });

        router.post(route('admin.payments.update', [payment.id]), {
            ...payment,
            is_refunded: true,
            is_refundable: true,
            _method: 'put',
            image
        }, {
            preserveState: false,
        })

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <PrimaryButton className='rounded-lg text-sm mt-5 p-2'>Process refund</PrimaryButton>
            </DialogTrigger>
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Process Refund</DialogTitle>
                    <DialogDescription>Return payment</DialogDescription>
                </DialogHeader>
                <div className="py-3">
                    <form onSubmit={handleSubmit}>
                        <div className="rounded-lg bg-gray-200 p-4">
                            <p className="text-gray-700 text-sm">Customer Refunding Details</p>
                            <div className="mt-5 flex">
                                <div className='flex-1'>
                                    <p className="text-gray-700">Gcash Account Name:</p>
                                    <p className='font-medium mt-1'>{cancellationRequest.gcash_account_name}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700">Gcash Account Number:</p>
                                    <p className='font-medium mt-1'>{cancellationRequest.gcash_number}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <p>Amount to refund: </p>
                            <p className="mt-2 text-xl font-semibold text-gray-700">{formatToCurrency(payment.amount)}</p>
                            <p className="mt-4">
                                Send the amount to refund to the customer’s Gcash account above
                            </p>
                        </div>

                        <div className="mt-4">
                            <Label>Attach screenshot or receipt:</Label>
                            <Input onChange={handleFileChange} required className='mt-2' type='file' />
                        </div>
                        <div className="mt-4 text-end">
                            <PrimaryButton type='submit' className='rounded-lg'>Submit</PrimaryButton>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProcessRefundDialog
