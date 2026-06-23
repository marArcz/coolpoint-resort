import AvailabilityCheckCard from "@/Components/shared/AvailabilityCheckCard";
import GalleryImage from "@/Components/shared/GalleryImage";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/CustomerLayout";
import {
    ArrowRight,
    MapPin,
    SunMedium,
    Trees,
    UtensilsCrossed,
    Waves,
} from "lucide-react";
import { DateRange } from "react-day-picker";

const heroImage =
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/44698af8-4509-40b4-880a-49753e235952_3840w.webp";
const aboutPrimaryImage =
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop";
const aboutSecondaryImage =
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b0f57a37-07ef-4d32-b0ff-9e2fd9875050_1600w.webp";

const featuredRooms = [
    {
        title: "Deluxe Room",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/73ecfa52-af92-4e86-a055-485059887add_1600w.jpg",
        description:
            "A polished suite for intimate stays, with serene finishes and enough room to settle into a slow private weekend.",
    },
    {
        title: "Family Suite",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
        description:
            "A spacious multi-bed suite designed for larger groups who want comfort, privacy, and a resort base everyone can share.",
    },
];

const galleryImages = [
    {
        title: "Poolside",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Bath",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Mood",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg",
    },
    {
        title: "Nightfall",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp",
    },
];

const experienceHighlights = [
    {
        icon: Waves,
        title: "Pool",
        description:
            "Cool down in open-air resort water spaces that feel private and calm.",
    },
    {
        icon: UtensilsCrossed,
        title: "Dining",
        description:
            "Flexible spaces for shared meals, celebrations, and laid-back afternoons.",
    },
    {
        icon: SunMedium,
        title: "Relax",
        description:
            "Quiet corners and warm light built for recovery, rest, and slow mornings.",
    },
];

