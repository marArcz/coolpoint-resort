import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { ChangeEvent, FormEvent, useRef, MouseEvent, useState, MouseEventHandler } from 'react'
import { IAddRoom } from '@/types/models'
import { Input } from '@/Components/ui/input'
import TextInput from '@/Components/shared/TextInput'
import { Textarea } from '@/Components/ui/textarea'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink'

const AddNewRoom = () => {
    const mainPhotoInputRef = useRef(null);
    const additionalPhotosInputRef = useRef<HTMLInputElement | null>(null);
    const [amenity, setAmenity] = useState('')

    const { data, setData, post, errors, processing } = useForm<IAddRoom>({
        main_photo: null,
        additional_photos: [],
        name: '',
        min_people: '',
        max_people: '',
        price: '',
        double_decks: '',
        beds: '',
        description: '',
        amenities: [],
        time_in:'',
        time_out:''
    });

    const onClickAddPhotoBtn = (e: MouseEvent) => {
        if (additionalPhotosInputRef.current) {
            additionalPhotosInputRef.current.click();
        }
    }

    function handleAddPhotos(event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            setData('additional_photos', [
                ...data.additional_photos,
                ...event.target.files
            ])
        }
    }

    const handleRemovePhoto = (photo: File) => {
        setData('additional_photos', data.additional_photos.filter(f => f != photo));
    }

    function handleAddAmenity() {
        setData('amenities', [
            ...data.amenities,
            amenity
        ]);
        setAmenity('');
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        post(route('admin.rooms.store'),{forceFormData:true});
    }


    function handleRemoveAmenity(index: number) {
        setData('amenities', data.amenities.filter((v, i) => i != index))
    }

    return (
        <AdminLayout
            navbarIcon='bed'
            navbarTitle={(
                <div className='flex items-center'>
                    <span className='xl:text-2xl md:text-lg font-serif font-medium'>Rooms</span>
                    <span className='m-icon'>chevron_right</span>
                    <span className='xl:text-2xl md:text-lg font-serif font-medium'>Add New Room</span>
                </div>
            )}
        >
            <section className='py-5'>
                <form onSubmit={handleSubmit}>
                    <p className='font-medium'>Room Details</p>
                    <div className="flex md:flex-row flex-col mt-3 mb-3 gap-5">
                        <div className='md:w-1/4'>
                            <div>
                                <img src={data.main_photo ? URL.createObjectURL(data.main_photo) : "/images/image-placeholder.png"} className='w-full object-cover object-top' alt="" />
                            </div>
                            <Input required onChange={e => setData('main_photo', e.target.files?.item(0) ?? null)} type='file' id='mainPhoto' className='mt-3 cursor-pointer' placeholder='Upload Image' />
                            {/* <label htmlFor='mainPhoto' className='w-full p-3 cursor-pointer bg-primary block mt-3 text-white rounded-lg text-center'>Upload Photo</label> */}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row gap-5">
                                <div className="flex-1">
                                    <TextInput required className='w-full' floatingLabel value={data.name} onChange={e => setData('name', e.target.value)} placeholder='Room Label' />
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <TextInput min={0} required type='number' className='w-full' floatingLabel value={data.min_people} onChange={e => setData('min_people', e.target.value)} placeholder='Min People' />
                                    <TextInput min={0} required type='number' className='w-full' floatingLabel value={data.max_people} onChange={e => setData('max_people', e.target.value)} placeholder='Max People' />
                                </div>
                            </div>
                            <div className="flex mt-7 flex-col md:flex-row gap-5">
                                <div className="flex-1">
                                    <TextInput required type='number' className='w-full' floatingLabel value={data.price} onChange={e => setData('price', e.target.value)} placeholder='Price / Rate Per Day' />
                                </div>
                                <div className="flex-1 grid grid-cols-1 gap-3">
                                    {/* <TextInput min={0} required type='number' className='w-full' floatingLabel value={data.double_decks} onChange={e => setData('double_decks', e.target.value)} placeholder='No. of double decks' /> */}
                                    <TextInput min={0} required type='number' className='w-full' floatingLabel value={data.beds} onChange={e => setData('beds', e.target.value)} placeholder='No. of beds' />
                                </div>
                            </div>
                            <div className="flex mt-7 flex-col md:flex-row gap-5">
                                <div className="flex-1">
                                    <TextInput required type='time' className='w-full' floatingLabel value={data.time_in} onChange={e => setData('time_in', e.target.value)} placeholder='Time in' />
                                </div>
                                <div className="flex-1 grid grid-cols-1 gap-3">
                                    {/* <TextInput min={0} required type='number' className='w-full' floatingLabel value={data.double_decks} onChange={e => setData('double_decks', e.target.value)} placeholder='No. of double decks' /> */}
                                    <TextInput required type='time' className='w-full' floatingLabel value={data.time_out} onChange={e => setData('time_out', e.target.value)} placeholder='Time out' />
                                </div>
                            </div>
                            <div className="mt-5">
                                <label className='text-gray-600 text-sm'>Room Description</label>
                                <Textarea rows={4} value={data.description} onChange={e => setData('description', e.target.value)} className='mt-1' placeholder='Describe room...' />
                            </div>
                            <div className="mt-3 border-2 border-dashed border-gray-200 p-4">
                                <p className="text-gray-600">Addtional Photos</p>
                                <div className="images-row gap-2 grid xl:grid-cols-5 md:grid-cols-2 grid-cols-2 mt-3 w-full">
                                    {data.additional_photos && data.additional_photos.map((file, index) => (
                                        <div key={index} className='relative'>
                                            <div className="w-full h-full bg-gray-500/0 top-0 left-0 absolute">
                                                <button type='button' onClick={() => handleRemovePhoto(file)} className='text-white size-12 bg-gray-700/40 hover:bg-gray-700/80 '>
                                                    <span className='m-icon text-sm'>delete</span>
                                                </button>
                                            </div>
                                            <img src={URL.createObjectURL(file)} className='h-32 object-cover object-top' alt="" />
                                        </div>
                                    ))}
                                </div>
                                <input type="file" className='hidden' ref={additionalPhotosInputRef} onChange={handleAddPhotos} aria-hidden="true" />
                                <OutlinedButton bg='bg-secondary' type='button' onClick={onClickAddPhotoBtn} className='text-sm mt-3'>Add Photo</OutlinedButton>
                            </div>
                            <div className="mt-3 border-2 border-dashed border-gray-200 p-4">
                                <p className="text-gray-600">Room amenities</p>
                                <div className="flex w-full flex-row items-center mt-3">
                                    <TextInput value={amenity} onChange={e => setAmenity(e.target.value)} placeholder='Amenity eg. airconditioned' className='w-full ' containerClassName='flex-1' />
                                    <PrimaryButton bg='bg-secondary' disabled={amenity == ''} onClick={handleAddAmenity} type='button'>Add</PrimaryButton>
                                </div>
                                {data.amenities && data.amenities.length > 0 && (
                                    <hr className="my-3" />
                                )}
                                <div className="flex flex-col gap-3">
                                    {data.amenities && data.amenities.map((amenity, index) => (
                                        <div key={index} className=" bg-secondary text-white border border-gray-200 px-5 py-3 flex">
                                            <p className="my-0">{amenity}</p>
                                            <button onClick={() => handleRemoveAmenity(index)} type='button' className='ms-auto'>
                                                <span className="m-icon text-base">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5 flex items-center gap-5">
                                <OutlineButtonLink bg='bg-secondary' className='w-max' href={route('admin.rooms.index')}>
                                    Cancel
                                </OutlineButtonLink>
                                <PrimaryButton className='w-max' type='submit'>
                                    Save New Room
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </AdminLayout>
    )
}

export default AddNewRoom
