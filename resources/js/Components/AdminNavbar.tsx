import { useAdminContext } from '@/context/AdminContext'
import { INavbarTitle, INotification, INotificationData } from '@/types/models'
import { Link, usePage } from "@inertiajs/react";
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { asset, cn, isINavLink } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { adminMenu } from '@/lib/constants';
import NavLink from './NavLink';
import NavLinkMenu from './NavLinkMenu';
import { useAdminNotificationsStore } from '@/lib/stores';
type Props = {
    navbarTitle?: string | React.ReactNode
    navbarIcon?: string
}
const AdminNavbar = ({ navbarTitle = '', navbarIcon = '' }: Props) => {
    const { auth,currentRoute } = usePage().props
    const { data: notifications, fetching: fetchingNotifications } = useAdminNotificationsStore();

    return (
        <nav className='px-8'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary flex items-center justify-center size-9 xl:size-10 rounded-[15px] ">
                        <span className="m-icon filled xl:text-2xl text-xl text-white">{navbarIcon}</span>
                    </div>
                    {typeof navbarTitle == 'string' ? (
                        <h2 className='xl:text-2xl text-2xl font-serif font-semibold'>{navbarTitle}</h2>
                    ) : (
                        <>{navbarTitle}</>
                    )}
                </div>
                {/* search */}
                <div className='relative xl:w-1/3 md:w-2/6 w-2/4 hidden md:block'>
                    <span className='m-icon text-lg text-gray-400 absolute start-3 translate-y-[-50%] top-[50%]'>search</span>
                    <input type="text" placeholder='Search' className=' w-full ps-10 border-gray-300 rounded-3xl' />
                </div>
                <Dialog>
                    <DialogTrigger className='md:hidden flex'>
                        <span className="m-icon text-2xl text-primary">menu</span>
                    </DialogTrigger>
                    <DialogContent className="bg-primary border-0">
                        <DialogHeader>
                            <DialogTitle className="text-start text-white">Navigation Menu</DialogTitle>
                        </DialogHeader>
                        <div className="py-2">
                            <ul className='flex flex-col nav gap-4 px-0 flex-1 mt-10 pe-1'>
                                {adminMenu && adminMenu.map((menuItem, index) => {
                                    if (isINavLink(menuItem)) {
                                        return <NavLink active={menuItem.key?.includes(currentRoute) || false} key={index} data={menuItem} />
                                    } else {
                                        return <NavLinkMenu activeKey={currentRoute} key={index} data={menuItem} />
                                    }
                                })}
                            </ul>
                        </div>
                    </DialogContent>
                </Dialog>
                <ul className='list-none gap-10 items-center hidden md:flex'>
                    <li>
                        <Popover>
                            <PopoverTrigger className='relative p-2'>
                                {notifications.length > 0 && (
                                    <span className='rounded-full size-4 bg-primary absolute border-4 bottom-2 end-0 animate-pulse'></span>
                                )}
                                <span className={cn('m-icon', {
                                    'filled text-primary': notifications.length > 0
                                })}>notifications</span>
                            </PopoverTrigger>
                            <PopoverContent className='lg:min-w-[400px]' align='end' sideOffset={20}>
                                <p className='text-base font-semibold'>Notifications</p>
                                <hr className='my-3' />
                                <ul className='flex flex-col gap-2 max-h-[60vh]  overflow-y-auto '>
                                    {notifications && notifications.map((notification) => {
                                        let data = notification.data as INotificationData<{}>
                                        return (
                                            <li key={notification.id} className='p-2 rounded border-b'>
                                                <Link href={route('admin.notifications.show', [notification.id])} className='flex flex-col gap-2'>
                                                    <span className='text-secondary'>{data?.title || notification.title}</span>
                                                    <span>{data?.description || notification.description}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                    {notifications.length == 0 && (
                                        <li className='text-sm text-gray-400'>No notifications to show.</li>
                                    )}
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </li>
                    <li>
                        <Popover>
                            <PopoverTrigger className="xl:text-base text-sm font-light">
                                <div className="flex items-center gap-2">
                                    <img src={auth.user?`/files/${auth.user.photo}`:asset('images/account.jpg')} className="rounded-full size-8 xl:size-10 object-cover object-top border mx-auto" />
                                    <p className="font-medium xl:text-base text-sm">{auth?.user?.name}</p>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent align="end" sideOffset={20}>
                                <div className="text-center">
                                    <img src={auth.user?`/files/${auth.user.photo}`:asset('images/account.jpg')} className="rounded-full xl:size-16 md:size-12 object-cover object-top border mx-auto" />
                                    <p className="mt-3 ">{auth?.user?.name}</p>
                                </div>
                                <ul className="list-none flex flex-col gap-5 mt-4">
                                    <li>
                                        <Link className="xl:text-base text-sm font-light" href={route("admin.profile.index")}>
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
