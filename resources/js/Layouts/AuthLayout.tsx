import React, { PropsWithChildren } from 'react'
import AppLayout from './CustomerLayout'

const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <AppLayout>
            <section className="container-padded py-12 bg-gray-50">
                <div className="lg:w-2/3 mx-auto">
                    {children}
                </div>
            </section>
        </AppLayout>
    )
}

export default AuthLayout
