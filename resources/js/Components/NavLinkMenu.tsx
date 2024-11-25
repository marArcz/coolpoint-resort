import { INavLink, INavLinkMenu } from '@/types/models'
import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import React, { act, useEffect, useState } from 'react'
import NavLink from './NavLink'
import { isINavLink } from '@/lib/utils'
// type Props = {
//     navLinkItem:INavLink
// }

const NavLinkMenu = ({ data: { icon, label, menu = [] }, activeKey = '' }: { data: INavLinkMenu, activeKey: string }) => {
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        for (let item of menu) {
            if (item.key?.includes(activeKey) || false) {
                setShowMenu(true);
                break;
            }
        }
    }, [])

    return (
        <li className={clsx('ps-4 py-1', {
            'text-white': showMenu,
            'text-gray-400': !showMenu,
        })}>
            <button className='flex items-center justify-between gap-3 w-full' onClick={() => setShowMenu(s => !s)}>
                <div className="flex items-center gap-3">
                    <span className="m-icon xl:text-xl text-lg leading-normal filled">{icon}</span>
                    <span className='xl:text-base text-sm'>{label}</span>
                </div>
                <span className={clsx('m-icon transition-all', {
                    'rotate-90': showMenu
                })}>keyboard_arrow_right</span>
            </button>
            {showMenu && (
                <ul className='flex flex-col ps-3 mt-4 gap-4'>
                    {menu && menu.map((navItem, index) => {
                        return <NavLink active={navItem.key?.includes(activeKey) || false} key={index} data={navItem} />
                    })}
                </ul>
            )}
        </li>
    )
}

export default NavLinkMenu
