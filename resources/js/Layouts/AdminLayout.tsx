import AdminNavbar from "@/Components/AdminNavbar";
import AdminSidemenu from "@/Components/AdminSidemenu";
import { Toaster } from "@/Components/ui/toaster";
import AdminProvider from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { Link, router, usePage } from "@inertiajs/react";
import React, { PropsWithChildren, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { echo } from "@/echo";
import { useAdminNotificationsStore, usePendingReservationsStore } from "@/lib/stores";
import { INotification, INotificationData, IReservation } from "@/types/models";
import { ToastAction } from "@/Components/ui/toast";
import { adminMenu } from "@/lib/constants";
import { asset, cn, isINavLink } from "@/lib/utils";
import NavLinkMenu from "@/Components/NavLinkMenu";
import NavLink from "@/Components/NavLink";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

type Props = {
    navbarTitle: string | React.ReactNode
    navbarIcon: string
}

const AdminLayout = ({ navbarTitle = '', navbarIcon = '', children }: PropsWithChildren<Props>) => {
    const { auth, flash, currentRoute } = usePage().props;
    const { toast } = useToast()
    const { fetchAll: fetchNotifications, add: addNotification } = useAdminNotificationsStore();

    const fetchReservations = usePendingReservationsStore(s => s.fetchAll);

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
    }, [flash]);

    useEffect(() => {
        fetchNotifications().catch(e => {
            console.error('Error: ', e);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Cannot fetch notifications"
            })
        })
        // listen for realtime updates
        if (auth.user) {
            const user = auth.user;
            echo.private(`admins.${user.id}`)
                .notification(function (notification: INotification) {
                    console.log('received: ', notification)
                    addNotification(notification);
                    toast({
                        title: notification.title || 'New Reservation',
                        description: notification.description || 'A new reservation has been booked',
                        action: (
                            <ToastAction
                                altText="Open"
                                onClick={() => {
                                    router.visit(route('admin.notifications.show', [notification.id]))
                                }}
                            >
                                Open
                            </ToastAction>
                        ),
                    })
                    if (notification.type == 'new-reservation') {
                        fetchReservations();
                    }
                })
                .subscribed(function () {
                    console.log('subscribed to channel')
                })
                .error((error: any) => {
                    console.error('Error: ', error);
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Cannot fetch real time updates"
                    })
                })
        }
    }, []);

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
                </div>
                <Toaster />
            </main>
        </AdminProvider>
    )
}

export default AdminLayout
