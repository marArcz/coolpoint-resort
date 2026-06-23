import ApplicationLogo from "./shared/ApplicationLogo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ToastAction } from "@/Components/ui/toast";
import { useCustomerNotificationsStore } from "@/lib/stores";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Link, router, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronRight, Menu, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const NavbarLogo = ({ scrolled = false }: { scrolled?: boolean }) => (
    <div className="group relative">
        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="relative opacity-90 transition-opacity group-hover:opacity-100">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 24 24"
                className={cn(
                    "drop-shadow-lg transition-colors duration-300",
                    scrolled ? "text-[#1a2e35]" : "text-white",
                )}
            >
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7.25 22a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75M6.083 15.25H2a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z"
                    clipRule="evenodd"
                />
                <path
                    fill="currentColor"
                    d="M4.25 19a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75m.148-14.602a.75.75 0 0 1 1.061 0l.393.393a.75.75 0 0 1-1.06 1.06l-.394-.392a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.392.393a.75.75 0 0 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.06 0M5.25 12c0 1.178.302 2.286.833 3.25h11.834A6.75 6.75 0 1 0 5.25 12"
                    opacity=".5"
                />
            </svg>
        </div>
    </div>
);

type Props = {
    filled?: boolean
}

const Navbar = ({ filled }: Props) => {
    const page = usePage();
    const { auth } = page.props as {
        auth: { user?: { name?: string } };
    };
    const pathname = (page.url || "").split("?")[0] || "/";
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: notifications } = useCustomerNotificationsStore();
    const { toast } = useToast();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: route("home"), active: pathname === "/" },
        { label: "About Us", href: route("about"), active: pathname === "/about-us" },
        { label: "Our Rooms", href: route("rooms.index"), active: pathname.startsWith("/rooms") },
    ];

    const rightLinks = [
        { label: "Contact", href: `${route("home")}#contact` },
    ];

    const desktopLinkClass = (active = false) =>
        cn(
            "text-[11px] font-medium uppercase tracking-[0.24em] transition-colors",
            isScrolled
                ? active
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                : active
                    ? "text-white"
                    : "text-white/90 hover:text-white",
        );

    const headerClass = cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        filled || isScrolled
            ? "border-b border-white/10 bg-[#102027]/78 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent backdrop-blur-0",
    );

    const reservationClass = cn(
        "hidden md:inline-flex items-center gap-2 border px-6 py-3 text-[11px] uppercase tracking-[0.24em] transition-all rounded-sm shadow-lg",
        isScrolled
            ? "border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/16"
            : "border-white/20 bg-white/8 text-white hover:border-white/35 hover:bg-white/14 backdrop-blur-md",
    );

    const reserveHref = auth.user ? route("reservations.index") : route("availability.index");

    return (
        <>
            <header className={headerClass}>
                <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6 md:px-12">
                    <button
                        type="button"
                        onClick={() => setShowMobileMenu(true)}
                        className={cn(
                            "inline-flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden",
                            isScrolled
                                ? "border border-white/10 bg-white/10 text-white"
                                : "border border-white/10 bg-white/5 text-white",
                        )}
                        aria-label="Open navigation menu"
                    >
                        <Menu className="h-7 w-7" />
                    </button>

                    <nav className="hidden md:flex gap-8 text-shadow-sm">
                        {navLinks.map((item) => (
                            <Link key={item.label} href={item.href} className={desktopLinkClass(item.active)}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <Link href={route("home")} className="block">
                        <NavbarLogo scrolled={isScrolled} />
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        <nav className="flex items-center gap-8 text-shadow-sm">
                            {rightLinks.map((item) => (
                                <a key={item.label} href={item.href} className={desktopLinkClass(false)}>
                                    {item.label}
                                </a>
                            ))}

                            {auth.user ? (
                                <Popover>
                                    <PopoverTrigger className={cn(
                                        "relative text-[11px] font-medium uppercase tracking-[0.24em] transition-colors",
                                        isScrolled
                                            ? "text-white/80 hover:text-white"
                                            : "text-white/90 hover:text-white",
                                    )}>
                                        My Account
                                        {notifications.length > 0 && (
                                            <span className={cn(
                                                "absolute -right-3 -top-1 inline-flex h-2.5 w-2.5 rounded-full",
                                                "bg-white",
                                            )} />
                                        )}
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="end"
                                        sideOffset={20}
                                        className="customer-panel w-80 border border-slate-200/80 bg-[#f8f4ee]/95 p-0"
                                    >
                                        <div className="border-b border-slate-200/80 px-6 py-5">
                                            <p className="customer-eyebrow">Guest Profile</p>
                                            <div className="mt-3">
                                                <p className="customer-display text-2xl text-slate-900">
                                                    {auth.user.name}
                                                </p>
                                                <p className="mt-2 text-sm text-slate-500">
                                                    Keep track of reservations and resort updates.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 p-3">
                                            <Link
                                                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-white/80"
                                                href={route("profile.edit")}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <User className="h-4 w-4" />
                                                    Profile
                                                </span>
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-white/80"
                                                href={route("notifications.index")}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <Bell className="h-4 w-4" />
                                                    Notifications
                                                </span>
                                                {notifications.length > 0 ? (
                                                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 px-2 text-[0.68rem] font-semibold text-white">
                                                        {notifications.length}
                                                    </span>
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </Link>
                                            <Link
                                                role="button"
                                                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-slate-700 transition hover:bg-white/80"
                                                method="post"
                                                href={route("logout")}
                                            >
                                                <span>Log Out</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <Link href={route("login")} className={desktopLinkClass(pathname === "/login")}>
                                    My Account
                                </Link>
                            )}
                        </nav>

                        <Link href={reserveHref} className={reservationClass}>
                            Reservation
                        </Link>
                    </div>

                    <div className="flex justify-end md:hidden">
                        <Link
                            href={auth.user ? route("profile.edit") : route("login")}
                            className={cn(
                                "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
                                isScrolled
                                    ? "border border-white/10 bg-white/10 text-white"
                                    : "border border-white/10 bg-white/5 text-white",
                            )}
                            aria-label="Open account"
                        >
                            <User className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {showMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-[#081217]/70 backdrop-blur-sm lg:hidden"
                    >
                        <motion.nav
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="h-full w-[88vw] max-w-sm bg-[#102027] px-6 py-6 text-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <ApplicationLogo className="text-white" />
                                <button
                                    type="button"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10"
                                    aria-label="Close navigation menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-10 space-y-3">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setShowMobileMenu(false)}
                                        className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-4"
                                    >
                                        <span className="text-xs uppercase tracking-[0.28em] text-white/85">
                                            {item.label}
                                        </span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                ))}
                                {rightLinks.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setShowMobileMenu(false)}
                                        className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-4"
                                    >
                                        <span className="text-xs uppercase tracking-[0.28em] text-white/85">
                                            {item.label}
                                        </span>
                                        <ChevronRight className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>

                            <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-5">
                                <p className="customer-eyebrow text-white/45">Stay Planning</p>
                                <p className="customer-display mt-3 text-3xl text-white">
                                    Reserve your next escape.
                                </p>
                                <p className="mt-3 text-sm leading-6 text-white/70">
                                    Browse rooms, confirm availability, and manage upcoming stays.
                                </p>
                                <Link
                                    href={reserveHref}
                                    onClick={() => setShowMobileMenu(false)}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900"
                                >
                                    Reservation
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {auth.user && notifications.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowMobileMenu(false);
                                        toast({
                                            title: "Notifications",
                                            description: `You have ${notifications.length} unread updates.`,
                                            action: (
                                                <ToastAction
                                                    altText="Open"
                                                    onClick={() => router.visit(route("notifications.index"))}
                                                >
                                                    Open
                                                </ToastAction>
                                            ),
                                        });
                                    }}
                                    className="mt-6 flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-left"
                                >
                                    <span className="text-xs uppercase tracking-[0.28em] text-white/85">
                                        Notifications
                                    </span>
                                    <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-[0.7rem] font-semibold text-slate-900">
                                        {notifications.length}
                                    </span>
                                </button>
                            )}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
