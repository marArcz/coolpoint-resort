import React from 'react'

type Props = {
    image: string;
    title?: string;
}

const GalleryImage = ({ image, title }: Props) => {
    return (
        <div className="group relative aspect-[4/3] overflow-hidden rounded-[28px] bg-slate-200">
            <img
                src={image}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                alt={title || "Cool Point Resort gallery image"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-white/30 bg-white/5 backdrop-blur-[1px]" />
            {title && (
                <div className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white backdrop-blur-md">
                    {title}
                </div>
            )}
        </div>
    )
}

export default GalleryImage
