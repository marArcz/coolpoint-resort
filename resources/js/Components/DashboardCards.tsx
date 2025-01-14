import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import DashboardCard from './DashboardCard';
import { useCancellationRequestsStore, usePendingReservationsStore } from '@/lib/stores';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { formatToCurrency } from '@/lib/utils';
import { IRevenueData } from '@/types/models';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const DashboardCards = () => {
    const { data: pendingReservations, fetching: fetchingReservations, fetchAll: fetchReservations } = usePendingReservationsStore();
    const { data: cancellationRequests, fetching: fetchingCancellationRequests, fetchAll: fetchCancellationRequests } = useCancellationRequestsStore();
    const [revenueData, setRevenueData] = useState<IRevenueData | null>(null);
    const toast = useToast();

    const getRevenue = async () => {
        try {
            const res = await axios.get<IRevenueData>(route('api.revenue.index'));
            console.log(res)
            setRevenueData(res.data)
        } catch (error) {
            console.error('error getting revenue: ', error);
        }
    }

    useEffect(() => {
        fetchReservations();
        fetchCancellationRequests();
        getRevenue();
    }, [])
    return (
        <>
            <div className="mt-3 grid gap-3 md:grid-cols-3 grid-cols-1">
                <Link href={route('admin.reservations.index', { status: 'Pending' })}>
                    <DashboardCard
                        icon="book"
                        label='Pending Reservations'
                        value={fetchingReservations ? '...' : (pendingReservations.length ?? 0)}
                    />
                </Link>
                <Link href={"#"}>
                    <DashboardCard
                        icon="inbox"
                        label='Cancellation Requests'
                        value={fetchingCancellationRequests ? '...' : cancellationRequests.length ?? 0}
                    />
                </Link>
                <div>
                    <DashboardCard
                        icon="attach_money"
                        label='Total Revenue'
                        value={revenueData ? formatToCurrency(revenueData.revenue) : 0}
                    />
                </div>
            </div>
            <div className="mt-10">
                <p>Revenue Statistics</p>
                <div className="mt-3 border rounded-3xl p-4">
                    {
                        revenueData ? (
                            <LineChart width={900} height={300} data={revenueData.statistics} className='mt-5 mb-2 rounded-lg'>
                                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="strMonth" />
                                <YAxis />
                                <Tooltip/>
                            </LineChart>
                        ) : (
                            <p className='text-center text-sm'>Fetching data...</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default DashboardCards
