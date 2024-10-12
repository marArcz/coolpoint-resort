import React from 'react'

type Props = {
    icon: string
    label: string
    value: string
}
const DashboardCard = ({ icon, label, value }: Props) => {
    return (
        <div className='rounded-[20px] xl:p-8 md:p-7 p-6 border'>
            <div className="flex flex-wrap items-center gap-5">
                <div className="rounded-full bg-secondary xl:size-20 md:size-16 size-12 flex items-center justify-center text-white ">
                    <span className="m-icon filled text-xl lg:text-3xl">{icon}</span>
                </div>
                <div className='flex-1'>
                    <p className="font-light text-wrap">{label}</p>
                    <p className="font-semibold xl:text-3xl text-2xl text-secondary">{value}</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard
