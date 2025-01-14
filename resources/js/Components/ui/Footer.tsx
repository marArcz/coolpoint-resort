import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const Footer = () => {
    const { auth } = usePage().props;
    return (
        <footer className='py-12 container-padded bg-[#211f20] text-white'>
            <div className="flex justify-between flex-wrap">
                <ul className='gap-y-4 flex flex-col font-light'>
                    <li>
                        <Link href="#">About Us</Link>
                    </li>
                    <li>
                        <Link href="#">Terms and Conditions</Link>
                    </li>
                    <li>
                        <Link href="#">Privacy Policy</Link>
                    </li>
                </ul>
                <ul className='gap-y-4 flex flex-col font-light'>
                    <li>
                        <Link href="#">FAQs</Link>
                    </li>
                    <li>
                        <Link href="#">Billing</Link>
                    </li>
                    <li>
                        <Link href="#">Location</Link>
                    </li>
                </ul>
                {!auth.user && (
                    <ul className='gap-y-4 flex flex-col font-light'>
                        <li>
                            <Link href='#'>Create Account</Link>
                        </li>
                        <li>
                            <Link href={route('login')}>Sign In</Link>
                        </li>
                    </ul>
                )}
            </div>
            <hr className='mt-6' />
            <div className="flex m-0 items-end mt-6 gap-4">
                <h2 className='lg:text-4xl  text-3xl my-0 p-0 font-semibold font-serif'>Cool Point</h2>
                <p className='text-sm font-light '>COPYRIGHT 2024</p>
            </div>
        </footer>
    )
}

export default Footer
