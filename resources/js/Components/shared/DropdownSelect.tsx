import clsx from "clsx";
import React, { SelectHTMLAttributes, useState } from "react";

type Props = {
    placeholder: string;
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
        <div className="relative">
            <select
                {...props}
                onChange={handleOnSelectOption}
                className={clsx(
                    "peer border-gray-300 text-[16px] py-[17px] px-5 focus:ring-0 focus:border-gray-500 focus:outline-none focus:shadow-none shadow-sm " +
                        className
                )}
            >
                {children}
            </select>

            <label
                className={clsx(
                    "absolute bg-white start-5 transition-all text-gray-500 pointer-events-none",
                    {
                        "hidden" : selectedOption != "" && !floatingLabel,
                        "text-sm block text-gray-500 top-0 px-1 translate-y-[-50%]" : selectedOption != "" && floatingLabel,
                        "top-1/2 block translate-y-[-50%] ": selectedOption == "",
                    }
                )}
            >
                {placeholder}
            </label>
        </div>
    );
};

export default DropdownSelect;