const Welcome = () => {
    const handleSearchAvailability = (
        selectedDate: DateRange,
        adults: number,
        children: number,
    ) => {
        router.get(route("availability.index"), {
            date_from: selectedDate.from,
            date_to: selectedDate.to,
            adults,
            children,
        });
    };

    return (
        <AppLayout>
            <Head title="Home" />
            <section className="customer-hero-section">
                <div className="relative min-h-[85vh] overflow-hidden">
                    <img
                        src={heroImage}
                        alt="Cool Point Resort infinity pool"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="customer-hero-overlay absolute inset-0" />

                    <div className="container-padded relative flex min-h-[85vh] flex-col justify-center pb-40 pt-36 text-white">
                        <div className="max-w-3xl">
                            <div className="customer-glass inline-flex rounded-full px-5 py-3">
                                <span className="text-[0.68rem] uppercase tracking-[0.34em] text-white/90">
                                    Sanctuary and Stay
                                </span>
                            </div>
                            <h1 className="customer-display mt-8 text-5xl leading-[0.98] text-white md:text-7xl lg:text-[5.6rem]">
                                Escape to paradise today
                            </h1>
                            <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/80 md:text-lg">
                                Experience the unforgettable at Cool Point. A
                                private resort where calm water, soft light, and
                                generous space shape every stay.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    href={route("availability.index")}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-slate-900 transition hover:bg-[#f3ece1]"
                                >
                                    Start Planning
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a
                                    href="#rooms"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-white transition hover:bg-white/15"
                                >
                                    Explore Rooms
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-padded relative z-10 -mt-24">
                <AvailabilityCheckCard onSubmit={handleSearchAvailability} />
            </div>

            <section className="container-padded py-24 text-center md:py-32">
                <div className="mx-auto max-w-3xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white/80 shadow-sm">
                        <Trees className="h-7 w-7 text-[#18323a]" />
                    </div>
                    <p className="customer-eyebrow mt-8">A place to exhale</p>
                    <h2 className="customer-section-title mt-5">
                        A sanctuary for the senses
                    </h2>
                    <p className="customer-copy mx-auto mt-6 max-w-2xl">
                        Immerse yourself in the quiet rhythm of resort life.
                        From open water views to calm rooms and generous
                        gathering spaces, every detail is shaped to help guests
                        slow down.
                    </p>
                </div>
            </section>

            <section id="about" className="bg-white py-24 md:py-32">
                <div className="container-padded grid gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="relative mx-auto w-full max-w-2xl">
                        <div className="overflow-hidden rounded-[34px] shadow-[0_28px_70px_-36px_rgba(15,23,42,0.45)]">
                            <img
                                src={aboutPrimaryImage}
                                alt="Cool Point seaside view"
                                className="h-[480px] w-full object-cover md:h-[560px]"
                            />
                        </div>
                        <div className="absolute -bottom-10 right-0 w-[62%] overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-2 shadow-2xl md:-right-8">
                            <img
                                src={aboutSecondaryImage}
                                alt="Cool Point pool detail"
                                className="h-52 w-full rounded-[22px] object-cover md:h-64"
                            />
                        </div>
                    </div>

                    <div className="lg:pl-10">
                        <p className="customer-eyebrow">About Us</p>
                        <h2 className="customer-section-title mt-5">
                            The best place to enjoy your life
                        </h2>
                        <p className="customer-copy mt-7">
                            Cool Point Private Resort in Dasmarinas, Cavite was
                            created for guests who want a complete escape
                            without leaving comfort behind. The resort balances
                            privacy, celebration-ready spaces, and a warm
                            atmosphere that works for couples, families, and
                            groups.
                        </p>
                        <p className="customer-copy mt-5">
                            Every stay is shaped around clean facilities,
                            attentive support, and room to slow down. Whether
                            you are planning a short recharge or a full private
                            event, the experience is designed to feel effortless
                            from arrival to checkout.
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {experienceHighlights.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                                            <Icon className="h-5 w-5 text-[#18323a]" />
                                        </div>
                                        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-700">
                                            {item.title}
                                        </p>
                                        <p className="mt-3 text-sm leading-6 text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href={route("about")}
                            className="customer-link mt-10"
                        >
                            Learn More About Cool Point
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section id="rooms" className="bg-[#f7f3ed] py-24 md:py-32">
                <div className="container-padded">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="customer-eyebrow">Discover our rooms</p>
                        <h2 className="customer-section-title mt-5">
                            Cool Point room stays
                        </h2>
                        <p className="customer-copy mt-6">
                            Choose between intimate private suites and larger
                            rooms for group stays. Each one is selected to
                            support slow mornings, long conversations, and
                            restful nights.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-14">
                        {featuredRooms.map((room, index) => (
                            <article
                                key={room.title}
                                className="overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)]"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={room.image}
                                        alt={room.title}
                                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                                    <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white backdrop-blur-md">
                                        {index === 0
                                            ? "Quiet Escape"
                                            : "Group Retreat"}
                                    </div>
                                </div>

                                <div className="space-y-5 p-7">
                                    <h3 className="customer-display text-3xl text-slate-900">
                                        {room.title}
                                    </h3>
                                    <p className="text-sm leading-7 text-slate-600">
                                        {room.description}
                                    </p>
                                    <Link
                                        href={route("rooms.index")}
                                        className={`inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.26em] transition ${index === 0
                                                ? "border border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-950"
                                                : "bg-[#18323a] text-white hover:bg-[#10262d]"
                                            }`}
                                    >
                                        Check Availability
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-24 md:py-32">
                <div className="container-padded">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="customer-eyebrow">Explore</p>
                        <h2 className="customer-section-title mt-5">
                            Our Gallery
                        </h2>
                    </div>

                    <div className="mt-16 grid gap-6 md:grid-cols-2">
                        {galleryImages.map((image) => (
                            <GalleryImage
                                key={image.image}
                                image={image.image}
                                title={image.title}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="contact"
                className="border-t border-slate-200 bg-[#fbf8f3]"
            >
                <div className="grid lg:grid-cols-2">
                    <div className="min-h-[360px] grayscale contrast-[0.96] lg:min-h-[620px]">
                        <iframe
                            className="h-full w-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.195473908791!2d120.92132521052034!3d14.415892381514306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d3298b3ac857%3A0x3d85965208f6a86!2sCool%20Point%20Private%20Resort!5e0!3m2!1sen!2sph!4v1726366457487!5m2!1sen!2sph"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className="flex items-center py-16 lg:px-20">
                        <div className="container-padded lg:px-0">
                            <p className="customer-eyebrow">Information</p>
                            <h2 className="customer-section-title mt-5">
                                Contact Us
                            </h2>

                            <div className="mt-12 space-y-10">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                        Resort Address
                                    </p>
                                    <div className="mt-4 flex items-start gap-3">
                                        <MapPin className="mt-1 h-5 w-5 text-[#18323a]" />
                                        <div>
                                            <p className="customer-display text-2xl text-slate-900">
                                                Dasmarinas, Cavite
                                            </p>
                                            <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">
                                                Sittio Niyugan, N.I.A. Rd,
                                                Dasmarinas, 4114 Cavite
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                        Call Us Directly
                                    </p>
                                    <p className="customer-display mt-4 text-3xl text-slate-900">
                                        +63 912 345 6789
                                    </p>
                                </div>

                                <a
                                    href="https://maps.google.com/?q=Cool+Point+Private+Resort"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="customer-link"
                                >
                                    Get Directions
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Welcome;
