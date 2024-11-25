import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AdminLayout from '@/Layouts/AdminLayout'
import { IPaginatedData, IUser } from '@/types/models'
import { Link } from '@inertiajs/react'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

type Props = {
    customers: IPaginatedData<IUser>
}
const Customers = ({ customers }: Props) => {
    return (
        <AdminLayout
            navbarIcon='person'
            navbarTitle='Customers'
        >
            <section className='py-5'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Photo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers && customers.data.map(((customer, index) => (
                            <TableRow key={customer.id} >
                                <TableCell className='text-base'>{index + 1}</TableCell>
                                <TableCell className='text-base'>
                                    <img src={customer.photo || '/images/account.jpg'} className='object-cover rounded-full' width={40} height={40} alt="" />
                                </TableCell>
                                <TableCell className='text-base'>{customer.name}</TableCell>
                                <TableCell className='text-base'>{customer.email}</TableCell>
                                <TableCell className='text-base'>{customer.name ?? ''}</TableCell>
                                <TableCell className='text-base'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link href={route('admin.reservations.show', [customer.id])}>
                                                    View Details
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </Table>
            </section>
        </AdminLayout>
    )
}

export default Customers
