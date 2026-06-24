import CustomerCursor from "@/Components/CustomerCursor";
import Footer from "@/Components/ui/Footer";
import Navbar from "@/Components/Navbar";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    navbarVariant?: "transparent" | "default";
}>;

const GuestLayout = ({ children, navbarVariant = "default" }: Props) => {
    return (
        <div className="customer-shell min-h-screen">
            <CustomerCursor />
            <Navbar variant={navbarVariant} />
            <main className="pt-28">{children}</main>
            <Footer/>
        </div>
    );
};

export default GuestLayout;
