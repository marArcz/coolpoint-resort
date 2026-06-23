import React, { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { addDays, format } from "date-fns";
import { CalendarDays, ChevronDown, Search, Users } from "lucide-react";
import { DateRange } from "react-day-picker";

type Props = {
    onSubmit?: (
        selectedDate: DateRange,
        adults: number,
        children: number,
    ) => void;
    defaultDate?: DateRange;
    defaultAdults?: number;
    defaultChildren?: number;
    submitButtonText?: string;
};

const AvailabilityCheckCard = ({
    onSubmit,
    defaultDate,
    defaultAdults,
    defaultChildren,
    submitButtonText = "Search Availability",
}: Props) => {
    const defaultSelectedDate = {
        from: new Date(),
        to: addDays(new Date(), 5),
    };
    const [date, setDate] = React.useState<DateRange | undefined>(
        defaultDate ?? defaultSelectedDate,
    );
    const [adults, setAdults] = useState(defaultAdults ?? 2);
    const [children, setChildren] = useState(defaultChildren ?? 1);

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(date ?? defaultSelectedDate, adults, children);
        }
    };

    const isDisabled = !(
        (adults > 0 || children > 0) &&
        date?.from !== undefined &&
        date?.to !== undefined
    );

    return (
        <div className="customer-panel overflow-hidden border border-white/50 bg-white/78">
            <div className="grid lg:grid-cols-[1.2fr_1.2fr_1fr_auto]">
                <Popover>
                    <PopoverTrigger className="group flex w-full items-center justify-between border-b border-slate-200/80 px-6 py-6 text-left transition hover:bg-white/70 lg:border-b-0 lg:border-r">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="customer-eyebrow">Check In</span>
                                <CalendarDays className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
                            </div>
                            <div className="mt-4 flex items-end gap-3">
                                <span className="customer-display text-4xl text-slate-900 md:text-5xl">
                                    {date?.from ? format(date.from, "dd") : "--"}
                                </span>
                                <span className="pb-2 text-sm uppercase tracking-[0.24em] text-slate-500">
                                    {date?.from ? format(date.from, "MMM") : ""}
                                </span>
                            </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border border-slate-200/80 bg-white p-0">
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

                <Popover>
                    <PopoverTrigger className="group flex w-full items-center justify-between border-b border-slate-200/80 px-6 py-6 text-left transition hover:bg-white/70 lg:border-b-0 lg:border-r">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="customer-eyebrow">Check Out</span>
                                <CalendarDays className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
                            </div>
                            <div className="mt-4 flex items-end gap-3">
                                <span className="customer-display text-4xl text-slate-900 md:text-5xl">
                                    {date?.to ? format(date.to, "dd") : "--"}
                                </span>
                                <span className="pb-2 text-sm uppercase tracking-[0.24em] text-slate-500">
                                    {date?.to ? format(date.to, "MMM") : ""}
                                </span>
                            </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-500" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border border-slate-200/80 bg-white p-0">
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

                <Popover>
                    <PopoverTrigger className="group flex w-full items-center justify-between border-b border-slate-200/80 px-6 py-6 text-left transition hover:bg-white/70 lg:border-b-0 lg:border-r">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="customer-eyebrow">Guests</span>
                                <Users className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
                            </div>
                            <div className="mt-4">
                                <p className="customer-display text-3xl text-slate-900 md:text-4xl">
                                    {adults + children}
                                </p>
                                <p className="mt-2 text-sm text-slate-500">
                                    {adults} adults, {children} children
                                </p>
                            </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-500" />
                    </PopoverTrigger>
                    <PopoverContent
                        align="center"
                        className="customer-panel w-72 border border-slate-200/80 bg-[#fbf7f1] p-4"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
                                <div>
                                    <p className="font-medium text-slate-800">Adults</p>
                                    <p className="text-sm text-slate-500">Ages 13 and above</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-400"
                                        type="button"
                                        onClick={() => setAdults((value) => (value > 1 ? value - 1 : value))}
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center text-sm font-semibold text-slate-900">
                                        {adults}
                                    </span>
                                    <button
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-400"
                                        type="button"
                                        onClick={() => setAdults((value) => value + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3">
                                <div>
                                    <p className="font-medium text-slate-800">Children</p>
                                    <p className="text-sm text-slate-500">Ages 12 and below</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-400"
                                        type="button"
                                        onClick={() => setChildren((value) => (value > 0 ? value - 1 : value))}
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center text-sm font-semibold text-slate-900">
                                        {children}
                                    </span>
                                    <button
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-400"
                                        type="button"
                                        onClick={() => setChildren((value) => value + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <div className="bg-[#18323a] p-3">
                    <button
                        onClick={handleSubmit}
                        className="inline-flex h-full min-h-[96px] w-full items-center justify-center gap-3 rounded-[22px] border border-white/10 bg-[#18323a] px-6 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-[#10262d] disabled:cursor-not-allowed disabled:opacity-35"
                        disabled={isDisabled}
                    >
                        {submitButtonText}
                        <Search className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityCheckCard;
