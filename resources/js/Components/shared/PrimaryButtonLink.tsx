import { InertiaLinkProps, Link } from '@inertiajs/react'
import React, { PropsWithChildren } from 'react'

const PrimaryButtonLink = ({ children, className = '', bg='bg-primary', disabled, ...props }: InertiaLinkProps & {bg?:string}) => {
    return (
        <>
            <Link {...props} className={`w-full text-center justify-center py-3 px-5 block transition-all disabled:bg-secondary ${disabled? " pointer-events-none bg-gray-400 text-gray-600":` ${bg} hover:bg-tertiary text-white `} ${className} `}>
                {children}
            </Link>
        </>
    )
}

export default PrimaryButtonLink
