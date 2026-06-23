import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/CustomerLayout";
import HeroSection from "@/Components/shared/HeroSection";
import { ArrowRight, BadgeCheck, Sparkles, Trees } from "lucide-react";

const aboutImage =
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop";

const values = [
    {
        icon: BadgeCheck,
        title: "Impeccable cleanliness",
        copy: "Facilities are maintained to stay welcoming, polished, and ready for every arrival.",
    },
    {
        icon: Sparkles,
        title: "Outstanding service",
        copy: "Guests are supported by a team that keeps the experience smooth from check-in to checkout.",
    },
    {
        icon: Trees,
        title: "Relaxed atmosphere",
        copy: "The resort is built around comfort, privacy, and a sense of calm that guests can settle into.",
    },
];

const AboutUs = () => {
    return (
        <AppLayout>
            <Head title="About Us" />

            <HeroSection
                title="About Cool Point"
                image={aboutImage}
                eyebrow="Private Resort in Dasmarinas"
                description="A welcoming resort for private escapes, family stays, and celebrations that deserve more room to breathe."
            />

            <section className="bg-white py-24 md:py-32">
                <div className="container-padded grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <div className="customer-panel overflow-hidden border border-white/70 bg-[#f8f4ee] p-3">
                        <img
                            src={aboutImage}
                            className="h-[520px] w-full rounded-[26px] object-cover"
                            alt="Cool Point exterior"
                        />
                    </div>

                    <div>
                        <p className="customer-eyebrow">Our Story</p>
                        <h1 className="customer-section-title mt-5">
                            A resort built for rest, connection, and memorable stays.
                        </h1>
                        <p className="customer-copy mt-7">
                            Situated along NIA Road in Paliparan 1, Dasmarinas City, Cavite, Cool Point Private Resort has welcomed guests since March 20, 2015. Founded by Edmundo R. Sarimos, the resort was created as a place where families, friends, and small groups could step away from daily noise and enjoy time together in comfort.
                        </p>
                        <p className="customer-copy mt-5">
                            The goal remains clear: offer a relaxing environment with clean facilities, attentive service, and the space guests need to celebrate, recharge, or simply slow down for a while.
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {values.map((value) => {
                                const Icon = value.icon;

                                return (
                                    <article
                                        key={value.title}
                                        className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                                            <Icon className="h-5 w-5 text-[#18323a]" />
                                        </div>
                                        <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                                            {value.title}
                                        </h2>
                                        <p className="mt-3 text-sm leading-6 text-slate-500">
                                            {value.copy}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#f7f3ed] py-24 md:py-32">
                <div className="container-padded grid gap-10 lg:grid-cols-2">
                    <div className="rounded-[34px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)] md:p-10">
                        <p className="customer-eyebrow">Mission</p>
                        <h2 className="customer-display mt-5 text-4xl text-slate-900">
                            Make every stay easy to enjoy.
                        </h2>
                        <p className="customer-copy mt-6">
                            Cool Point is committed to creating an enjoyable and relaxing experience for every guest. The resort is designed to make celebrations feel smooth, weekend escapes feel restorative, and group stays feel effortless.
                        </p>
                    </div>

                    <div className="rounded-[34px] border border-[#18323a]/10 bg-[#18323a] p-8 text-white shadow-[0_24px_70px_-36px_rgba(15,23,42,0.55)] md:p-10">
                        <p className="customer-eyebrow text-white/45">Why Guests Return</p>
                        <ul className="mt-6 space-y-5 text-sm leading-7 text-white/75">
                            <li>Clean and well-maintained resort spaces for comfort and peace of mind.</li>
                            <li>Friendly, accommodating support that helps guests settle in quickly.</li>
                            <li>Convenient Cavite location that balances accessibility and privacy.</li>
                        </ul>
                        <Link
                            href={route("rooms.index")}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-900"
                        >
                            Browse Rooms
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default AboutUs;
