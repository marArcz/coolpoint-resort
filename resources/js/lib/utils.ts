import { INavLink } from "@/types/models";
import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export const asset = (path:string) => {
    // remove forward slash from path
    if(path.length > 0 && (path[0] == '/' || path[0] == "\\")){
        path = path.substring(1);
    }
    return `${window.location.origin}/${path}`;
};

export const fetchFile = async (file:string) => {
    try {
        const res = await axios.get(route('file.serve',[file]));
        console.log('fetched file response: ', res);
        return res.data;
    } catch (error) {
        console.error('error fetching file: ', error);
    }

    return '';
}

export function formatToCurrency(num: number) {
    return num.toLocaleString("en-US", { style: "currency", currency: 'PHP', currencySign: 'standard' });
}

export function getSum(arr: number[]): number {
    let sum = 0;
    arr.forEach(num => sum += num);

    return sum;
}

export function getTotalNights(from: Date | undefined, to: Date | undefined): number {
    return from && to ? differenceInDays(to, from) : 0;
}

export function isINavLink(item: any): item is INavLink {
    return item && typeof item.label === 'string' && typeof item.icon == 'string' && typeof item.href == 'string';
}
