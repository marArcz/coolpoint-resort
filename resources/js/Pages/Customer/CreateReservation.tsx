import HeadingTitle from '@/Components/shared/HeadingTitle';
import OutlineButtonLink from '@/Components/shared/OutlineButtonLink';
import PopoverNumberInput from '@/Components/shared/PopoverNumberInput';
import PrimaryButton from '@/Components/shared/PrimaryButton';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/Layouts/CustomerLayout'
import { formatToCurrency, getTotalNights } from '@/lib/utils';
import { IExtraAmenity, INewReservationAddOn, IReservation, IReservationConfiguration, IReservationType, IRoom } from '@/types/models'
import { Head, Link, useForm } from '@inertiajs/react';
import { differenceInDays, formatDate } from 'date-fns';
import React, { FormEvent, useState } from 'react'

type Props = {
    extraAmenities?: IExtraAmenity[]
    configuration: IReservationConfiguration
    dateFrom: Date
    dateTo: Date
    adults?: number
    children?: number
    room?: IRoom,
    type:string,
}
const CreateReservation = ({ extraAmenities = [], configuration, dateFrom, dateTo, adults = 1, children = 1, room,type }: Props) => {
    const [addOns, setAddOns] = useState<INewReservationAddOn[]>(extraAmenities.map((amenity) => ({ amenity_id: amenity.id, quantity: 1, amenity })))
    const nights: number = getTotalNights(dateFrom, dateTo);
    const initialBill = nights * (room?.price || configuration.resort_rate);

    const { data, setData, post } = useForm<{ adults: number, children: number, date_from: Date, date_to: Date, payment_method: string, total: number, add_ons: INewReservationAddOn[], room_id?: number, type:string }>({
        adults,
        children,
        date_from: dateFrom,
        date_to: dateTo,
        payment_method: 'cash',
        total: initialBill,
        add_ons: [],
        room_id: room?.id,
        type,
    });
    // const [totalBill, setTotalBill] = useState(nights * (reservation.room?.price ?? resortRate));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("reservations.store"));
    }

    function handleCheckedChange(addOn: INewReservationAddOn, checked: string | boolean): void {
        let selectedAddons = data.add_ons.slice();
        if (checked == true || checked == 'true') {
            selectedAddons.push({ ...addOn })
        } else {
            selectedAddons = data.add_ons.filter(a => a.amenity_id != addOn.amenity_id);
        }
        setData(data => ({
            ...data,
            add_ons: selectedAddons,
            total: computeTotal(selectedAddons)
        }))

    }

    function handleAddOnChange(id: number, quantity: number): void {
        let selectedAddons = data.add_ons.map(extraAmenity => extraAmenity.amenity_id == id ? ({ ...extraAmenity, quantity }) : extraAmenity)
        setData(data => ({
            ...data,
            add_ons: selectedAddons,
            total: computeTotal(selectedAddons)
        }))
        setAddOns(addOns => addOns.map(addOn => addOn.amenity_id == id ? ({ ...addOn, quantity }) : addOn))
    }

    function computeTotal(addOns: INewReservationAddOn[]): number {
        let total = initialBill;
        for (let addOn of addOns) {
            if (addOn.amenity) {
                total += addOn.quantity * addOn.amenity.price
            }
        }

        return total
    }

    function isSelected(id: number) {
        console.log('add_ons: ', data.add_ons)
        for (let addOn of data.add_ons) {
            if (id == addOn.amenity_id) return true;
        }

        return false;
    }

    return (
        <AppLayout>
            <Head title='Create Reservation'/>
            <div className="py-12 container-padded">
                <HeadingTitle reverse>
                    <h1 className='text-2xl lg:text-3xl font-serif font-semibold'>Confirm Reservation</h1>
                </HeadingTitle>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row gap-10 mt-8">
                        <div className="lg:w-2/5">
                            <div className="bg-white shadow p-8">
                                <h3 className='text-3xl font-serif font-semibold'>Your stay</h3>
                                <hr className="my-4" />
                                <div className="mb-3">
                                    <p className="text-sm font-light uppercase">Check In</p>
                                    <p className='mt-1 text-lg'>{formatDate(new Date(dateFrom), "MMM. dd, yyyy")}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="text-sm font-light uppercase">Check Out</p>
                                    <p className='mt-1 text-lg'>{formatDate(new Date(dateTo), "MMM. dd, yyyy")}</p>
                                </div>
                                <div className="mt-4 mb-4">
                                    <PopoverNumberInput
                                        name='adults'
                                        label='Adults'
                                        value={data.adults}
                                        handleChange={(v) => setData('adults', v)}
                                    />
                                    <PopoverNumberInput
                                        className='mt-3'
                                        name='children'
                                        label='Children'
                                        value={data.children}
                                        handleChange={(v) => setData('children', v)}
                                    />
                                </div>
                                <hr className="my-4" />
                                <div className="mb-3">
                                    <p className="text-sm font-light uppercase">Type</p>
                                    <p className='mt-1 text-lg capitalize'>{room ? 'Room' : 'Resort'} reservation</p>
                                </div>
                                {room && (
                                    <>
                                        <hr className="my-4" />
                                        <p className="text-sm font-light uppercase">Room Details</p>
                                        <div className="mb-3 mt-3">
                                            <p className=' text-lg capitalize'>{room.name}</p>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-lg flex gap-2 items-center">
                                                <span className='m-icon'>clear_day</span>
                                                <span>{nights} days</span>
                                            </p>
                                        </div>
                                        <div className="mb-3 flex justify-between">
                                            <p className="text-lg flex gap-2 items-center">
                                                <span className='m-icon'>attach_money</span>
                                                <span>Rate per day</span>
                                            </p>
                                            <p className="text-lg capitalize">{formatToCurrency(room.price)}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* extra amenities */}
                        <div className='flex-grow'>
                            {extraAmenities && extraAmenities.length > 0 && (
                                <>
                                    <h3 className='font-serif font-semibold text-2xl'>Choose Additional Services</h3>
                                    <div className="mt-3 mb-5">
                                        {addOns.map((addOn) => (
                                            <div key={addOn.amenity_id}>
                                                {addOn.amenity ? (
                                                    <div key={addOn.amenity.id} className="flex justify-between items-center mb-2 flex-wrap">
                                                        <div className="flex items-center gap-3 sm:w-max w-full">
                                                            <Checkbox onCheckedChange={(checked) => handleCheckedChange(addOn, checked)} value={addOn.amenity.id} id={`extra-amenity-${addOn.amenity.id}`} />
                                                            <label htmlFor={`extra-amenity-${addOn.amenity.id}`} className='text-lg text-nowrap'>{addOn.amenity.name}</label>
                                                            <span className='text-lg ms-2'>({formatToCurrency(addOn.amenity.price)})</span>
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <span className='m-icon text-sm'>close</span>
                                                            <Input min={1} max={room?.max_people} type='number' disabled={!isSelected(addOn.amenity.id)} defaultValue={1} onChange={e => handleAddOnChange(addOn.amenity_id, Number(e.target.value))} className='md:w-28 w-24 disabled:font-light font-bold' />
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                    <hr className="my-3" />
                                </>
                            )}
                            <h3 className='font-serif font-semibold text-2xl'>Price Breakdown</h3>
                            <div className="mt-2">
                                {room ? (
                                    <>
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl font-serif font-medium me-auto'>Room's rate per day</p>
                                            <p className='text-lg'>{formatToCurrency(room.price)}</p>
                                        </div>
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl font-serif font-medium me-auto'>Stay</p>
                                            <p className='text-lg'>{nights} days</p>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl text-tertiary font-serif font-semibold me-auto'>Total</p>
                                            <p className='text-xl text-tertiary font-semibold'>{formatToCurrency(data.total)} </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl font-serif font-medium me-auto'>Resort's reservation rate</p>
                                            <p className='text-lg'>{formatToCurrency(configuration.resort_rate)}</p>
                                        </div>
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl font-serif font-medium me-auto'>Stay</p>
                                            <p className='text-lg'>{nights} Days</p>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="mb-4 flex items-center flex-wrap">
                                            <p className='text-xl text-tertiary font-serif font-semibold me-auto'>Total</p>
                                            <p className='text-xl text-tertiary font-semibold'>{formatToCurrency(data.total)} </p>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* payment method */}
                            <div className="mt-10">
                                <h4 className='font-serif font-medium text-2xl'>Payment Method</h4>
                                <div className="mt-8">
                                    <RadioGroup required defaultValue={data.payment_method} onValueChange={(v) => setData('payment_method', v)}>
                                        <div className="flex mb-8 space-x-4">
                                            <RadioGroupItem className='mt-2' value="cash" id="cash" />
                                            <div className=''>
                                                <label className='text-lg' htmlFor="cash">Pay on arrival</label>
                                                <p className='text-secondary font-medium mt-2'>Pay down payment of 50% via GCash and pay the rest on arrival</p>
                                                {/* <p className='text-gray-800 font-medium mt-2'>* Down payment is non-refundable</p> */}
                                            </div>
                                        </div>
                                        {/* <div className="flex mb-3 space-x-4">
                                            <RadioGroupItem className='mt-2' value="gcash" id="gcash" />
                                            <div>
                                                <Label className='text-lg' htmlFor="gcash">GCash</Label>
                                                <p className='text-secondary font-medium mt-2'>Pay full payment via Gcash</p>
                                                <p className='text-gray-800 font-medium mt-2'>* 100% refundable</p>
                                            </div>
                                        </div> */}
                                    </RadioGroup>
                                    <div className="mt-10 flex items-center gap-3">
                                        <Checkbox required id='has-read' />
                                    <Label className='text-base' htmlFor="has-read">I've read and accept the <Link href={route('terms_and_conditions.index')} className='text-secondary'>terms and conditions.</Link></Label>
                                    </div>
                                    <div className="mt-10 flex flex-wrap gap-5 items-center">
                                        <PrimaryButton type='submit'>Confirm reservation</PrimaryButton>
                                        <button type='button' onClick={() => history.back()} className='w-max border py-4 px-4 hover:bg-gray-300' >Cancel reservation</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}

export default CreateReservation
