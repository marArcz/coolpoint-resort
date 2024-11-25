import clsx from "clsx";
import React, { SelectHTMLAttributes, useState } from "react";

type Props = {
    placeholder?: string;
    floatingLabel?:boolean
} & SelectHTMLAttributes<HTMLSelectElement>;

const DropdownSelect = ({
    className = "",
    placeholder,
    value,
    onChange,
    children,
    floatingLabel=false,
    ...props
}: Props) => {
    const [selectedOption, setSelectedOption] = useState(value ?? '');

    const handleOnSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <div className="relative w-full py-0 overflow-hidden">
            <select
                {...props}
                onChange={handleOnSelectOption}
                className={clsx(
                    "peer focus:border-gray-400 active:border-gray-400 border-gray-300 w-full text-[16px] py-[17px] px-5 focus:ring-0 active:ring-0 focus:outline-none focus:shadow-none shadow-sm " +className,
                )}
            >
                {children}
            </select>
        </div>
    );
};

export default DropdownSelect;
