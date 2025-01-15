import HeroSection from '@/Components/shared/HeroSection'
import TermsAndConditions from '@/Components/TermsAndConditions'
import AppLayout from '@/Layouts/CustomerLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const PaymentTerms = () => {
    return (
        <AppLayout>
            <Head title='Reservation Details' />
            <HeroSection
                title='Terms and Conditions'
                image='/images/reservation-hero-image.jpg'
            />
            <section className=" py-10 container-padded">
                <TermsAndConditions/>
            </section>
        </AppLayout>
    )
}

export default PaymentTerms
