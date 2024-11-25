import AvailabilityCheckCard from "@/Components/shared/AvailabilityCheckCard";
import GalleryImage from "@/Components/shared/GalleryImage";
import HeadingTitle from "@/Components/shared/HeadingTitle";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/CustomerLayout";
import { Link } from "@inertiajs/react";
import { DateRange } from "react-day-picker";

const Welcome = () => {

    const handleSearchAvailability = (selectedDate: DateRange, adults: number, children: number) => {
        router.get(route('availability.index'),{
            date_from:selectedDate.from,
            date_to:selectedDate.to,
            adults,
            children
        });
    }

    return (
        <AppLayout>
            <Head title="Home" />
            <section
                className="hero-section relative flex justify-center items-center">
                <div className=" z-30 text-white container-padded">
                    <HeadingTitle dark>
                        <p className="italic lg:text-base text-sm">Hotel & Lodging</p>
                    </HeadingTitle>
                    <h1 className="mt-3 text-center xl:text-[5.563rem] lg:text-7xl text-5xl font-serif italic font-bold">
                        Start your vacation with us!
                    </h1>
                    <p className="text-center italic font-light text-lg mt-7">
                        Discover the world with Cool Point Resort
                    </p>
                </div>
                <img src="/images/image-overlay.png" className="absolute bottom-0 w-full" alt="" />
            </section>
            {/* availability card */}
            <div className=" z-30 relative w-full container-padded xl:mt-[-150px] xl:mb-[-100px] lg:mt-[-120px] lg:mb-[-120px] mt-[-70px] mb-[-50px]">
                <AvailabilityCheckCard onSubmit={handleSearchAvailability} />
            </div>
            {/* about section */}
            <section className="about-section bg-[#F3FCFF]">
                <div className="container-padded lg:py-[240px] py-[200px]">
                    <div className="flex lg:flex-row flex-col w-full items-center gap-x-10 gap-y-16">
                        <div className="lg:w-1/2">
                            <img
                                src="/images/home-images/about-image.png"
                                className="w-full"
                                alt=""
                            />
                        </div>
                        <div className="flex-1">
                            <HeadingTitle>
                                <p className="font-serif uppercase font-medium italic text-xl">
                                    About Us
                                </p>
                            </HeadingTitle>
                            <h2 className="xl:text-7xl lg:text-7xl text-5xl text-gray-800 font-bold font-serif mt-3">
                                The best place to enjoy your life
                            </h2>

                            <p className="lg:mt-20 mt-10 text-xl font-light">
                                Lorem ipsum odor amet, consectetuer adipiscing
                                elit. Arcu etiam libero curae consectetur
                                efficitur nec eros eros. Dui blandit mi nisl
                                mollis cursus. Sollicitudin leo eget blandit
                                libero malesuada curabitur. Turpis hendrerit
                                pretium mi mattis a dui vivamus. Lobortis mattis
                                malesuada consectetur; leo senectus etiam
                                maximus. Nisl quis in luctus placerat dapibus
                                phasellus habitasse etiam pretium. Blandit
                                lacinia aenean platea proin ultricies
                                suspendisse sem commodo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="lg:py-36 py-20 container-padded">
                <div className="text-center">
                    <p className="text-xl font-light uppercase">
                        Discover Our Rooms
                    </p>
                    <h2 className="section-title mt-3">
                        Cool Point Resort Rooms
                    </h2>
                </div>
                {/* rooms */}
                <div className=" mt-32 lg:grid-cols-2 grid-cols-1 gap-32 grid place-content-center">
                    <div className="room-card">
                        <div className="room-image">
                            <img
                                src="/images/rooms/room-1.jpg"
                                className=" object-cover"
                                alt=""
                            />
                        </div>
                        <HeadingTitle className="mt-4">
                            <h2 className="font-serif font-medium text-2xl">
                                Room #1
                            </h2>
                        </HeadingTitle>
                        <p className="mt-3">
                            Lorem ipsum odor amet, consectetuer adipiscing elit.
                            Arcu etiam libero curae consectetur efficitur nec
                            eros eros. Dui blandit mi nisl mollis cursus.
                        </p>

                    </div>
                    <div className="room-card">
                        <div className="room-image">
                            <img
                                src="/images/rooms/room-2.jpg"
                                className=" object-cover"
                                alt=""
                            />
                        </div>
                        <HeadingTitle className="mt-4">
                            <h2 className="font-serif font-medium text-2xl">
                                Room #2
                            </h2>
                        </HeadingTitle>

                        <p className="mt-3">
                            Lorem ipsum odor amet, consectetuer adipiscing elit.
                            Arcu etiam libero curae consectetur efficitur nec
                            eros eros. Dui blandit mi nisl mollis cursus.
                        </p>
                    </div>
                </div>
                <div className="mt-20 text-center">
                    <Link href={route('rooms.index')} className=' btn px-12 hover:text-white duration-200 ease-linear text-gray-500 text-lg border hover:bg-primary'>
                        See all
                    </Link>
                </div>
            </section>
            <section className="gallery-section lg:py-36 py-20 container-padded">
                <div className="text-center">
                    <p className="uppercase text-xl font-light">Explore</p>
                    <h2 className="mt-3 section-title">
                        Our Gallery
                    </h2>

                    <div className="mt-20 grid md:grid-cols-2 grid-cols-1 gap-10">
                        <GalleryImage image="/images/gallery/gallery-1.jpg" />
                        <GalleryImage image="/images/gallery/kitchen.jpg" />
                        <GalleryImage image="/images/gallery/sink.jpg" />
                        <GalleryImage image="/images/gallery/front.jpg" />
                    </div>
                </div>
            </section>
            <section className="contact-section">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    <div className="lg:order-1 order-2">
                        <iframe className="w-full lg:h-[60vh] h-[30vh]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.195473908791!2d120.92132521052034!3d14.415892381514306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d3298b3ac857%3A0x3d85965208f6a86!2sCool%20Point%20Private%20Resort!5e0!3m2!1sen!2sph!4v1726366457487!5m2!1sen!2sph" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="py-14 lg:px-14 px-5 order-1 lg:order-2">
                        <p>Information</p>
                        <h2 className="section-title">Contact Us</h2>

                        <div className="mt-10">
                            <p className="font-sans text-2xl text-gray-600">Dasmariñas Cavite</p>
                            <p className="font-sans text-gray-500 text-xl ">Sittio Niyugan, N.I.A. Rd, Dasmariñas, 4114 Cavite</p>
                        </div>

                        <div className="mt-10">
                            <p>Call us directly</p>
                            <p className="font-sans font-medium text-xl">+639123456789</p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default Welcome;
