import CustomSelect from '@/Components/CustomSelect'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/Components/ui/collapsible'
import clsx from 'clsx'
import React, { FormEvent } from 'react'

type Props = {
    show:boolean
    setShow:(show:boolean) => void
    handleSubmit:(e:FormEvent) => void
}
const ReservationsFilterComponent = ({show, setShow,handleSubmit, year, month, }:Props) => {
    return (
        <>
            <Collapsible open={show} onOpenChange={(o) => setShow(o)} className='py-2 w-full'>
                <CollapsibleTrigger className={clsx('px-4 py-1 transition-all flex gap-2 items-center rounded-xl', {
                    'bg-primary/70 text-white': show,
                    'bg-transparent text-primary': !show,
                })}>
                    <span className='m-icon'>filter_list</span>
                    <span>Filter</span>
                </CollapsibleTrigger>
                <CollapsibleContent className='py-3'>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-5 w-full gap-2 items-center pb-3">
                            <div className="">
                                <CustomSelect
                                    id='year'
                                    active={year != ''}
                                    label='Year'
                                    value={data.year}
                                    onChange={e => setData('year', e.target.value)}
                                >
                                    <option value="">Any</option>
                                    {years && years.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                    {years && years.length == 0 && (
                                        <option value={new Date().getFullYear()} selected>{new Date().getFullYear()}</option>
                                    )}
                                </CustomSelect>
                            </div>
                            <div className="">
                                <CustomSelect
                                    id='month'
                                    active={month != ''}
                                    label='Month'
                                    value={data.month}
                                    onChange={e => setData('month', e.target.value)}
                                >
                                    <option value="">Any</option>
                                    {months.map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </CustomSelect>
                            </div>
                            <div className="">
                                <CustomSelect
                                    id='type'
                                    active={type != ''}
                                    label='Type'
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                >
                                    <option value="">Any</option>
                                    <option value="room">Room</option>
                                    <option value="resort">Resort</option>
                                </CustomSelect>
                            </div>
                            <div className="">
                                <CustomSelect
                                    id='status'
                                    active={status != ''}
                                    label='Status'
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="">Any</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </CustomSelect>
                            </div>
                            <div className=''>
                                <div className="flex gap-1">
                                    <Link href={route('admin.reservations.index')} className='rounded-md text-gray-800 text-center bg-gray-300 font-medium py-2 px-10 border-gray-800 flex-1'>
                                        Clear
                                    </Link>
                                    <button type='submit' className='rounded-md bg-primary text-white font-medium py-2 px-10 border-gray-800 flex-1'>
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}

export default ReservationsFilterComponent
