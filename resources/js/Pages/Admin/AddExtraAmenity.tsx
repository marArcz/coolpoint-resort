import HeadingTitle from '@/Components/shared/HeadingTitle'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import TextInput from '@/Components/shared/TextInput'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import AdminLayout from '@/Layouts/AdminLayout'
import { Link, useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'

const AddExtraAmenity = () => {
    const { data, setData, post } = useForm<{ name: string, price: string | number }>({
        name: '',
        price: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.extra_amenities.store'));
    }
    return (
        <AdminLayout
            navbarIcon='concierge'
            navbarTitle={(
                <div className='flex items-center'>
                    <span className='xl:text-2xl md:text-lg font-serif font-medium'>Extra Amenities</span>
                    <span className='m-icon'>chevron_right</span>
                    <span className='xl:text-2xl md:text-lg font-serif font-medium'>Add New</span>
                </div>
            )}
        >
            <section className="py-5">
                <div className="w-full lg:w-2/4 mx-auto">
                    <HeadingTitle>
                        <p className="mb-2 text-2xl font-serif font-semibold">Add New Amenity</p>
                    </HeadingTitle>
                    <div className="mt-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <Label>Name of amenity</Label>
                                <TextInput className='mt-1 w-full rounded-lg' value={data.name} onChange={e => setData('name', e.target.value)} type='text' required />
                            </div>
                            <div className="mb-3">
                                <Label>Price</Label>
                                <TextInput className='w-full rounded-lg' value={data.price} onChange={e => setData('price', e.target.value)} type='number' required />
                            </div>
                            <div className="flex justify-end gap-3">
                                <PrimaryButtonLink href={route('admin.extra_amenities.index')} className='mt-4 rounded-lg' bg='bg-gray-500'>Cancel</PrimaryButtonLink>
                                <PrimaryButton className='mt-4 rounded-lg'>Save Amenity</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AdminLayout>
    )
}

export default AddExtraAmenity
