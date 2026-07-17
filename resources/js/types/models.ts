export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    phone: string,
    birthdate: string,
    email: string,
    photo: string,
}
export interface IRoom {
    id: number,
    name: string,
    description: string,
    min_people: number,
    max_people: number,
    double_decks: number,
    beds: number,
    price: number,
    time_in: string,
    time_out: string,
    amenities: IRoomAmenity[],
    image: string,
    images: IRoomImage[],
    reservations: IReservation[] | null,
}

export interface IRoomWithReservations extends IRoom {
    reservations: IReservation[]
}

export interface IRoomAmenity {
    id: number,
    name: string,
}

export interface IRoomImage {
    id: number,
    uri: string,
}

export interface IAddReservation {
    room_id?: number,
    date_from: Date | undefined,
    date_to: Date | undefined,
    adults: number,
    children: number,
    type?: string
}
export interface IUpdateReservation {
    date_from: Date | undefined,
    date_to: Date | undefined,
    // adults: number,
    // children: number,
    // type?: string
}
export interface ISearchAvailability {
    date_from: Date | undefined,
    date_to: Date | undefined,
    adults: number,
    children: number,
}

export interface ICart {
    id: number,
    date_from: Date,
    date_to: Date,
    adults: number,
    children: number,
    user_id: Date,
    cart_items: ICartItem[],
}

export interface ICartItem {
    id: number,
    room_id: number,
    cart_id: number,
    room: IRoom
}
export const IReservationStatus = {
    CONFIRMED: 'Confirmed',
    PENDING: 'Pending',
    CANCELLED: 'Cancelled',
    APPROVED: 'Approved',
    APPROVED_PAID: 'Approved - Paid',
    DECLINED: 'Declined',
    COMPLETED: 'Completed',
    NO_SHOW: 'No-Show',
    ON_GOING: 'On-Going',
}

export interface IReservation {
    id: number,
    date_from: Date,
    date_to: Date,
    adults: number,
    children: number,
    reservation_no: string,
    room_id: number,
    room?: IRoom | null,
    user_id: number,
    user: IUser,
    status: string,
    balance:number,
    mStatus: string,
    total: number,
    payment_method: 'cash' | 'gcash',
    isPaid: boolean;
    payments?: IPayment[],
    type: IReservationType,
    type_description: string,
    add_ons?: IReservationAddOn[],
    cancellation_request?: ICancellationRequest,
    created_at: Date
}
export interface ICancellationRequest {
    id: number,
    gcash_account_name: string,
    gcash_number: string,
    // refunded:boolean,
    reason: string,
    status: string,
    reservation_id: number
    created_at: Date
    updated_at: Date
}

export interface IReservationConfiguration {
    id: number,
    gcash_qr_code: string,
    gcash_account_no: string,
    gcash_account_name: string,
    resort_rate: number
}
export interface IUpdateReservationConfiguration {
    gcash_qr_code: File | null,
    gcash_account_no: string,
    gcash_account_name: string,
    resort_rate: number
}

export interface IPaginatedData<T> {
    current_page: number,
    data: T[],
    first_page_url?: string,
    last_page_url?: string,
    next_page_url?: string,
    prev_page_url?: string,
    path: string,
    from: number,
    last_page: number
    per_page: number
    to: number
    total: number
    links: IPaginationLink[],
}
export interface ICursorPaginatedData<T> {
    data: T[],
    next_cursor: string,
    path: string,
    per_page: number,
    prev_cursor?: string
    prev_page_url?: string
}

export interface IPaginationLink {
    active: boolean,
    label: string,
    url: string
}

export interface IPayment {
    id: number;
    method: "cash" | "gcash";
    payment_no: string;
    amount: number;
    status: string;
    receipt: string;
    proof_of_refund: string;
    reservation_id: number;
    type: 'full' | 'downpayment';
    is_refundable: boolean;
    is_refunded: boolean;
    notes: string;
    created_at: string
}
export interface IUpdatePayment {
    id: number;
    method: "cash" | "gcash";
    payment_no: string;
    amount: number;
    status: string;
    receipt: string;
    proof_of_refund: string;
    image?: File | null;
    reservation_id: number;
    type: 'full' | 'downpayment';
    is_refundable: boolean;
    is_refunded: boolean;
    created_at: string
}

export enum IReservationType {
    ROOM = 'room',
    RESORT = 'resort'
}


export interface IExtraAmenity {
    id: number,
    name: string,
    price: number
}
export interface IReservationAddOn {
    id: number,
    quantity: number,
    price: number
    amenity_id: number
    reservation_id: number
    amenity?: IExtraAmenity
}
export interface INewReservationAddOn {
    quantity: number,
    amenity_id: number
    amenity?: IExtraAmenity
}

export interface INavbarTitle { icon: string, title: string };

export interface INavLink {
    label?: string
    icon?: string
    href?: string
    key?: string[]
}
export interface INavLinkMenu {
    label: string
    icon: string
    menu: INavLink[]
}

export interface IAddRoom {
    main_photo: File | null
    additional_photos: File[]
    name: string
    min_people: number | string
    max_people: number | string,
    time_in:string,
    time_out:string,
    price: number | string
    double_decks: number | string
    beds: number | string
    description: string
    amenities: string[]
}
export interface IEditRoom {
    main_photo: File | null
    additional_photos: File[]
    name: string
    min_people: number | string
    max_people: number | string
    price: number | string
    double_decks: number | string
    beds: number | string
    description: string
    time_in: string
    time_out: string
    amenities: string[]
}

export interface INotification {
    id: string;
    type: string;
    data: unknown;
    read_at: Date;
    created_at: Date;
    title?: string;
    description?: string;
}

export type INotificationData<T extends {}> = T & {
    title: string;
    description: string;
    type?: string;

};
export interface IRevenueStatisticItem {
    revenue: number;
    reservations: number;
    strMonth: string;
    month: string;
}
export interface IRevenueData {
    revenue: number;
    statistics: IRevenueStatisticItem[]
}

export type ReservationStatusCounts = Record<string, number>;

export interface IUpdateProfile {
    photo: File | null;
    name: string;
    // email:string;
}
