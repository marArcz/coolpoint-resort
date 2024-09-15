import Footer from '@/Components/ui/Footer'
import Navbar from '@/Components/ui/Navbar'
import React, { PropsWithChildren } from 'react'

const AppLayout = ({children}:PropsWithChildren) => {
    return (
        <>
            <Navbar />
            <main className='min-h-[50vh]'>{children}</main>
            <Footer />
        </>
    )
}

export default AppLayout
