export interface IRoom {
    id: number,
    name: string,
    description: string,
    min_people: number,
    max_people: number,
    double_decks: number,
    beds: number,
    price: number,
    amenities: IRoomAmenity[],
    image: string,
    images: IRoomImage[],
}

export interface IRoomWithReservations extends IRoom{
    reservations:IReservation[]
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
    room_id: number,
    date_from: Date | undefined,
    date_to: Date | undefined,
    adults: number,
    children: number,
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
    status: string,
    total: number,
    payment_method:string,
    payment?:IPayment,
    type: IReservationType,
}

export interface IPaginatedData<T>{
    current_page:number,
    data:T[],
    first_page_url?:string,
    last_page_url?:string,
    next_page_url?:string,
    prev_page_url?:string,
    path:string,
    from:number,
    last_page:number
    per_page:number
    to:number
    total:number
    links:IPaginationLink[],
}

export interface IPaginationLink{
    active:boolean,
    label:string,
    url:string
}

export interface IPayment{
    id:number;
    method:"cash"|"gcash";
    payment_no:string;
    status:string;
    receipt:string;
    reservation_id:number;
    created_at:string
}

export enum IReservationType {
    ROOM = 'room',
    RESORT = 'resort'
}
