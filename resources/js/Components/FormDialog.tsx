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
import { FormEvent, PropsWithChildren } from "react"
import { Button } from "./ui/button"

type Props = {
    open?: boolean
    setOpen: (open:boolean) => void
    title: string
    description?: string
    submitButtonText?: string
    cancelButtonText?: string
    handleSubmit: (e:FormEvent) => void
}
const FormDialog = ({ open = false, setOpen, title, description, submitButtonText = "Submit", cancelButtonText = "Cancel", handleSubmit, children }: PropsWithChildren<Props>) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="py-3">
                    {children}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            {cancelButtonText}
                        </Button>
                    </DialogClose>
                    <Button type="submit">{submitButtonText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default FormDialog
