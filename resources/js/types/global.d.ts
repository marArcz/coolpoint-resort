import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import type { Page } from '@inertiajs/core'
import { PageProps } from '.';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
}

declare module '@inertiajs/react'{
    export function usePage<T>(): Page<PageProps>
}
