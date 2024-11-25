import HeadingTitle from '@/Components/shared/HeadingTitle'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import TextInput from '@/Components/shared/TextInput'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import AdminLayout from '@/Layouts/AdminLayout'
import { IExtraAmenity } from '@/types/models'
import { Link, useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'

type Props = {
    extraAmenity: IExtraAmenity
}
const EditExtraAmenity = ({ extraAmenity }: Props) => {
    const { data, setData, put } = useForm<{id:number, name: string, price: string | number }>({
        id: extraAmenity.id,
        name: extraAmenity.name,
        price: extraAmenity.price
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.extra_amenities.update',[extraAmenity.id]));
    }
    return (
        <AdminLayout
            navbarIcon='concierge'
            navbarTitle={(
                <p className='lg:text-xl font-serif font-semibold'>
                    Extra Amenities / Edit
                </p>
            )}
        >
            <section className="py-5">
                <div className="w-full lg:w-2/4 mx-auto">
                    <HeadingTitle>
                        <p className="mb-2 text-2xl font-serif font-semibold">Edit Amenity</p>
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

export default EditExtraAmenity
