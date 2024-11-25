import Footer from "@/Components/ui/Footer";
import Navbar from "@/Components/Navbar";
import React, { PropsWithChildren, ReactNode } from "react";

const GuestLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer/>
        </>
    );
};

export default GuestLayout;
