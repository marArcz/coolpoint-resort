import { Link, usePage } from "@inertiajs/react";
import React from "react";
import ApplicationLogo from "../shared/ApplicationLogo";

const Navbar = () => {
    const { auth } = usePage().props

    return (
        <nav className="navbar w-full">
            <div className="container-padded lg:py-7 py-6 h-100 flex justify-between items-center w-full relative">
                <button className="absolute size-9 rounded-full flex justify-center items-center bg-gray-400/10 hover:bg-gray-400/20 active:bg-gray-400/30 right-6 self-center text-secondary lg:hidden">
                    {/* menu icon */}
                    <span className="m-icon">more_horiz</span>
                </button>
                <ul className="list-none lg:flex hidden gap-[49px]">
                    <li>
                        <Link className=" xl:text-base text-sm font-light" href={route('customer.home')}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link className=" xl:text-base text-sm font-light" href="">
                            ABOUT US
                        </Link>
                    </li>
                    <li>
                        <Link className=" xl:text-base text-sm font-light" href={route('customer.rooms.index')}>
                            OUR ROOMS
                        </Link>
                    </li>
                </ul>
                <div className=" flex-grow">
                    <Link href="/" className="">
                        <ApplicationLogo className="mx-auto" />
                    </Link>
                </div>
                <ul className="list-none lg:flex hidden gap-[49px]">
                    <li>
                        <Link className=" xl:text-base text-sm font-light" href="">
                            CONTACT
                        </Link>
                    </li>
                    <li>
                        {auth.user ? (
                            <Link className="xl:text-base text-sm font-light" href={route("profile.edit")}>
                                MY ACCOUNT
                            </Link>
                        ) : (
                            <Link className=" xl:text-base text-sm font-light" href={route('login')}>
                                LOG IN
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link className=" xl:text-base text-sm font-light border border-gray-400 px-[26px] py-[14px] " href={route('customer.rooms.index')}>
                            RESERVATION
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
