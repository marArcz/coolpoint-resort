import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { Calendar } from '../ui/calendar'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import clsx from 'clsx'

type Props = {
    date: DateRange | undefined;
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}
const DatePickerInput = ({ date, setDate }: Props) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Popover open={open} onOpenChange={(o) => setOpen(o)}>
                <PopoverTrigger className="border hover:border-gray-500 active:shadow px-5 py-4 flex w-full items-center">
                    <input placeholder='Check In - Check Out' value={(date?.from ? format(date.from, "MMM. dd - ") : "") + (date?.to ? format(date.to, "MMM. dd") : "")} type="text" className='w-full text-lg border-0 pointer-events-none px-0' readOnly />
                    <span
                        className={clsx('m-icon ms-auto transition-all', {
                            'rotate-180': open,
                            'rotate-0': !open
                        })}
                    >keyboard_arrow_down</span>
                </PopoverTrigger>

                <PopoverContent>
                    <Calendar
                        initialFocus
                        fromDate={new Date()}
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default DatePickerInput
