import { useForm } from '@inertiajs/react'
import React, { ChangeEvent, FormEvent, useRef } from 'react'
import OutlinedButton from './shared/OutlinedButton'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from './ui/input'
import PrimaryButton from './shared/PrimaryButton'
import { IRoom } from '@/types/models'
import { asset } from '@/lib/utils'
import ConfirmLink from './ConfirmLink'

type Props = {
    room: IRoom
}
const EditRoomAdditionalPhotos = ({ room }: Props) => {
    const { data, setData, post } = useForm<{ photo: File | null }>({
        photo: null,
    })
    const onsubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.rooms.room_images.store', [room.id]), {
            preserveState: false,
        });
    }
    return (
        <div className='flex flex-col'>
            <div className="images-row gap-2 grid xl:grid-cols-5 md:grid-cols-2 grid-cols-2 mt-3 w-full flex-1">
                {room.images && room.images.map((image, index) => (
                    <div key={index} className='relative rounded overflow-hidden'>
                        <div className="w-full h-full bg-gray-500/0 top-0 left-0 absolute">
                            <ConfirmLink href={route('admin.room_images.destroy', [image.id])} method='delete' as='button' type='button' bg='bg-red-800' className='text-white w-max rounded'>
                                <span className='m-icon text-sm'>delete</span>
                            </ConfirmLink>
                        </div>
                        <img src={asset(image.uri)} className='h-32 object-cover object-top' alt="" />
                    </div>
                ))}
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <OutlinedButton bg='bg-secondary' type='button' className='text-sm mt-3'>Add Photo</OutlinedButton>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Photo</DialogTitle>
                        <DialogDescription>
                            Additional Photo
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-3">
                        <form onSubmit={onsubmit}>
                            {data.photo && (
                                <img src={data.photo ? URL.createObjectURL(data.photo) : ''} className='w-full h-[40vh] object-cover object-top rounded' alt="" />
                            )}
                            <Input required onChange={e => setData('photo', e.target.files?.item(0) ?? null)} type='file' id='mainPhoto' className='mt-3 cursor-pointer' placeholder='Upload Image' />

                            <div className="mt-10 flex gap-10 justify-end">
                                <DialogClose>Cancel</DialogClose>
                                <PrimaryButton className='rounded-lg' type='submit'>Submit</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditRoomAdditionalPhotos
