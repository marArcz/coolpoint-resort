import AdminLayout from '@/Layouts/AdminLayout'
import React, { FormEvent } from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { asset } from '@/lib/utils'
import TextInput from '@/Components/shared/TextInput'
import { IUpdateProfile } from '@/types/models'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from '@/Components/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import { Input } from '@/Components/ui/input'
const Profile = () => {
    const { auth } = usePage().props

    const { data, setData, post } = useForm<IUpdateProfile & { _method: string }>({
        photo: null,
        name: auth.user?.name || '',
        _method: 'put'
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (auth.user) {
            post(route('admin.profile.update', [auth.user.id]), {
                preserveState: false
            });
        }
    }

    return (
        <AdminLayout
            navbarIcon='person'
            navbarTitle='Account Profile'
        >
            <section className="py-5">
                <div className="relative w-max">
                    <img src={auth.user ? `/files/${auth.user.photo}` : asset('images/account.jpg')} className='size-28 object-cover rounded-full' alt="Profile Picture" />
                    <div className="absolute bg-gray-400/40 opacity-0 hover:opacity-100 transition-all rounded-full start-0 top-0 w-full h-full flex justify-center items-center">
                        {/* <label className='cursor-pointer' htmlFor='profile-pic'>
                            <span className="m-icon text-3xl text-primary">camera_alt</span>
                        </label>
                        <input type="file" id='profile-pic' className='hidden ' /> */}
                        <Dialog>
                            <DialogTrigger className='size-12 rounded-full bg-white'>
                                <span className="m-icon text-3xl text-primary">camera_alt</span>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Change Profile Picture
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    <form onSubmit={handleSubmit}>
                                        <img src={data.photo ? URL.createObjectURL(data.photo) : (auth.user ? `/files/${auth.user.photo}` : asset('images/account.jpg'))} className='size-40 object-cover rounded-full mx-auto' alt="Profile Picture" />
                                        <Input type='file' className='mt-5' onChange={e => setData('photo', e.target.files?.item(0) ?? null)} />
                                        <div className="flex justify-end mt-5 gap-8">
                                            <DialogClose>Cancel</DialogClose>
                                            <PrimaryButton type='submit' className='rounded-lg'>Save</PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="mt-5 w-2/5">
                    <ul className='flex flex-col gap-0'>
                        <li className=''>
                            <Dialog>
                                <DialogTrigger className='flex items-center w-full bg-gray-50 rounded p-3'>
                                    <div className='text-start'>
                                        <p className="text-sm text-gray-400">Name</p>
                                        <p className='text-base'>{auth.user?.name}</p>
                                    </div>
                                    <span className="ms-auto m-icon text-gray-500">edit</span>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Update Name
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <form onSubmit={handleSubmit}>
                                            <TextInput autoComplete='name' placeholder='Name' value={data.name} onChange={e => setData('name', e.target.value)} className='w-full rounded-lg mb-3' />
                                            <div className="flex justify-end mt-5 gap-8">
                                                <DialogClose>Cancel</DialogClose>
                                                <PrimaryButton type='submit' className='rounded-lg'>Save</PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </li>
                        <li className='border-b'></li>
                        <li className=' p-0'>
                            <Link href='#' className='bg-gray-50 rounded p-3 flex items-center'>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className='text-base'>{auth.user?.email}</p>
                                </div>
                                <span className="ms-auto m-icon text-gray-500">edit</span>
                            </Link>
                        </li>
                        <li className='border-b'></li>
                        <li className=' p-0'>
                            <Link href='#' className='bg-gray-50 rounded p-3 flex items-center'>
                                <div>
                                    <p className="text-sm text-gray-400">Password</p>
                                    <p className='text-base'>**************</p>
                                </div>
                                <span className="ms-auto m-icon text-gray-500">edit</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </AdminLayout>
    )
}

export default Profile
