import clsx from 'clsx'
import React, { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

type Props = {
    active?: boolean
    label?: string
}
const CustomSelect = ({ id, active = false, label, ...props }: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & Props) => {
    return (
        <>
            <div className={clsx("flex items-center border appearance-none w-full focus:border-none focus:ring-slate-400 rounded", {
                'border-slate-500 font-medium': active,
                'border-slate-200': !active
            })}>
                <select {...props} id={id} className={clsx('min-w-[150px] border-0 rounded-s flex-grow focus:border-none focus:ring-slate-400 appearance-none', {
                    'rounded-e': label == null
                })} />
                {label && (
                    <div className="px-3 text-center">
                        <label htmlFor={id} className={clsx(' text-sm', {
                            'text-primary font-medium': active,
                            'text-slate-600': !active
                        })}>{label}</label>
                    </div>
                )}
            </div>
        </>
    )
}

export default CustomSelect
