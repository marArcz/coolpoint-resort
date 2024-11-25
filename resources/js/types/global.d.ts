import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import type { Page } from '@inertiajs/core'
import { PageProps } from '.';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        Pusher: typeof Pusher
    }

    var route: typeof ziggyRoute;
}

declare module '@inertiajs/react'{
    export function usePage<T>(): Page<PageProps>
}
