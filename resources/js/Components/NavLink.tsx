import { INavLink } from '@/types/models'
import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import React from 'react'

// type Props = {
//     navLinkItem:INavLink
// }

const NavLink = ({ data: { icon, label, href = '' }, active = false }: { data: INavLink, active: boolean }) => {
    return (
        <li className={clsx('px-4 py-0', {
            'text-gray-400': !active,
            'text-white border-r-4': active,
        })}>
            <Link href={href} className='flex items-center gap-3'>
                <span className="m-icon leading-normal filled xl:text-xl text-lg">{icon}</span>
                <span className='xl:text-base text-sm'>{label}</span>
            </Link>
        </li>
    )
}

export default NavLink
