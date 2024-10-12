import AdminNavbar from "@/Components/AdminNavbar";
import AdminSidemenu from "@/Components/AdminSidemenu";
import { Toaster } from "@/Components/ui/toaster";
import AdminProvider from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { Link, usePage } from "@inertiajs/react";
import React, { PropsWithChildren, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Button } from "@/Components/ui/button";
import { MoreHorizontal } from "lucide-react";

type Props = {
    navbarTitle: string | React.ReactNode
    navbarIcon: string
}

const AdminLayout = ({ navbarTitle = '', navbarIcon = '', children }: PropsWithChildren<Props>) => {
    const { auth } = usePage().props

    const { flash } = usePage().props;
    const { toast } = useToast()

    useEffect(() => {
        if (flash.message.success) {
            toast({
                duration: 1500,
                title: "Success",
                description: flash.message.success,
            })
        } else if (flash.message.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: flash.message.error,
            })
        }
    }, [])

    return (
        <AdminProvider>
            <main className="h-screen bg-primary">
                <div className="flex flex-col md:flex-row h-full">
                    <AdminSidemenu />
                    {/* content */}
                    <div className="flex-1 bg-white md:rounded-s-[40px] md:rounded-e-none rounded-ee-[20px] overflow-hidden rounded-es-[20px] md:h-full flex flex-col py-8">
                        <AdminNavbar
                            navbarIcon={navbarIcon}
                            navbarTitle={navbarTitle}
                        />
                        <div className="mt-6 overflow-y-auto flex-grow px-8">
                            {children}
                        </div>
                    </div>
                    <ul className="min-h-20 bg-primary items-center px-8 md:hidden flex w-full justify-between">
                        <li className={`border-b-2 border-white h-full flex justify-center items-center`}>
                            <Link href={route('admin.dashboard')} className="text-white flex items-center flex-col ">
                                <span className="m-icon text-xl">home</span>
                                <span className="font-light text-sm">Dashboard</span>
                            </Link>
                        </li>
                        <li className=" border-white h-full flex justify-center items-center">
                            <Link href={route('admin.rooms.index')} className="text-white flex items-center flex-col ">
                                <span className="m-icon text-xl">bed</span>
                                <span className="font-light text-sm">Rooms</span>
                            </Link>
                        </li>
                        <li className=" border-white h-full flex justify-center items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-white">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={route('admin.reservations.index')}>
                                            Reservations
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <Link href="#" className="text-white flex items-center flex-col ">
                                <span className="m-icon ">more_horiz</span>
                            </Link> */}
                        </li>
                    </ul>
                </div>
                <Toaster />
            </main>
        </AdminProvider>
    )
}

export default AdminLayout
