import React from 'react'

type Props = {
    title?: string;
    image: string
}
const HeroSection = ({ title, image }: Props) => {
    return (
        <>
            <section aria-label='hero-section' className='p-5 lg:h-[50vh] h-[20vh] relative flex justify-center items-center'>
                <div className='absolute top-0 left-0 h-full w-full bg-[#343434]/75 z-20'></div>
                <img src={image} alt="" className="z-10 absolute top-0 left-0 h-full object-cover w-full" />
                {title && (
                    <div className="border w-max px-[63px] py-[22px] z-30 bg-[#414141]/35 text-white">
                        <p className='font-serif text-xl lg:text-2xl font-medium'>{title}</p>
                    </div>
                )}
            </section>
        </>
    )
}

export default HeroSection
