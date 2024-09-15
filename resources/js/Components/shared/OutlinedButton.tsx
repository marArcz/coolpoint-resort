import { ButtonHTMLAttributes } from 'react';

export default function OutlinedButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-5 py-[14px] border-gray-400  focus:text-white border font-light text-gray-900 uppercase tracking-widest hover:bg-primary/80 hover:text-white focus:bg-primary/70 active:bg-primary-900 focus:outline-none focus:ring-0 ring-0 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
