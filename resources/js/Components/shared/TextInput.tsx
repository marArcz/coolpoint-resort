import clsx from "clsx";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from "react";

export default forwardRef(function TextInput(
    {
        floatingLabel = false,
        type = "text",
        className = "",
        isFocused = false,
        placeholder = "",
        id,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean;
        floatingLabel?: boolean;
    },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <div className="bg-inherit relative">
            <input
                {...props}
                placeholder={floatingLabel ? "":placeholder}
                id={id}
                type={type}
                autoComplete="off"
                className={
                    "peer text-[1rem] bg-white py-[17px] px-5 focus:ring-0 focus:border-gray-500 focus:outline-none focus:shadow-none border border-gray-200 " +
                    className
                }
                ref={localRef}
            />
            {floatingLabel && (
                <label
                    htmlFor={id}
                    className={clsx(
                        "absolute bg-white start-5 transition-all text-gray-500 pointer-events-none",
                        {
                            "text-sm text-gray-500 top-0 px-1 translate-y-[-50%]":
                                props.value !== "",
                            "top-1/2 translate-y-[-50%] peer-focus:top-0 peer-focus:px-1 peer-focus:text-sm":
                                props.value == "",
                        }
                    )}
                >
                    {placeholder}
                </label>
            )}
        </div>
    );
});
