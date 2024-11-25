import HeadingTitle from '@/Components/shared/HeadingTitle'
import AppLayout from '@/Layouts/CustomerLayout'
import { INotification, INotificationData } from '@/types/models'
import { Link } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import React from 'react'

type Props = {
    notifications: INotification[]
}
const Notifications = ({ notifications }: Props) => {
    return (
        <AppLayout>
            <Head title='Notifications' />
            <section className="py-5 container-padded">
                <HeadingTitle>
                    <h1 className='text-2xl text-primary flex items-center'>
                        <span>Notifications</span>
                        <span className="ms-2 m-icon">notifications</span>
                    </h1>
                </HeadingTitle>
                <div className="mt-3">
                    <div className="text-end">
                        <Link as='button' method='put' href={route('notifications.read_all')}>Mark all as read</Link>
                    </div>
                    <ul>
                        {notifications && notifications.map((notification) => {
                            let data = notification.data as INotificationData<{}>
                            return (
                                <li key={notification.id} className='p-2 rounded border-b'>
                                    <Link href={route('notifications.show', [notification.id])} className='flex flex-col gap-2'>
                                        <span className='text-secondary'>{data.title || notification.type}</span>
                                        <span>{data.description}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        {notifications.length == 0 && (
                            <li className=' text-gray-700'>No notifications to show.</li>
                        )}
                    </ul>
                </div>
            </section>
        </AppLayout>
    )
}

export default Notifications
