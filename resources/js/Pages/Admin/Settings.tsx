import AdminLayout from '@/Layouts/AdminLayout'
import { Link } from '@inertiajs/react'
import React from 'react'

const Settings = () => {
    return (
        <AdminLayout
            navbarTitle="Settings"
            navbarIcon='settings'
        >
            <section className="py-5">
                <div className="flex gap-3">
                    <div className="w-1/4">
                        <p className='text-gray-500'>Menu</p>
                        <ul className='flex flex-col gap-4 mt-4'>
                            <li className='active border-b border-gray-600 w-max pb-2'>
                                <Link href={route('admin.settings.index')}>GCash account for online payment</Link>
                            </li>
                            <li className='active border-b border-gray-600 w-max'>
                                <Link href={route('admin.settings.index')}>GCash account for online payment</Link>
                            </li>
                            <li className='active border-b border-gray-600 w-max'>
                                <Link href={route('admin.settings.index')}>GCash account for online payment</Link>
                            </li>
                            <li className='active border-b border-gray-600 w-max'>
                                <Link href={route('admin.settings.index')}>GCash account for online payment</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </AdminLayout>
    )
}

export default Settings
