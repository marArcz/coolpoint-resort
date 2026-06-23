import React from 'react'

type Props = {
    title?: string;
    image: string;
    eyebrow?: string;
    description?: string;
}

const HeroSection = ({
    title,
    image,
    eyebrow = "Cool Point Resort",
    description = "A calm setting for weekend stays, family time, and private celebrations.",
}: Props) => {
    return (
        <section aria-label="hero-section" className="customer-hero-section">
            <div className="relative min-h-[380px] overflow-hidden md:min-h-[520px]">
                <img
                    src={image}
                    alt={title || "Cool Point Resort"}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="customer-hero-overlay absolute inset-0" />

                <div className="container-padded relative flex min-h-[380px] items-end pb-14 pt-28 md:min-h-[520px] md:pb-20">
                    <div className="max-w-3xl">
                        <p className="customer-eyebrow text-white/70">{eyebrow}</p>
                        {title && (
                            <h1 className="customer-display mt-5 text-5xl leading-none text-white md:text-7xl">
                                {title}
                            </h1>
                        )}
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
