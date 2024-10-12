import ApplicationLogo from '@/Components/shared/ApplicationLogo'
import React, { PropsWithChildren } from 'react'

const AdminAuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <section className='container-padded h-screen w-full flex items-center justify-center bg-gray-100'>
            <div className='w-full'>
                <div className="text-center">
                    <h2 className='font-serif text-3xl font-bold'>COOL POINT</h2>
                    <h5 className='text-base font-light'>PRIVATE RESORT</h5>
                </div>
                <div className='mt-8 bg-white shadow p-6 lg:p-9 lg:w-2/4 w-full mx-auto'>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default AdminAuthLayout
