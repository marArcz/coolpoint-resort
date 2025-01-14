import AvailabilityCheckCard from "@/Components/shared/AvailabilityCheckCard";
import GalleryImage from "@/Components/shared/GalleryImage";
import HeadingTitle from "@/Components/shared/HeadingTitle";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/Layouts/CustomerLayout";
import { Link } from "@inertiajs/react";
import { DateRange } from "react-day-picker";

const AboutUs = () => {

    return (
        <AppLayout>
            <Head title="About Us" />
            <section
                className="hero-section relative flex justify-center items-center">
                <div className=" z-30 text-white container-padded">
                    <h1 className="mt-3 text-center xl:text-[5.563rem] lg:text-7xl text-5xl font-serif italic font-bold">
                        About Us
                    </h1>

                </div>
                <img src="/images/image-overlay.png" className="absolute bottom-0 w-full" alt="" />
            </section>

            {/* about section */}
            <section className="about-section bg-[#F3FCFF]">
                <div className="container-padded py-3">
                    <div className="lg:w-1/2 mx-auto">
                        <img
                            src="/images/home-images/about-image.png"
                            className="w-full"
                            alt=""
                        />
                    </div>
                    <div className=" mt-20 mb-20 w-full mx-auto lg:max-w-5xl text-center">
                        {/* <h3 className="text-2xl font-bold text-center mb-5">Cool Point Private Resort</h3> */}
                        <p className="text-xl font-light">
                            Situated along NIA Road, Paliparan 1, Dasmariñas City, Cavite, 4114, and conveniently located beside Terra Alta Homes, Cool Point Private Resort is your ideal destination for relaxation, fun, and unforgettable memories.

                            Founded on March 20, 2015, by Edmundo R. Sarimos, our resort was created with the vision of providing a serene haven for guests seeking a break from the hustle and bustle of everyday life. Since then, Cool Point Private Resort has been a go-to spot for families, friends, and groups looking to unwind and enjoy quality time together.

                            Our Mission
                            At Cool Point Private Resort, our mission is to provide an enjoyable and relaxing experience for every guest. We strive to create a space where you can celebrate life’s moments, enjoy the company of loved ones, and feel completely at ease. With clean facilities, attentive staff, and a welcoming atmosphere, we aim to make your stay unforgettable.

                            Core Values

                            Impeccable Cleanliness: We are committed to maintaining a spotless environment to ensure your comfort and safety.
                            Outstanding Service: Our friendly and accommodating staff go the extra mile to make your stay stress-free and enjoyable.
                            Guest Satisfaction: Your happiness is our priority, and we work hard to exceed your expectations every time.
                            Why Choose Cool Point Private Resort?

                            Clean and Well-Maintained Facilities: From our sparkling pool to our cozy accommodations, every corner of our resort is designed with your comfort in mind.
                            Friendly and Helpful Staff: We take pride in providing personalized service that makes you feel right at home.
                            Prime Location: Conveniently located beside Terra Alta Homes, our resort offers the perfect balance of tranquility and accessibility.
                            Our Promise to You
                            We promise to deliver exceptional service, clean facilities, and a welcoming environment where you can truly relax and enjoy. Whether it’s a casual weekend getaway, a special celebration, or a much-needed retreat, Cool Point Private Resort is here to make it happen.

                            Plan Your Visit Today!
                            Discover why guests love coming back to Cool Point Private Resort. Let us help you create memories that last a lifetime with our best offers and personalized service. Book your stay now and experience the perfect blend of relaxation and fun.

                            Your next unforgettable getaway starts at Cool Point Private Resort—where comfort and exceptional service meet.
                        </p>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
};

export default AboutUs;
