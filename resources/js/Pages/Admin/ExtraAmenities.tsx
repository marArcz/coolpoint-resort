import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import AdminLayout from '@/Layouts/AdminLayout'
import { formatToCurrency } from '@/lib/utils'
import { IExtraAmenity, IPaginatedData } from '@/types/models'
import { Link } from '@inertiajs/react'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

type Props = {
    extraAmenities: IPaginatedData<IExtraAmenity>
}
const ExtraAmenities = ({ extraAmenities }: Props) => {

    return (
        <AdminLayout
            navbarIcon='concierge'
            navbarTitle='Extra Amenities'
        >
            <section className="py-5">
                <div className="flex items-center justify-center">
                    <PrimaryButtonLink bg='bg-primary' className='w-max me-auto rounded-xl' href={route('admin.extra_amenities.create')}>
                        Create New
                    </PrimaryButtonLink>
                    {/* pagination control */}
                    <div className="justify-center gap-2 flex">
                        <PrimaryButtonLink disabled={extraAmenities.prev_page_url == null} href={extraAmenities.prev_page_url ?? ''} className=' w-max rounded-xl' >
                            <span className="m-icon text-base">chevron_left</span>
                        </PrimaryButtonLink>
                        <PrimaryButtonLink disabled={extraAmenities.next_page_url == null} href={extraAmenities.next_page_url ?? ''} className=' w-max rounded-xl' >
                            <span className="m-icon text-base">chevron_right</span>
                        </PrimaryButtonLink>
                    </div>
                </div>
                <Table className='mt-4'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=' whitespace-nowrap'>Name</TableHead>
                            <TableHead className=' whitespace-nowrap'>Price</TableHead>
                            <TableHead className=' whitespace-nowrap'></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {extraAmenities && extraAmenities.data.map((extraAmenity, index) => (
                            <TableRow>
                                <TableCell className='text-base'>
                                    {extraAmenity.name}
                                </TableCell>
                                <TableCell className='text-base'>
                                    {formatToCurrency(extraAmenity.price)}
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
                                                <Link href={route('admin.extra_amenities.edit', [extraAmenity.id])}>
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link method='delete' href={route('admin.extra_amenities.destroy', [extraAmenity.id])}>
                                                    Delete
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </AdminLayout>
    )
}

export default ExtraAmenities
