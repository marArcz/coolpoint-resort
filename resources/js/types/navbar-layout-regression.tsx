import AppLayout from "@/Layouts/CustomerLayout";
import GuestLayout from "@/Layouts/GuestLayout";

const customerLayoutVariantRegression = (
    <>
        <AppLayout navbarVariant="default" />
        <AppLayout navbarVariant="transparent" />
    </>
);

const guestLayoutVariantRegression = (
    <>
        <GuestLayout navbarVariant="default" />
        <GuestLayout navbarVariant="transparent" />
    </>
);

void customerLayoutVariantRegression;
void guestLayoutVariantRegression;
