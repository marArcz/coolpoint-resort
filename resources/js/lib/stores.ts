import { ICancellationRequest, INotification, IReservation } from "@/types/models";
import axios from "axios";
import { create } from 'zustand'

export interface IDataStoreState<T> {
    data: T[];
    fetching: boolean,
    fetchAll: (url?:string) => Promise<void>;
    error?: unknown | null,
    add: (data: T) => void
}
export const usePendingReservationsStore = create<IDataStoreState<IReservation>>()((set) => ({
    data: [],
    fetching: false,
    async fetchAll() {
        try {
            set((state) => ({ ...state, fetching: true }))
            const res = await axios.get<IReservation[]>(route('api.reservations.index', { status: 'Pending' }));
            set((state) => ({ ...state, data: res.data }))
        } catch (error: unknown) {
            set((state) => ({ ...state, error }))
        } finally {
            set((state) => ({ ...state, fetching: false }))
        }
    },
    add(item) {
        set(state => ({ ...state, data: [...state.data, item] }))
    },
}))

export const useApprovedReservationsStore = create<IDataStoreState<IReservation>>()((set) => ({
    data: [],
    fetching: false,
    async fetchAll() {
        try {
            set((state) => ({ ...state, fetching: true }))
            const res = await axios.get<IReservation[]>(route('api.reservations.index', { status: 'Approved' }));
            set((state) => ({ ...state, data: res.data }))
        } catch (error: unknown) {
            set((state) => ({ ...state, error }))
        } finally {
            set((state) => ({ ...state, fetching: false }))
        }
    },
    add(item) {
        set(state => ({ ...state, data: [...state.data, item] }))
    },
}))

export const useCancellationRequestsStore = create<IDataStoreState<ICancellationRequest>>()((set) => ({
    data: [],
    fetching: false,
    async fetchAll() {
        try {
            set((state) => ({ ...state, fetching: true }))
            const res = await axios.get<ICancellationRequest[]>(route('api.admin.cancellation_requests.index', { status: 'Pending' }));
            set((state) => ({ ...state, data: res.data }))
        } catch (error: unknown) {
            set((state) => ({ ...state, error }))
        } finally {
            set((state) => ({ ...state, fetching: false }))
        }
    },
    add(item) {
        set(state => ({ ...state, data: [...state.data, item] }))
    },
}))

// notifications
export const useAdminNotificationsStore = create<IDataStoreState<INotification>>()((set) => ({
    data: [],
    fetching: false,
    async fetchAll(url = route('admin.notifications.index')) {
        try {
            set((state) => ({ ...state, fetching: true }))
            const res = await axios.get<INotification[]>(url);
            set((state) => ({ ...state, data: res.data }))
        } catch (error: unknown) {
            set((state) => ({ ...state, error }))
        } finally {
            set((state) => ({ ...state, fetching: false }))
        }
    },
    add(item) {
        set((state) => ({ ...state, data: [...state.data, item] }))
    },
}))

export const useCustomerNotificationsStore = create<IDataStoreState<INotification>>()((set) => ({
    data: [],
    fetching: false,
    async fetchAll(url = route('notifications.index')) {
        try {
            set((state) => ({ ...state, fetching: true }))
            const res = await axios.get<INotification[]>(url);
            set((state) => ({ ...state, data: res.data }))
        } catch (error: unknown) {
            set((state) => ({ ...state, error }))
        } finally {
            set((state) => ({ ...state, fetching: false }))
        }
    },
    add(item) {
        set((state) => ({ ...state, data: [...state.data, item] }))
    },
}))
