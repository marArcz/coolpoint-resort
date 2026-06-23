import { Link, usePage } from '@inertiajs/react'
import { ChevronRight, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const { auth } = usePage().props as { auth: { user?: unknown } };
    const year = new Date().getFullYear();

    const guestLinks = auth.user
        ? [
              { label: "My Reservations", href: route("reservations.index") },
              { label: "Profile", href: route("profile.edit") },
              { label: "Notifications", href: route("notifications.index") },
          ]
        : [
              { label: "Log In", href: route("login") },
              { label: "Create Account", href: route("register") },
              { label: "Search Availability", href: route("availability.index") },
          ];

    return (
        <footer className="bg-[#0d1215] pt-20 text-white">
            <div className="container-padded">
                <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.35fr_repeat(3,1fr)]">
                    <div className="max-w-md">
                        <p className="customer-eyebrow text-white/35">Cool Point Private Resort</p>
                        <h2 className="customer-display mt-4 text-4xl text-white md:text-5xl">
                            Quiet luxury for slow weekends and private celebrations.
                        </h2>
                        <p className="mt-5 text-sm leading-7 text-white/65">
                            Plan a restful stay in Dasmarinas with spacious suites, resort amenities, and a setting designed for family escapes.
                        </p>
                        <div className="mt-8 space-y-3 text-sm text-white/70">
                            <p className="flex items-start gap-3">
                                <MapPin className="mt-1 h-4 w-4 flex-none text-white/50" />
                                Sittio Niyugan, N.I.A. Rd, Dasmarinas, 4114 Cavite
                            </p>
                            <p className="flex items-center gap-3">
                                <Phone className="h-4 w-4 flex-none text-white/50" />
                                +63 912 345 6789
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
                            Resort
                        </h3>
                        <ul className="mt-6 space-y-4 text-sm text-white/65">
                            <li>
                                <Link href={route("home")} className="transition hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={route("about")} className="transition hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href={route("rooms.index")} className="transition hover:text-white">
                                    Rooms
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
                            Guest Services
                        </h3>
                        <ul className="mt-6 space-y-4 text-sm text-white/65">
                            {guestLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="transition hover:text-white">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/30">
                            Visit
                        </h3>
                        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6">
                            <p className="text-sm leading-7 text-white/65">
                                Need directions or want to check dates before booking? Start with availability and plan your stay from there.
                            </p>
                            <a
                                href={`${route("home")}#contact`}
                                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-white"
                            >
                                Contact Us
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 py-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
                    <p className="customer-display text-2xl text-white">Cool Point</p>
                    <p>Copyright {year}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
