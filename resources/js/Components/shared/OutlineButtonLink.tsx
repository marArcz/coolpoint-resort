import { InertiaLinkProps, Link } from '@inertiajs/react'
import React, { PropsWithChildren } from 'react'

const OutlineButtonLink = ({ children, className = '', ...props }: InertiaLinkProps) => {
    return (
        <>
            <Link {...props} className={`w-full text-center justify-center border py-3 px-5 block hover:bg-primary hover:text-white transition-all ${className}`}>
                {children}
            </Link>
        </>
    )
}

export default OutlineButtonLink
