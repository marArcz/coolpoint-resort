export interface User {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    phone: string;
    email: string;
    email_verified_at: string;
    photo:string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user?: User;
    };
    currentRoute:string,
    flash:{
        message:{
            success:string | null,
            error:string | null,
        }
    }
};
