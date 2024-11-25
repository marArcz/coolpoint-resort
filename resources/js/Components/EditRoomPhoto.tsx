import { useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'
import OutlinedButton from './shared/OutlinedButton'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from './ui/input'
import PrimaryButton from './shared/PrimaryButton'
import { IRoom } from '@/types/models'

type Props = {
    room: IRoom
}
const EditRoomPhoto = ({ room }: Props) => {
    const { data, setData,post } = useForm<{ photo: File | null,_method:string }>({
        photo: null,
        _method:'put'
    })
    const onsubmit = (e:FormEvent) => {
        e.preventDefault();
        post(route('admin.rooms.update',[room.id]),{
            preserveState:false,
        });
    }
    return (
        <div className=''>
            <img src={room.image} className='w-full object-cover object-top rounded' alt="" />
            {/* <Input required onChange={e => setData('main_photo', e.target.files?.item(0) ?? null)} type='file' id='mainPhoto' className='mt-3 cursor-pointer' placeholder='Upload Image' /> */}
            <Dialog>
                <DialogTrigger asChild>
                    <OutlinedButton bg='bg-secondary' type='button' className='text-sm mt-3'>Change Photo</OutlinedButton>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Photo</DialogTitle>
                        <DialogDescription>
                            Main photo
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-3">
                        <form onSubmit={onsubmit}>
                            <img src={data.photo ? URL.createObjectURL(data.photo): room.image} className='w-full h-[40vh] object-cover object-top rounded' alt="" />
                            <Input required onChange={e => setData('photo', e.target.files?.item(0) ?? null)} type='file' id='mainPhoto' className='mt-3 cursor-pointer' placeholder='Upload Image' />

                            <div className="mt-10 flex justify-end">
                                <PrimaryButton className='rounded' type='submit'>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditRoomPhoto
