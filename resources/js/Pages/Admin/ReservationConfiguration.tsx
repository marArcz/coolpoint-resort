import HeadingTitle from '@/Components/shared/HeadingTitle'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import AdminLayout from '@/Layouts/AdminLayout'
import { asset } from '@/lib/utils'
import { IReservationConfiguration, IUpdateReservationConfiguration } from '@/types/models'
import { useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'

type Props = {
    reservationConfiguration: IReservationConfiguration
};

const ReservationConfiguration = ({ reservationConfiguration }: Props) => {
    console.log('configuration: ', reservationConfiguration)
    const { data, setData, post } = useForm<IUpdateReservationConfiguration & { _method: string }>({
        gcash_qr_code: null,
        gcash_account_no: reservationConfiguration.gcash_account_no,
        gcash_account_name: reservationConfiguration.gcash_account_name,
        resort_rate: reservationConfiguration.resort_rate,
        _method: 'put'
    })

    const { data: rateFormData, setData: setRateFormData, put: putRateForm } = useForm<{ resort_rate: string | number }>({
        resort_rate: reservationConfiguration.resort_rate
    });


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.reservation_configurations.update', [reservationConfiguration.id]), {
            preserveState: false,
        });
    }
    const handleRateFormSubmit = (e:FormEvent) => {
        e.preventDefault();
        putRateForm(route('admin.reservation_configurations.update', [reservationConfiguration.id]), {
            preserveState: false,
        });
    }

    return (
        <AdminLayout
            navbarIcon='settings'
            navbarTitle='Settings'
        >
            <HeadingTitle reverse>
                <p className="text-lg text-primary font-medium">GCash Account For Receiving Payments</p>
            </HeadingTitle>
            <div className="mt-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 lg:w-1/4 md:w-2/4 w-3/4">
                        <img src={asset(reservationConfiguration.gcash_qr_code)} alt="" className='w-full object-contain object-left h-52' />
                        <div className="mt-2">
                            <Label className='mb-2'>GCash QR Code</Label>
                            <p className="text-sm mb-1 text-gray-400">Leave blank if you don't want to change this.</p>
                            <Input type='file' className='' accept='image/*' onChange={e => setData('gcash_qr_code', e.target.files?.item(0) ?? null)} />
                        </div>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-8">
                        <div>
                            <Label className=''>GCash phone number</Label>
                            <Input type='text' className='mt-1' value={data.gcash_account_no} onChange={e => setData('gcash_account_no', e.target.value)} />
                        </div>
                        <div>
                            <Label className=''>GCash account name</Label>
                            <Input type='text' className='mt-1' value={data.gcash_account_name} onChange={e => setData('gcash_account_name', e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <PrimaryButton bg='bg-gray-500' type='reset' className='rounded-lg text-gray-700 text-sm'>Reset</PrimaryButton>
                        <PrimaryButton type="submit" className='rounded-lg text-sm'>Save</PrimaryButton>
                    </div>
                </form>
            </div>

            <div className="mt-8">
                <HeadingTitle>
                    <p className="text-lg text-primary font-medium">Resort Reservation</p>
                </HeadingTitle>
                <div className="mt-3">
                    <form onSubmit={handleRateFormSubmit}>
                        <div className="mb-3">
                            <Label className='text-base'>Resort reservation rate:</Label>
                            <Input required  type='number' value={rateFormData.resort_rate} onChange={e => setRateFormData('resort_rate',e.target.value)} className='mt-1' placeholder='Rate per night' />
                        </div>
                        <div className="mt-8 flex justify-end gap-3">
                            <PrimaryButton bg='bg-gray-500' type='reset' className='rounded-lg text-gray-700 text-sm'>Reset</PrimaryButton>
                            <PrimaryButton type="submit" className='rounded-lg text-sm'>Save</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ReservationConfiguration
