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
import { PropsWithChildren } from "react";

type Props = {
    imageUrl: string;
    dialogTitle?:string;
    dialogDescription?:string;
    className?:string;
}
const ImageDialog = ({imageUrl, dialogTitle, dialogDescription,className="",children}: PropsWithChildren<Props>) => {
    return (
        <Dialog>
            <DialogTrigger asChild className={className + ' cursor-pointer'}>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle || 'View Image'}</DialogTitle>
                    <DialogDescription>{dialogDescription || ''}</DialogDescription>
                </DialogHeader>
                <div className="py-3">
                    <img src={imageUrl} className='object-cover mx-auto h-[60vh]' alt="" />
                </div>
                <DialogFooter>
                    <DialogClose>
                        Close
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ImageDialog
