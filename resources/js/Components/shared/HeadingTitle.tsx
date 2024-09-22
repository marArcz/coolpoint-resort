import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'

type Props = {
    width?: string
    dark?: boolean
    className?: string,
    children: React.ReactNode
    reverse?:boolean
}
const HeadingTitle = ({ className = '', width = 'lg:w-24', dark = false,reverse=false, children }: Props) => {
    return (
        <div className={`relative flex items-center gap-4 ${className}`}>
            <div className={clsx(`h-[0.5px] bg-opacity-50 w-16 ${width} ${reverse? 'order-2':''}`, {
                'bg-black': !dark,
                'bg-white': dark
            })}>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default HeadingTitle
