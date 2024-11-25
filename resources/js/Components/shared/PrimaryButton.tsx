import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', bgHover='bg-tertiary', bg='bg-primary', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {bg?:string,bgHover?:string}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-5 py-3 border-0 font-light text-white tracking-widest disabled:pointer-events-none active:scale-105 hover:${bgHover} active:bg-primary-900 focus:outline-none focus:ring-0 ring-0 focus:ring-primary focus:ring-offset-2 transition ease-in duration-150 ${bg} ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
