import { router } from "@inertiajs/react";
import clsx from "clsx";
import React, { PropsWithChildren, useEffect, useState } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
    const [showLoadingIndicator, setShowLoadingIndicator] = useState<boolean>(false);

    router.on('start', function (e) {
        setShowLoadingIndicator(true)
    })

    router.on('finish', function (e) {
        setShowLoadingIndicator(false)
        // setTimeout(() => setShowLoadingIndicator(false), 1000)
    })

    useEffect(() => {
        window.addEventListener("load", () => setTimeout(() => setShowLoadingIndicator(false), 1000));
        return () => window.removeEventListener("load", () => setTimeout(() => setShowLoadingIndicator(false), 1000));
    }, [])

    return (
        <>

            <div className={clsx("page-loader transition-all animate-out animate-in",
                {
                    "hidden": !showLoadingIndicator,
                    "flex": showLoadingIndicator
                }
            )}>
                <div className="relative">
                    <div className=" animate-spin ease-out duration-1200 lg:size-40 size-32 border-4 border-gray-100 border-t-primary rounded-full">
                    </div>
                    <p className="text animate-pulse duration-1200 font-serif text-8xl text-primary absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">C</p>
                </div>
            </div>

            {children}
        </>
    );
};

export default RootLayout;
