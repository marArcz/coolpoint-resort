import { IRoom } from '@/types/models'
import { Link } from '@inertiajs/react'
import { asset, formatToCurrency } from '@/lib/utils'
import { ArrowRight, BedDouble, Users } from 'lucide-react'

type Props = {
    room: IRoom,
    href?: string
}

const RoomInfoCard = ({ room, href }: Props) => {
    const destination = href ?? route('rooms.show', [room.id]);
    const description =
        room.description.length > 180
            ? `${room.description.slice(0, 177)}...`
            : room.description;

    return (
        <article className="group overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_-42px_rgba(15,23,42,0.55)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={asset(room.image)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    alt={room.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white backdrop-blur-md">
                    Cool Point Stay
                </div>
            </div>

            <div className="space-y-6 p-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p className="customer-eyebrow">Private Suite</p>
                        <h3 className="customer-display mt-3 text-3xl text-slate-900">
                            {room.name}
                        </h3>
                    </div>
                    <div className="rounded-full bg-[#102027] px-4 py-3 text-sm font-medium text-white">
                        {formatToCurrency(room.price)} / day
                    </div>
                </div>

                <p className="text-sm leading-7 text-slate-600">
                    {description}
                </p>

                <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                        <BedDouble className="h-4 w-4" />
                        {room.beds} beds
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                        <Users className="h-4 w-4" />
                        {room.min_people} - {room.max_people} guests
                    </span>
                </div>

                <Link
                    href={destination}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-800 transition hover:text-slate-950"
                >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </article>
    )
}

export default RoomInfoCard
