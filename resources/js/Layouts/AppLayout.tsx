import Footer from '@/Components/ui/Footer'
import Navbar from '@/Components/ui/Navbar'
import { Toaster } from '@/Components/ui/toaster'
import React, { PropsWithChildren, useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { useToast } from '@/hooks/use-toast'

const AppLayout = ({ children }: PropsWithChildren) => {
    const { flash } = usePage().props;
    const { toast } = useToast()

    useEffect(() => {
        if (flash.message.success) {
            toast({
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
    }, [])


    return (
        <>
            <Navbar />
            <main className='min-h-[50vh] bg-gray-50'>{children}</main>
            <Footer />
            <Toaster />
        </>
    )
}

export default AppLayout
