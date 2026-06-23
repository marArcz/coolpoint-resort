import CustomerCursor from "@/Components/CustomerCursor";
import Footer from "@/Components/ui/Footer";
import Navbar from "@/Components/Navbar";
import React, { PropsWithChildren, ReactNode } from "react";

const GuestLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="customer-shell min-h-screen">
            <CustomerCursor />
            <Navbar />
            <main className="pt-28">{children}</main>
            <Footer/>
        </div>
    );
};

export default GuestLayout;
