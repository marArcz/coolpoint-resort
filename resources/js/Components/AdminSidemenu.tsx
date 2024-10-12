import React, { useEffect } from 'react'
import ApplicationLogo from './shared/ApplicationLogo'
import { useAdminContext } from '@/context/AdminContext';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { isINavLink } from '@/lib/utils';
import NavLink from './NavLink';
import NavLinkMenu from './NavLinkMenu';

const AdminSidemenu = () => {
    const { setNavbarTitle } = useAdminContext();
    const { auth, currentRoute } = usePage().props;

    const menu = [
        {
            icon: "home",
            label: "Dashboard",
            href: route('admin.dashboard'),
            key: ['admin.dashboard'],
        },
        {
            icon: "bed",
            label: "Rooms",
            menu: [
                {
                    icon: "",
                    label: "Add New Room",
                    href: route('admin.rooms.create'),
                    key: 'admin.rooms.create',
                },
                {
                    icon: "",
                    label: "View All Rooms",
                    href: route('admin.rooms.index'),
                    key: ['admin.rooms.index','admin.rooms.show'],
                },
            ]
        },
        {
            icon: "book",
            label: "Reservations",
            key: ['admin.reservations.index','admin.reservations.show'],
            href: route('admin.reservations.index'),
        }
    ];

    return (
        <aside className='sidemenu xl:w-[15%] md:w-[18%] w-[25%] bg-primary h-full py-5 hidden md:flex md:flex-col'>
            <div className='text-center text-white py-5 lg:px-15 px-5'>
                <h2 className='font-serif xl:text-2xl md:text-xl text-xl font-semibold'>COOL POINT</h2>
            </div>
            <div className='mt-4 text-center text-white lg:px-15 px-5'>
                <img className='rounded-full mx-auto border-2 border-white size-12 xl:size-16' src={auth.user?.photo} alt="" />
                <p className='mt-3 md-text-lg xl:text-xl'>{auth.user?.name}</p>
                {/* <p className='font-light uppercase text-sm'>Admin</p> */}
            </div>
            <ul className='flex flex-col nav gap-4 px-0 flex-1 mt-10 pe-1'>
                {menu && menu.map((menuItem, index) => {
                    if (isINavLink(menuItem)) {
                        return <NavLink active={menuItem.key?.includes(currentRoute) || false} key={index} data={menuItem} />
                    } else {
                        return <NavLinkMenu activeKey={currentRoute} key={index} data={menuItem} />
                    }
                })}
            </ul>
        </aside>
    )
}

export default AdminSidemenu
