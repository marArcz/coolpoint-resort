import { clsx, type ClassValue } from "clsx"
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatToCurrency(num: number) {
    return num.toLocaleString("en-US", { style: "currency", currency: 'PHP', currencySign: 'standard' });
}

export function getSum(arr: number[]): number {
    let sum = 0;
    arr.forEach(num => sum += num);

    return sum;
}

export function getTotalNights(from:Date | undefined,to:Date | undefined):number
{
    return from && to ? differenceInDays(to, from) : 0;
}
