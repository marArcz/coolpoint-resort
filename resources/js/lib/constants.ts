export const adminMenu = [
    {
        icon: "home",
        label: "Dashboard",
        href: route('admin.dashboard'),
        key: ['admin.dashboard'],
    },
    {
        icon: "bed",
        label: "Rooms",
        menu: [
            {
                icon: "",
                label: "Add New Room",
                href: route('admin.rooms.create'),
                key: 'admin.rooms.create',
            },
            {
                icon: "",
                label: "View All Rooms",
                href: route('admin.rooms.index'),
                key: ['admin.rooms.index', 'admin.rooms.show'],
            },
        ]
    },
    {
        icon: "concierge",
        label: "Extra Amenities",
        menu: [
            {
                icon: "",
                label: "Add New Amenity",
                href: route('admin.extra_amenities.create'),
                key: 'admin.extra_amenities.create',
            },
            {
                icon: "",
                label: "View All Amenities",
                href: route('admin.extra_amenities.index'),
                key: ['admin.extra_amenities.index', 'admin.extra_amenities.show'],
            },
        ]
    },
    {
        icon: "book",
        label: "Reservations",
        menu: [
            {
                icon: "",
                label: "Listing",
                href: route('admin.reservations.index'),
                key: ['admin.reservations.index']
            },
            {
                icon: "",
                label: "Calendar",
                href: route('admin.reservations.index.calendar'),
                key: ['admin.reservations.index.calendar']
            },
        ],
    },
    {
        icon: "person",
        label: "Customers",
        href: route('admin.users.index'),
        key: ['admin.users.index'],
    },
    {
        icon: "settings",
        label: "Settings",
        menu: [
            {
                icon: "",
                label: "Reservation Settings",
                href: route('admin.reservation_configurations.index'),
                key: ['admin.reservation_configurations.index']
            },
            {
                icon: "",
                label: "Account",
                href: route('admin.profile.index'),
                key: ['admin.profile.index']
            },
        ],
    },
];
