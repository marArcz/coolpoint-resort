import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', bg='bg-primary', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {bg?:string}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-5 py-[14px] lg:text-base text-sm border-0 font-light text-white tracking-widest disabled:pointer-events-none active:scale-105 hover:bg-tertiary focus:bg-tertiary active:bg-primary-900 focus:outline-none focus:ring-0 ring-0 focus:ring-primary focus:ring-offset-2 transition ease-in duration-150 ${bg} ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
