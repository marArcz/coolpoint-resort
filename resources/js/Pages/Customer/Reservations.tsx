import HeadingTitle from "@/Components/shared/HeadingTitle";
import PopoverNumberInput from "@/Components/shared/PopoverNumberInput";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import PrimaryButtonLink from "@/Components/shared/PrimaryButtonLink";
import { Calendar } from "@/Components/ui/calendar";
import AppLayout from "@/Layouts/CustomerLayout";
import { formatToCurrency } from "@/lib/utils";
import {
    IPaginatedData,
    IReservation,
    ISearchAvailability,
} from "@/types/models";
import { Head, Link, useForm } from "@inertiajs/react";
import { differenceInDays, format } from "date-fns";
import { CalendarDays, Users } from "lucide-react";
import React from "react";

type Props = {
    reservations: IPaginatedData<IReservation>;
};

const statusConfig: Record<
    string,
    { label: string; bar: string; badge: string }
> = {
    pending: {
        label: "Pending",
        bar: "bg-amber-400",
        badge: "bg-amber-100 text-amber-800 border-amber-200",
    },
    approved: {
        label: "Approved",
        bar: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    confirmed: {
        label: "Confirmed",
        bar: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    completed: {
        label: "Completed",
        bar: "bg-primary",
        badge: "bg-slate-100 text-slate-700 border-slate-200",
    },
    "on-going": {
        label: "Ongoing",
        bar: "bg-primary",
        badge: "bg-slate-100 text-slate-700 border-slate-200",
    },
    cancelled: {
        label: "Cancelled",
        bar: "bg-red-400",
        badge: "bg-red-100 text-red-800 border-red-200",
    },
    declined: {
        label: "Declined",
        bar: "bg-red-400",
        badge: "bg-red-100 text-red-800 border-red-200",
    },
    "no-show": {
        label: "No Show",
        bar: "bg-red-400",
        badge: "bg-red-100 text-red-800 border-red-200",
    },
};

const getStatusConfig = (reservation: IReservation) => {
    const key = reservation.status.toLowerCase();
    const base = statusConfig[key] ?? {
        label: reservation.mStatus ?? reservation.status,
        bar: "bg-slate-400",
        badge: "bg-slate-100 text-slate-700 border-slate-200",
    };
    if (
        (reservation.status === "Approved" ||
            reservation.status === "Confirmed") &&
        reservation.isPaid
    ) {
        return {
            ...base,
            label: "Paid",
            badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
        };
    }
    return base;
};

const ReservationCard = ({
    reservation,
}: {
    reservation: IReservation;
}) => {
    const status = getStatusConfig(reservation);
    const nights =
        reservation.date_from && reservation.date_to
            ? differenceInDays(
                  new Date(reservation.date_to),
                  new Date(reservation.date_from),
              )
            : 0;

    return (
        <Link
            href={route("reservations.show", [reservation.id])}
            className="group flex rounded-[28px] bg-white/78 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)] backdrop-blur-xl border border-white/60 overflow-hidden hover:shadow-[0_32px_80px_-36px_rgba(15,23,42,0.55)] hover:-translate-y-1 transition-all duration-300"
        >
            {/* Status stripe */}
            <div className={`w-2 ${status.bar} flex-shrink-0`} />

            <div className="flex flex-col sm:flex-row flex-1">
                {/* Main content */}
                <div className="flex-1 p-7">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="customer-eyebrow mb-1">Reservation</p>
                            <p className="customer-display text-2xl text-slate-900">
                                #{reservation.reservation_no}
                            </p>
                        </div>
                        <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${status.badge}`}
                        >
                            {status.label}
                        </span>
                    </div>

                    {/* Date + nights */}
                    <div className="mt-5 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">
                            {format(new Date(reservation.date_from), "MMM. dd")}{" "}
                            - {format(new Date(reservation.date_to), "MMM. dd, yyyy")}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-sm font-medium text-slate-700">
                            {nights} {nights === 1 ? "Night" : "Nights"}
                        </span>
                    </div>

                    {/* Room + guests */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                        <p className="text-sm font-medium text-slate-800">
                            {reservation.room?.name ?? "—"}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                            <Users className="h-3.5 w-3.5" />
                            <span>
                                {reservation.adults} Adult
                                {reservation.adults !== 1 ? "s" : ""}
                                {reservation.children > 0 &&
                                    `, ${reservation.children} Child${reservation.children !== 1 ? "ren" : ""}`}
                            </span>
                        </div>
                    </div>

                    {/* Type badge */}
                    {reservation.type === "resort" && (
                        <span className="mt-3 inline-flex items-center rounded-full bg-[#f0ede8] px-3 py-1 text-xs font-medium text-[#332822]">
                            Full Resort Booking
                        </span>
                    )}
                </div>

                {/* Price + payment footer */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-slate-100 px-7 py-5 sm:py-7 sm:pr-8 gap-4 sm:gap-0">
                    <div>
                        <p className="customer-eyebrow text-right">Total</p>
                        <p className="customer-display text-2xl text-slate-900">
                            {formatToCurrency(reservation.total)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-400 capitalize">
                            {reservation.payment_method ?? "—"}
                        </p>
                        {reservation.payments?.[0] && (
                            <p className="mt-1 text-xs font-medium text-slate-500">
                                {reservation.payments[0].status}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

const EmptyReservations = ({
    onSearchAvailability,
}: {
    onSearchAvailability: () => void;
}) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-[28px] bg-white/60 py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f0ede8]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-10 w-10 text-[#332822]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                </svg>
            </div>
            <h3 className="customer-display mt-6 text-2xl text-slate-900">
                No reservations yet
            </h3>
            <p className="customer-copy mt-2 max-w-xs">
                Ready for your first stay? Search availability and book your
                escape.
            </p>
            <button
                onClick={onSearchAvailability}
                className="customer-link mt-6 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
            >
                Search Availability
            </button>
        </div>
    );
};

const Reservations = ({ reservations }: Props) => {
    const { data, setData, get } = useForm<ISearchAvailability>({
        date_from: undefined,
        date_to: undefined,
        adults: 1,
        children: 0,
    });

    const nights: number =
        data.date_from && data.date_to
            ? differenceInDays(data.date_to, data.date_from)
            : 0;

    const handleSubmit = () => {
        get(route("availability.index"));
    };

    const scrollToSearch = () => {
        document
            .getElementById("search-availability")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <AppLayout>
            <Head title="Reservations" />

            {/* ── Your Reservations ─────────────────────────── */}
            <section className="container-padded pt-28 pb-12">
                <p className="customer-eyebrow mb-3">My Account</p>
                <h1 className="customer-section-title">Your Reservations</h1>
            </section>

            <section className="container-padded pb-16">
                {reservations.data.length > 0 ? (
                    <>
                        <div className="grid gap-4 lg:grid-cols-2">
                            {reservations.data.map((reservation) => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {(reservations.prev_page_url ||
                            reservations.next_page_url) && (
                            <div className="mt-8 flex justify-center gap-3">
                                <PrimaryButtonLink
                                    disabled={
                                        reservations.prev_page_url == null
                                    }
                                    href={reservations.prev_page_url ?? ""}
                                    className="w-max"
                                >
                                    Prev
                                </PrimaryButtonLink>
                                <span className="flex items-center px-4 text-sm text-slate-500">
                                    {reservations.current_page} /{" "}
                                    {reservations.last_page}
                                </span>
                                <PrimaryButtonLink
                                    disabled={
                                        reservations.next_page_url == null
                                    }
                                    href={reservations.next_page_url ?? ""}
                                    className="w-max"
                                >
                                    Next
                                </PrimaryButtonLink>
                            </div>
                        )}
                    </>
                ) : (
                    <EmptyReservations onSearchAvailability={scrollToSearch} />
                )}
            </section>

            {/* ── Search Availability ───────────────────────── */}
            <section
                id="search-availability"
                className="container-padded pb-24"
            >
                <HeadingTitle reverse>
                    <h2 className="customer-section-title">
                        Search Availability
                    </h2>
                </HeadingTitle>
                <p className="customer-copy mt-3">
                    Select your dates and guest count to check room availability.
                </p>

                <div className="mt-8 overflow-hidden rounded-[28px] bg-[#fbf7f1] shadow-[0_24px_70px_-36px_rgba(15,23,42,0.35)]">
                    {/* Date summary bar */}
                    <div className="flex items-center justify-between border-b border-slate-200/60 px-8 py-5">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="customer-eyebrow">Check In</p>
                                <p className="customer-display mt-1 text-xl text-slate-900">
                                    {data.date_from
                                        ? format(data.date_from, "MMM. dd")
                                        : "—"}
                                </p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-5 w-5 flex-shrink-0 text-slate-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                />
                            </svg>
                            <div>
                                <p className="customer-eyebrow">Check Out</p>
                                <p className="customer-display mt-1 text-xl text-slate-900">
                                    {data.date_to
                                        ? format(data.date_to, "MMM. dd")
                                        : "—"}
                                </p>
                            </div>
                        </div>
                        {nights > 0 && (
                            <span className="rounded-full bg-[#332822] px-4 py-2 text-sm font-medium text-white">
                                {nights} {nights === 1 ? "Night" : "Nights"}
                            </span>
                        )}
                    </div>

                    {/* Calendar + Guest controls */}
                    <div className="grid lg:grid-cols-[1fr_1fr]">
                        {/* Calendar */}
                        <div className="flex justify-center border-b border-slate-200/60 p-6 lg:border-b-0 lg:border-r">
                            <Calendar
                                mode="range"
                                numberOfMonths={2}
                                selected={{
                                    from: data.date_from,
                                    to: data.date_to,
                                }}
                                onSelect={(range) => {
                                    setData("date_from", range?.from ?? undefined);
                                    if (range?.from == data.date_from) {
                                        setData(
                                            "date_to",
                                            range?.to ?? undefined,
                                        );
                                    }
                                }}
                                fromDate={new Date()}
                                className="rounded-xl border border-slate-200/50 bg-white"
                            />
                        </div>

                        {/* Guest controls */}
                        <div className="flex flex-col gap-5 p-6 lg:p-8">
                            <div>
                                <p className="customer-eyebrow mb-1">Adults</p>
                                <PopoverNumberInput
                                    value={data.adults}
                                    handleChange={(v) => setData("adults", v)}
                                    name="adults"
                                    label="Adults"
                                />
                            </div>
                            <div>
                                <p className="customer-eyebrow mb-1">Children</p>
                                <PopoverNumberInput
                                    min={0}
                                    value={data.children}
                                    handleChange={(v) =>
                                        setData("children", v)
                                    }
                                    name="children"
                                    label="Children"
                                />
                            </div>
                            <div className="mt-auto pt-4">
                                <PrimaryButton
                                    onClick={handleSubmit}
                                    className="w-full justify-center py-4 text-sm font-semibold uppercase tracking-[0.2em]"
                                    disabled={
                                        data.adults === 0 ||
                                        data.date_from === undefined ||
                                        data.date_to === undefined
                                    }
                                >
                                    Check Availability
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Reservations;
