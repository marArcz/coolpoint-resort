import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { FormEvent } from "react"
import { Button } from "./ui/button"

type Props = {
    open?: boolean
    setOpen: (open: boolean) => void
    title: string
    description?: string
    confirmButtonText?: string
    cancelButtonText?: string
    handleOnConfirm?: React.MouseEventHandler<HTMLButtonElement>
}

const ConfirmationDialog = ({handleOnConfirm, open, setOpen, title, description,confirmButtonText="Confirm",cancelButtonText="Cancel"}:Props) => {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            {cancelButtonText}
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleOnConfirm}>{confirmButtonText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationDialog
