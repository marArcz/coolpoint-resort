import ConfirmationDialog from '@/Components/ConfirmationDialog';
import { InertiaLinkProps, Link, router } from '@inertiajs/react'
import React, { MouseEvent, PropsWithChildren, useRef, useState } from 'react'

type Props = {
    dialogTitle?: string
    dialogDescription?: string
    bg?: string
}
const ConfirmLink = ({ dialogTitle, dialogDescription, method = "get", href, disabled, bg = "bg-primary", className, ...props }: InertiaLinkProps & Props) => {
    const linkRef = useRef<HTMLElement | null>(null)
    const [confirmed, setConfirmed] = useState(false);
    const [showDialog, setShowDialog] = useState(false)

    function handleLinkClick(e: MouseEvent): void {
        e.preventDefault();
        setShowDialog(true);
    }

    const onConfirm = () => {
        router.visit(href, { method });
    }

    return (
        <>
            <Link
                href={href}
                ref={linkRef}
                className={`w-full text-center justify-center py-3 px-5 block transition-all disabled:bg-secondary ${disabled ? " pointer-events-none bg-gray-400 text-gray-600" : ` ${bg} text-white `} ${className} `}
                onClick={handleLinkClick}
                {...props}>

            </Link>
            <ConfirmationDialog
                title={dialogTitle || "Are you absolutely sure?"}
                description={dialogDescription || "Confirm action"}
                open={showDialog}
                setOpen={setShowDialog}
                handleOnConfirm={onConfirm}
            />
        </>
    )
}

export default ConfirmLink
