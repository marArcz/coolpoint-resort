import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

const AvailabilityCheckCard = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 5),
    });
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(3);

    return (
        <>
            <div className="card bg-[#E1EEED] w-full shadow  h-max flex justify-around items-center flex-wrap">
                <div className="flex flex-wrap  bg-white py-14 gap-y-10 items-center justify-center flex-1">
                    <div className="flex-1 px-9">
                        <p className="lg:text-base text-sm uppercase">Check In - Check Out</p>
                        <div className="flex mt-5 lg:justify-start justify-between lg:items-end items-center">
                            <div className="flex flex-col gap-y-6 lg:flex-row lg:items-end items-start lg:min-w-[28vw] ">
                                <div className="flex items-end">
                                    <h2 className="xl:text-5xl md:text-3xl text-2xl me-2 font-medium">
                                        {date?.from &&
                                            format(date.from ?? "", "dd")}
                                    </h2>
                                    <h4 className="lg:text-2xl md:text-xl text-lg font-serif font-medium text-nowrap">
                                        /
                                        {date?.from &&
                                            format(date.from ?? "", "MMMM")}
                                    </h4>
                                </div>
                                <div className="lg:mx-4 mx-1 lg:block hidden">
                                    <span className="m-icon text-primary">
                                        remove
                                    </span>
                                </div>
                                <div className="flex items-end">
                                    <h2 className="xl:text-5xl md:text-3xl text-2xl me-2 font-medium">
                                        {date?.to &&
                                            format(date.to ?? "", "dd")}
                                    </h2>
                                    <h4 className="lg:text-2xl md:text-xl text-lg font-serif font-medium text-nowrap">
                                        /
                                        {date?.to &&
                                            format(date.to ?? "", "MMMM")}
                                    </h4>
                                </div>
                            </div>
                            <Popover>
                                <PopoverTrigger className="flex items-center justify-center rounded-full transition-all size-9 hover:bg-primary/20 outline-none ring-0 ms-3">
                                        <span className="m-icon">
                                            keyboard_arrow_down
                                        </span>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="center"
                                >
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
                        </div>
                    </div>
                    <div className="flex-1 flex xl:px-9 md:px-7 px-7">
                        <div className="flex-1">
                            <p className="lg:text-base text-sm uppercase">Adults</p>
                            <div className="flex mt-5 items-center">
                                <h2 className="xl:text-5xl md:text-3xl text-2xl text-center me-2 font-medium w-14 overflow-hidden">
                                    {adults}
                                </h2>

                                <Popover>
                                    <PopoverTrigger className="flex items-center justify-center rounded-full transition-all size-9 hover:bg-primary/20 outline-none ring-0 ms-3">
                                        <span className="m-icon">
                                            keyboard_arrow_down
                                        </span>
                                    </PopoverTrigger>
                                    <PopoverContent className="">
                                        <div className="flex items-center justify-between">
                                            <p className=" text-lg">Adults</p>
                                            <div className="flex gap-3 items-center">
                                                <button
                                                    className="rounded-full hover:bg-primary/20 size-8"
                                                    type="button"
                                                    onClick={() =>
                                                        setAdults((v) =>
                                                            v > 1 ? v - 1 : v
                                                        )
                                                    }
                                                >
                                                    <span className="m-icon text-base">
                                                        remove
                                                    </span>
                                                </button>
                                                <p className="text-xl m-0">
                                                    {adults}
                                                </p>
                                                <button
                                                    className="rounded-full hover:bg-primary/20 size-8"
                                                    type="button"
                                                    onClick={() =>
                                                        setAdults((v) => v + 1)
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
                        </div>
                        <div className="flex-1">
                            <p className="lg:text-base text-sm uppercase">Children</p>
                            <div className="flex mt-5 items-center">
                                <h2 className="xl:text-5xl md:text-3xl text-2xl me-2 text-center font-medium w-14 overflow-hidden">
                                    {children}
                                </h2>

                                <Popover>
                                    <PopoverTrigger className="flex items-center justify-center rounded-full transition-all size-9 hover:bg-primary/20 outline-none ring-0 ms-3">
                                        <span className="m-icon">
                                            keyboard_arrow_down
                                        </span>
                                    </PopoverTrigger>
                                    <PopoverContent className="">
                                        <div className="flex items-center justify-between">
                                            <p className=" text-lg">Children</p>
                                            <div className="flex gap-3 items-center">
                                                <button
                                                    className="rounded-full hover:bg-primary/20 size-8"
                                                    type="button"
                                                    onClick={() =>
                                                        setChildren((v) =>
                                                            v > 1 ? v - 1 : v
                                                        )
                                                    }
                                                >
                                                    <span className="m-icon text-base">
                                                        remove
                                                    </span>
                                                </button>
                                                <p className="text-xl m-0">
                                                    {children}
                                                </p>
                                                <button
                                                    className="rounded-full hover:bg-primary/20 size-8"
                                                    type="button"
                                                    onClick={() =>
                                                        setChildren(
                                                            (v) => v + 1
                                                        )
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
                        </div>
                    </div>
                </div>
                <div className=" h-full flex justify-center items-center px-12 py-5 lg:w-max w-full">
                    <PrimaryButton
                        className=""
                        disabled={
                            !(
                                (adults > 0 || children > 0) &&
                                date?.from != undefined &&
                                date?.to != undefined
                            )
                        }
                    >
                        Check Availability
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
};

export default AvailabilityCheckCard;
