import React, { useEffect } from 'react'
import ApplicationLogo from './shared/ApplicationLogo'
import { useAdminContext } from '@/context/AdminContext';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { asset, cn, isINavLink } from '@/lib/utils';
import NavLink from './NavLink';
import NavLinkMenu from './NavLinkMenu';
import { m } from 'framer-motion';
import { adminMenu } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAdminNotificationsStore } from '@/lib/stores';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { INotificationData } from '@/types/models';

const AdminSidemenu = () => {
    const { setNavbarTitle } = useAdminContext();
    const { auth, currentRoute } = usePage().props;
    const { data: notifications, fetching: fetchingNotifications } = useAdminNotificationsStore();

    return (
        <>
            <aside className='sidemenu xl:w-[15%] md:w-[18%] w-[25%] bg-primary h-full py-5 hidden md:flex md:flex-col'>
                <div className='text-center text-white py-5 lg:px-15 px-5'>
                    <h2 className='font-serif xl:text-2xl md:text-xl text-xl font-semibold'>COOL POINT</h2>
                </div>
                <div className='mt-4 text-center text-white lg:px-15 px-5'>
                    <img className='rounded-full object-cover mx-auto border-2 border-white size-12 xl:size-16' src={auth.user?`/files/${auth.user.photo}`:asset('images/account.jpg')} alt="" />
                    <p className='mt-3 md-text-lg xl:text-xl'>{auth.user?.name}</p>
                    {/* <p className='font-light uppercase text-sm'>Admin</p> */}
                </div>
                <ul className='flex flex-col nav gap-4 px-0 flex-1 mt-10 pe-1'>
                    {adminMenu && adminMenu.map((menuItem, index) => {
                        if (isINavLink(menuItem)) {
                            return <NavLink active={menuItem.key?.includes(currentRoute) || false} key={index} data={menuItem} />
                        } else {
                            return <NavLinkMenu activeKey={currentRoute} key={index} data={menuItem} />
                        }
                    })}
                </ul>
            </aside>
            {/* mobile nav */}
            <ul className="min-h-16 bg-primary items-center px-8 md:hidden flex w-full justify-between order-last">
                <li className={cn("border-white h-full flex justify-center items-center", {
                    'border-b-2 px-2': currentRoute == 'admin.notifications.index'
                })}>
                    <Dialog>
                        <DialogTrigger className='md:hidden flex relative p-2'>
                            {notifications.length > 0 && (
                                <span className='rounded-full size-4 bg-primary absolute border-4 bottom-2 end-0 animate-pulse'></span>
                            )}
                            <span className={cn("m-icon text-2xl text-white", {
                                'filled': notifications.length > 0
                            })}>notifications</span>
                        </DialogTrigger>
                        <DialogContent className="bg-primary border-0">
                            <DialogHeader>
                                <DialogTitle className="text-start text-white">Notifications</DialogTitle>
                            </DialogHeader>
                            <div className="py-2">
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
                            </div>
                        </DialogContent>
                    </Dialog>
                </li>
                <li className={cn("border-white h-full flex justify-center items-center", {
                    'border-b-2 px-2': currentRoute == 'admin.dashboard'
                })}>
                    <Link href={route('admin.dashboard')} className="text-white flex items-center flex-col ">
                        <span className="m-icon text-xl">home</span>
                        {/* <span className="font-light text-sm">Dashboard</span> */}
                    </Link>
                </li>
                <li className={cn("border-white h-full flex justify-center items-center", {
                    'border-b-2 px-2': currentRoute == 'admin.profile.edit'
                })}>
                    <Link href='#' className="text-white flex items-center flex-col ">
                        <Avatar className="size-6">
                            <AvatarImage src={asset(auth.user?.photo || '')} alt="Profile" />
                            <AvatarFallback>{auth.user ? auth.user.name[0] : ''}</AvatarFallback>
                        </Avatar>
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default AdminSidemenu
