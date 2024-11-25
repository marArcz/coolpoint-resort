import ConfirmationDialog from '@/Components/ConfirmationDialog';
import React, { useRef, useState } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    dialogTitle?: string
    dialogDescription?: string
    bg?:string
    button?:HTMLButtonElement | null,
}
const ConfirmButton = ({ dialogTitle, dialogDescription, onClick, disabled, className,bg="bg-primary", ...props }: Props) => {
    const [confirmed, setConfirmed] = useState(false);
    const [showDialog, setShowDialog] = useState(false)

    return (
        <>
            <button className={`${className} text-center justify-center py-3 px-5 block transition-all disabled:bg-secondary ${disabled? " pointer-events-none bg-gray-400 text-gray-600":` ${bg} hover:bg-tertiary text-white `} `} onClick={() => setShowDialog(true)} {...props}></button>
            <ConfirmationDialog
                title={dialogTitle || "Are you absolutely sure?"}
                description={dialogDescription || "Confirm action"}
                open={showDialog}
                setOpen={setShowDialog}
                handleOnConfirm={onClick}
            />
        </>
    )
}

export default ConfirmButton
