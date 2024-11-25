import { ButtonHTMLAttributes } from 'react';

export default function OutlinedButton({ className = '', bg="bg-primary", disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {bg?:string}) {
    return (
        <button
            {...props}
            className={
                `w-full text-center justify-center border py-3 px-5 block transition-all  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
