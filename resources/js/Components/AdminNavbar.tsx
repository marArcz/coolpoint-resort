import { useAdminContext } from '@/context/AdminContext'
import { INavbarTitle } from '@/types/models'
import { Link, usePage } from "@inertiajs/react";
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type Props = {
    navbarTitle?: string | React.ReactNode
    navbarIcon?: string
}
const AdminNavbar = ({ navbarTitle = '', navbarIcon = '' }: Props) => {
    const { auth } = usePage().props
    return (
        <nav className='px-8'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary flex items-center justify-center size-9 xl:size-10 rounded-[15px] ">
                        <span className="m-icon filled xl:text-2xl text-xl text-white">{navbarIcon}</span>
                    </div>
                    {typeof navbarTitle == 'string'?(
                        <h2 className='xl:text-2xl text-2xl font-serif font-semibold'>{navbarTitle}</h2>
                    ):(
                        <>{navbarTitle}</>
                    )}
                </div>
                {/* search */}
                <div className='relative xl:w-1/3 md:w-2/6 w-2/4 hidden md:block'>
                    <span className='m-icon text-lg text-gray-400 absolute start-3 translate-y-[-50%] top-[50%]'>search</span>
                    <input type="text" placeholder='Search' className=' w-full ps-10 border-gray-300 rounded-3xl' />
                </div>
                <button className=" size-9 rounded-full flex justify-center items-center bg-gray-400/10 hover:bg-gray-400/20 active:bg-gray-400/30 p-4 self-center text-secondary md:hidden">
                        {/* menu icon */}
                        <span className="m-icon text-3xl">menu</span>
                    </button>
                <ul className='list-none gap-10 items-center hidden md:flex'>
                    <li>
                        <Link href='#'><span className='m-icon'>notifications</span></Link>
                    </li>
                    <li>
                        <Popover>
                            <PopoverTrigger className="xl:text-base text-sm font-light">
                                <div className="flex items-center gap-2">
                                    <img src={auth?.user?.photo || '/images/account.jpg'} className="rounded-full size-8 xl:size-10 object-cover object-top border mx-auto" />
                                    <p className="font-medium xl:text-base text-sm">{auth?.user?.name}</p>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent align="end" sideOffset={20}>
                                <div className="text-center">
                                    <img src={auth?.user?.photo || '/images/account.jpg'} className="rounded-full xl:size-16 md:size-12 object-cover object-top border mx-auto" />
                                    <p className="mt-3 ">{auth?.user?.name}</p>
                                </div>
                                <ul className="list-none flex flex-col gap-5 mt-4">
                                    <li>
                                        <Link className="xl:text-base text-sm font-light" href={route("profile.edit")}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link role="button" className="xl:text-base text-sm font-light" method="post" href={route("admin.logout")}>
                                            Log Out
                                        </Link>
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default AdminNavbar
