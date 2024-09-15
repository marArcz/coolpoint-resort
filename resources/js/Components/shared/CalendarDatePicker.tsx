import React from "react";

type Props = {

}
const CalendarDatePicker = () => {
    return (
        <>
            <p className=" uppercase">Check In</p>
            <div className="flex mt-3 items-end">
                <h2 className="text-5xl me-2 font-medium">13</h2>
                <h4 className="text-3xl font-serif font-medium text-nowrap">
                    / September
                </h4>
                <button
                    className="btn btn-circle rounded-full transition-all size-9 hover:bg-primary/20 outline-none ring-0 ms-3"
                    type="button"
                >
                    <span className="m-icon">keyboard_arrow_down</span>
                </button>
            </div>
        </>
    );
};

export default CalendarDatePicker;
