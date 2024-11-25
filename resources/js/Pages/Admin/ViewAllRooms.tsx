import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import { TableHeader, TableRow, TableHead, Table, TableCell, TableBody } from '@/Components/ui/table'
import AdminLayout from '@/Layouts/AdminLayout'
import { asset, formatToCurrency } from '@/lib/utils'
import { IPaginatedData, IRoom } from '@/types/models'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Button } from '@/Components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Link } from '@inertiajs/react'



type Props = {
    rooms: IPaginatedData<IRoom>
}
const ViewAllRooms = ({ rooms }: Props) => {
    return (
        <AdminLayout
            navbarIcon='bed'
            navbarTitle="Rooms"
        >
            <section className='py-12'>
                <div className="flex items-center justify-center">
                    <PrimaryButtonLink className='w-max me-auto rounded-xl' href={route('admin.rooms.create')}>
                        Create New Room
                    </PrimaryButtonLink>
                    {/* pagination control */}
                    <div className="justify-center gap-2 flex">
                        <PrimaryButtonLink disabled={rooms.prev_page_url == null} href={rooms.prev_page_url ?? ''} className=' w-max rounded-xl' >
                            <span className="m-icon text-base">chevron_left</span>
                        </PrimaryButtonLink>
                        <PrimaryButtonLink disabled={rooms.next_page_url == null} href={rooms.next_page_url ?? ''} className=' w-max rounded-xl' >
                            <span className="m-icon text-base">chevron_right</span>
                        </PrimaryButtonLink>
                    </div>
                </div>
                <div className="mt-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-nowrap'>Room Image</TableHead>
                                <TableHead className='text-nowrap'>Room Label</TableHead>
                                <TableHead className='text-nowrap'>Capacity</TableHead>
                                <TableHead className='text-nowrap'>Price / Rate</TableHead>
                                <TableHead className='text-nowrap'></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rooms.data && rooms.data.map((room, index) => (
                                <TableRow key={room.id}>
                                    <TableCell className='text-base'>
                                        <div>
                                            <img src={asset(room.image)} className=" object-cover size-20 lg:size-24" alt="" />
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-base underline underline-offset-8 text-secondary'>
                                        <Link href={route('admin.rooms.show', [room.id])}>
                                            {room.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='text-base'>
                                        {room.min_people} - {room.max_people} people
                                    </TableCell>
                                    <TableCell className='text-base'>
                                        {formatToCurrency(room.price)}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Link href={route('admin.rooms.show', [room.id])}>
                                                        View Room
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={route('admin.rooms.edit', [room.id])}>
                                                        Edit Room
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link method='delete' href={route('admin.rooms.destroy', [room.id])}>
                                                        Delete Room
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </TableCell>
                                </TableRow>
                            ))}
                            {rooms.data && rooms.data.length == 0 && (
                                <TableRow>
                                    <TableCell className='text-base' colSpan={7}>
                                        No data in the table.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </AdminLayout>
    )
}

export default ViewAllRooms
