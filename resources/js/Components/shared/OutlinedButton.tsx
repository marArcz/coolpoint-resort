import { ButtonHTMLAttributes } from 'react';

export default function OutlinedButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `w-full text-center justify-center border py-3 px-5 block hover:bg-primary hover:text-white transition-all  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
