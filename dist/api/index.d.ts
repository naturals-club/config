import { CRUD } from "./crud";
export declare const api: {
    paymentMethods: CRUD;
    documentTypes: CRUD;
    countries: CRUD;
    exercises: CRUD;
    students: CRUD;
    routines: CRUD;
    consults: CRUD;
    workouts: CRUD;
    states: CRUD;
    diets: CRUD;
    foods: CRUD;
    users: CRUD;
    plans: CRUD;
    chats: {
        status: () => any;
        qrcode: () => any;
        list: () => Promise<any>;
        get: (id: string) => Promise<any>;
        create: (data: import("./chats").CreateChatParams) => Promise<any>;
        update: ((id: string, data: any) => Promise<any>) & {
            agent: (id: string) => Promise<any>;
        };
        conversations: {
            ai: (id: string | number, enabled: boolean) => Promise<unknown>;
            list: () => Promise<unknown>;
            messages: {
                send: (id: string | number, message: string) => Promise<unknown>;
                get: (id: string | number) => Promise<unknown>;
            };
        };
    };
    legal: {
        privacy: () => Promise<unknown>;
        terms: () => Promise<unknown>;
    };
    contacts: CRUD & Record<string, any>;
    setup: {
        setBaseUrl: (url: string) => void;
        setHeaders: (headers: Record<string, any>) => void;
        setAuthorization: (token: string) => void;
    };
    auth: {
        me: () => Promise<unknown>;
        signin: (data: any) => Promise<unknown>;
        refresh: (refreshToken: any) => Promise<unknown>;
        password: {
            forgot: (data: any) => Promise<unknown>;
            reset: (data: any) => Promise<unknown>;
        };
    };
};
