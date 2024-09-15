import { Link } from "@inertiajs/react";
import React from "react";
import ApplicationLogo from "../shared/ApplicationLogo";

const Navbar = () => {
    return (
        <nav className="navbar w-full">
            <div className="container-padded lg:py-7 py-6 h-100 flex justify-between items-center w-full">
                <button className="btn float-left self-center block lg:hidden">
                    {/* menu icon */}
                    <span>...</span>
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
                            BlOG
                        </Link>
                    </li>
                    <li>
                        <Link className=" xl:text-base text-sm font-light" href="">
                            CONTACT
                        </Link>
                    </li>
                    <li>
                        <Link className=" xl:text-base text-sm font-light border border-gray-400 px-[26px] py-[14px] " href="">
                            RESERVATION
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
