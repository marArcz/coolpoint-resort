import Footer from "@/Components/ui/Footer";
import Navbar from "@/Components/Navbar";
import CustomerCursor from "@/Components/CustomerCursor";
import { Toaster } from "@/Components/ui/toaster";
import { PropsWithChildren, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { useCustomerNotificationsStore } from "@/lib/stores";
import { echo } from "@/echo";
import { INotification } from "@/types/models";
import { ToastAction } from "@/Components/ui/toast";

const AppLayout = ({ children }: PropsWithChildren) => {
    const { flash, auth } = usePage().props;
    const { toast } = useToast();
    const { fetchAll: fetchNotifications, add: addNotification } =
        useCustomerNotificationsStore();

    useEffect(() => {
        if (flash.message?.success) {
            toast({
                duration: 1500,
                title: "Success",
                description: flash.message.success,
            });
        } else if (flash.message?.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: flash.message.error,
            });
        }
    }, []);

    const loadNotifications = async () => {
        try {
            await fetchNotifications(route("api.notifications.index"));
        } catch (error) {
            console.error(error);
            toast({
                title: "Uh oh",
                description:
                    "Something went wrong while fetching notifications",
            });
        }
    };

    useEffect(() => {
        loadNotifications();

        if (auth.user) {
            echo.private(`customers.${auth.user.id}`)
                .notification((notification: INotification) => {
                    console.log("notification: ", notification);
                    addNotification(notification);
                    toast({
                        title: notification.title || "Notification",
                        description:
                            notification.description || "New updates for you",
                        action: (
                            <ToastAction
                                altText="Open"
                                onClick={() => {
                                    router.visit(
                                        route("notifications.show", [
                                            notification.id,
                                        ]),
                                    );
                                }}
                            >
                                Open
                            </ToastAction>
                        ),
                    });
                })
                .subscribed(() => {
                    console.log("Subscribed to notification channel");
                });
        }
    }, []);

    return (
        <div className="customer-shell min-h-screen">
            <CustomerCursor />
            <Navbar />
            <main className="min-h-[50vh] bg-transparent">{children}</main>
            <Footer />
            <Toaster />
        </div>
    );
};

export default AppLayout;
