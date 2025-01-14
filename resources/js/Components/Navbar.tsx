import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ApplicationLogo from "./shared/ApplicationLogo";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { echo } from "@/echo";
import { INotification, INotificationData, IReservation } from "@/types/models";
import { ToastAction } from "@/Components/ui/toast";
import { useCustomerNotificationsStore } from "@/lib/stores";
import { useToast } from "@/hooks/use-toast";
import { asset } from "@/lib/utils";

const Navbar = () => {
    const { auth } = usePage().props
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const { data: notifications, fetchAll: fetchNotifications, add: addNotification } = useCustomerNotificationsStore();
    const { toast } = useToast();

    return (
        <>
            <nav className="navbar w-full">
                <div className="container-padded xl:py-8 lg:py-7 md:py-6 py-4 h-100 flex justify-between items-center w-full relative">
                    <button onClick={() => setShowMobileMenu(true)} className=" size-9 rounded-full flex justify-center items-center bg-gray-400/10 hover:bg-gray-400/20 active:bg-gray-400/30 self-center text-secondary lg:hidden">
                        {/* menu icon */}
                        <span className="m-icon">menu</span>
                    </button>

                    <ul className="list-none lg:flex hidden gap-8 w-[35%]">
                        <li>
                            <Link className=" xl:text-base text-sm font-light" href={route('home')}>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link className=" xl:text-base text-sm font-light" href={route('about')}>
                                ABOUT US
                            </Link>
                        </li>
                        <li>
                            <Link className=" xl:text-base text-sm font-light" href={route('rooms.index')}>
                                OUR ROOMS
                            </Link>
                        </li>
                    </ul>
                    <div className=" flex-1">
                        <Link href="/" className="">
                            <ApplicationLogo className="mx-auto" />
                        </Link>
                    </div>
                    <ul className="list-none lg:flex hidden gap-8 w-[35%] justify-end items-center">
                        <li>
                            <Link className=" xl:text-base text-sm font-light" href="">
                                CONTACT
                            </Link>
                        </li>

                        {auth.user ? (
                            <>
                                <li>
                                    <Popover>
                                        <PopoverTrigger className="xl:text-base text-sm font-light relative py-3 px-3">
                                            <span>MY ACCOUNT</span>
                                            {notifications.length > 0 && (
                                                <span className="absolute end-0 top-2 text-sm animate-pulse text-secondary rounded-full size-3 m-icon filled">
                                                    notifications_active
                                                </span>
                                            )}
                                        </PopoverTrigger>
                                        <PopoverContent align="end" sideOffset={20}>
                                            <div className="text-center">
                                                <img src={auth.user.photo || '/images/account.jpg'} width={70} height={70} className="rounded-full object-cover object-top border mx-auto" />
                                                <p className="mt-3 ">{auth.user.name}</p>
                                            </div>
                                            <ul className="list-none flex flex-col gap-5 mt-4">
                                                <li>
                                                    <Link className="xl:text-base text-sm font-light" href={route("profile.edit")}>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="xl:text-base text-sm font-light items-c flex justify-between" href={route("notifications.index")}>
                                                        <span>Notifications</span>
                                                        {notifications.length > 0 && (
                                                            <span className="bg-primary rounded-lg p-1 text-xs text-white">{notifications.length}</span>
                                                        )}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link role="button" className="xl:text-base text-sm font-light" method="post" href={route("logout")}>
                                                        Log Out
                                                    </Link>
                                                </li>
                                            </ul>
                                        </PopoverContent>
                                    </Popover>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className=" xl:text-base text-sm font-light" href={route('login')}>
                                        LOG IN
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link className=" xl:text-base text-sm font-light border border-gray-400 px-[26px] py-[14px] " href={route('reservations.index')}>
                                RESERVATION
                            </Link>
                        </li>
                    </ul>
                    <Link href={route('profile.edit')} className="lg:hidden flex">
                        <img src={asset(auth.user?.photo || '/images/account.jpg')} className="rounded-full object-cover" width={35} height={35} alt="" />
                    </Link>
                </div>
            </nav >

            {/* mobile navbar */}
            <AnimatePresence>
                {showMobileMenu && (
                    <motion.nav
                        initial={{ height: 0 }}
                        animate={{ height: "100vh" }}
                        exit={{ height: 0 }}
                        className="mobile-nav overflow-hidden flex box-border fixed top-0 left-0 bg-primary text-white animate-in h-screen w-full z-[999]"
                    >
                        <div className="h-full box-border w-full relative p-5">
                            <h2 className="text-2xl font-serif font-semibold">Menu</h2>
                            <button onClick={() => setShowMobileMenu(false)} className="absolute size-9 top-5 rounded-full flex justify-center items-center bg-gray-200/10 hover:bg-gray-100/20 active:bg-gray-400/30 right-6 self-center hover:text-white text-gray-400">
                                {/* menu icon */}
                                <span className="m-icon">close</span>
                            </button>
                            <div className="mt-10">
                                <ul className="list-none flex flex-col gap-10">
                                    <li>
                                        <Link className=" xl:text-base text-sm font-light" href={route('home')}>
                                            HOME
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className=" xl:text-base text-sm font-light" href="">
                                            ABOUT US
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className=" xl:text-base text-sm font-light" href={route('rooms.index')}>
                                            OUR ROOMS
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className=" xl:text-base text-sm uppercase font-light" href={route('reservations.index')}>
                                            My Reservations
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
