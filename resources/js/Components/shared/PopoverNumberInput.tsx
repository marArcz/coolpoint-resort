import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import clsx from 'clsx';

type Props = {
    name?: string;
    label: string;
    min?: number;
    max?: number;
    value?: number;
    className?:string;
    handleChange: (value: number) => void;
}
const PopoverNumberInput = ({ name='', label, min = 0, max, value = 1, handleChange,className='' }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={(o) => setOpen(o)}>
                <PopoverTrigger className="border bg-white hover:border-gray-500 active:shadow px-5 py-3 flex w-full items-center justify-between">
                    <label className=' pointer-events-none'>{label}</label>
                    <div className="flex items-center">
                        <input type="text" value={value} className='w-full text-lg text-end border-0 pointer-events-none' readOnly />
                        <span
                            className={clsx('m-icon ms-1 transition-all', {
                                'rotate-180': open,
                                'rotate-0': !open
                            })}
                        >
                            keyboard_arrow_down
                        </span>
                    </div>
                </PopoverTrigger>
                <PopoverContent align='end'>
                    <div className="flex items-center justify-between">
                        <p className="">{label}</p>
                        <div className="flex gap-3 items-center">
                            <button
                                className="rounded-full hover:bg-primary/20 size-8"
                                type="button"
                                onClick={() => handleChange(value > min ? value - 1 : value)}
                            >
                                <span className="m-icon text-base">remove</span>
                            </button>
                            <p className="m-0">{value}</p>
                            <button
                                className="rounded-full hover:bg-primary/20 size-8"
                                type="button"
                                onClick={() => {
                                    if (value == max) {
                                        // todo: show popover message
                                    } else {
                                        handleChange(Number(value) + 1)
                                    }
                                }
                                }
                            >
                                <span className="m-icon text-base">
                                    add
                                </span>
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default PopoverNumberInput
