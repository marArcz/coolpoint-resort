import HeadingTitle from '@/Components/shared/HeadingTitle'
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink'
import OutlinedButton from '@/Components/shared/OutlinedButton'
import PrimaryButton from '@/Components/shared/PrimaryButton'
import PrimaryButtonLink from '@/Components/shared/PrimaryButtonLink'
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency, getSum } from '@/lib/utils'
import { ICart, IRoom } from '@/types/models'
import { Link } from '@inertiajs/react'
import { addDays, differenceInDays, format } from 'date-fns'
import TextTruncate from 'react-text-truncate';

const Cart = ({ cart, rooms }: { cart: ICart, rooms: IRoom[] }) => {

    const nights = differenceInDays(addDays(cart.date_to, 1), cart.date_from);
    return (
        <AppLayout>
            <section className="container-padded py-8">
                {/* <h1 className='text-3xl font-medium font-serif'>Reservation</h1> */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-2">
                    <div className="lg:col-span-3 col-span-1">
                        <HeadingTitle reverse className='justify-start'>
                            <h4 className='text-3xl font-medium font-serif'>Reservation</h4>
                        </HeadingTitle>
                        <div className="max-h-[78vh] overflow-y-auto py-6 pe-5 my-4">
                            {rooms && rooms.map((room) => (
                                <div key={room.id} className="">
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="col-span-1">
                                            <img src={room.image} className='w-full h-auto object-cover' alt="" />
                                        </div>
                                        <div className="col-span-1">
                                            <h5 className='text-2xl font-serif font-semibold'>{room.name}</h5>
                                            <ul className="flex flex-wrap gap-6 mt-3">
                                                <li className='flex items-end gap-2 text-secondary'>
                                                    <span className='m-icon'>bed</span>
                                                    <span>{room.beds} beds</span>
                                                </li>
                                                <li className='flex items-end gap-2 text-secondary'>
                                                    <span className='m-icon'>group</span>
                                                    <span>{room.min_people} - {room.max_people} people</span>
                                                </li>
                                            </ul>
                                            <h5 className='text-lg font-serif mt-3 font-semibold'>Description</h5>
                                            <TextTruncate
                                                line={2}
                                                element="span"
                                                truncateText="…"
                                                containerClassName=' font-light'
                                                text={room.description}
                                                textTruncateChild={<a href="#">more</a>}
                                            />
                                            <div className="flex items-center mt-4 text-lg justify-between">
                                                <span>Rate/night</span>
                                                <span>{formatToCurrency(room.price)}</span>
                                            </div>
                                            <OutlineButtonLink className='w-max px-4 mt-3' href={route("cart.cart_items.store",[cart.id])} data={{ room_id: room.id }} method='post'>
                                                Add
                                            </OutlineButtonLink>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-2 col-span-1">
                        <div className="bg-white p-8 shadow border flex flex-col">
                            <div className=''>
                                <h3 className='text-3xl font-serif font-semibold'>Your Stay</h3>
                                <hr className='my-3' />
                                <p className='text-sm'>CHECK IN - CHECK OUT</p>
                                <div className="flex justify-between items-end">
                                    <div className="flex font-medium mt-2 gap-2 text-lg">
                                        <span>{format(cart.date_from, "MMM. dd")}</span>
                                        <span>-</span>
                                        <span>{format(cart.date_to, "MMM. dd")}</span>
                                    </div>
                                    <p className='text-lg'><span className='font-medium'>{nights}</span> {nights > 1 ? "Nights" : "Night"}</p>
                                </div>
                                <p className='mt-3 text-lg '>
                                    <span className='font-semibold'>{cart.adults}</span> adults, <span className='font-semibold'>{cart.children}</span> Children
                                </p>
                                <OutlineButtonLink href={route('cart.edit', [cart.id])} className='mt-3'>
                                    Edit
                                </OutlineButtonLink>
                            </div>
                            <div className="mt-4 flex-grow">
                                <p className='font-medium'>Rooms to reserve ({cart.cart_items?.length ?? 0})</p>
                                <hr className="my-2" />
                                <ul className='max-h-60 overflow-y-auto pe-3'>
                                    {cart.cart_items && cart.cart_items.map((cartItem) => (
                                        <li key={cartItem.id} className='py-2 border-b'>
                                            <p className='text-lg'>{cartItem.room.name}</p>
                                            <p className='text-lg flex gap-2 items-center mt-2 font-light'>
                                                <span className='m-icon font-light text-gray-500'>bedtime</span> {nights} Nights
                                            </p>
                                            <div className="flex justify-between mt-2 items-end">
                                                <p className='text-lg flex gap-2 items-center font-light'>
                                                    <span className='m-icon font-light text-gray-500'>attach_money</span> Regular rate
                                                </p>
                                                <p className="text-lg">{formatToCurrency(cartItem.room.price)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {cart.cart_items && (
                                    <p className='flex justify-between mt-3'>
                                        <span className='text-lg'>Total</span>
                                        <span className='text-lg text-end text-primary font-medium'>{formatToCurrency(getSum(cart.cart_items.map(cartItem => cartItem.room.price * nights)))}</span>
                                    </p>
                                )}
                            </div>
                            <PrimaryButton className='mt-10 items-end w-full justify-center'>
                                Confirm Reservation
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout >
    )
}

export default Cart
