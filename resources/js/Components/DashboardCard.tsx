import React from 'react'
import { cn } from '../lib/utils'

type Props = {
    icon: string
    label: string
    value: string | number,
    badgeClassName?: string,
    valueClassName?: string,
    showBadge?: boolean
}
const DashboardCard = ({ icon, label, value, badgeClassName = "", valueClassName = "", showBadge = false }: Props) => {
    return (
        <div className='rounded-[20px] xl:p-8 md:p-7 p-6 border relative'>
            <div className="flex lg:flex-row flex-col lg:items-center gap-5">
                <div className={cn(
                    'rounded-full xl:size-20 md:size-16 size-12 flex items-center justify-center text-white bg-secondary',
                )}>
                    <span className="m-icon filled text-xl lg:text-3xl">{icon}</span>
                </div>
                <div className='flex-1'>
                    <p className="font-light text-wrap">{label}</p>
                    <p className={cn(
                        'font-semibold xl:text-3xl text-2xl text-primary',
                        valueClassName
                    )}>{value}</p>
                </div>
            </div>
            <div className={cn(
                "absolute rounded-full right-4 top-4 bg-slate-500 size-5 border-4 border-slate-200 animate-pulse",
                badgeClassName,
                {
                    'hidden': !showBadge,
                }
            )}>

            </div>
        </div>
    )
}

export default DashboardCard
