import { CRUD } from "./crud";
export declare const api: {
    workoutSessions: CRUD;
    paymentMethods: CRUD;
    documentTypes: CRUD;
    countries: CRUD;
    exercises: CRUD;
    students: CRUD;
    routines: CRUD;
    consults: CRUD;
    workouts: CRUD & Record<string, any>;
    products: CRUD;
    states: CRUD;
    diets: CRUD;
    foods: CRUD;
    users: CRUD;
    plans: CRUD;
    chats: {
        status: () => any;
        qrcode: () => any;
        list: () => Promise<any>;
        get: (id: string, conversationSid?: string, firstMessage?: any) => Promise<any>;
        create: (data: import("./chats").CreateChatParams) => Promise<any>;
        update: ((id: string, data: any) => Promise<any>) & {
            lastMessage: (id: string, params: {
                content: {
                    id: string;
                    body: string;
                };
                created_at: Date;
            }) => Promise<any>;
            agent: (id: string) => Promise<any>;
        };
        conversations: {
            ai: (id: string | number, enabled: boolean) => Promise<import("axios").AxiosResponse<any, any>>;
            list: () => Promise<import("axios").AxiosResponse<any, any>>;
            messages: {
                send: (id: string | number, message: string) => Promise<import("axios").AxiosResponse<any, any>>;
                get: (id: string | number) => Promise<import("axios").AxiosResponse<any, any>>;
            };
        };
    };
    legal: {
        privacy: () => Promise<import("axios").AxiosResponse<any, any>>;
        terms: () => Promise<import("axios").AxiosResponse<any, any>>;
    };
    contacts: CRUD & Record<string, any>;
    setup: {
        setBaseUrl: (url: string) => void;
        setHeaders: (headers: Record<string, any>) => void;
        setAuthorization: (token: string) => void;
    };
    auth: {
        me: () => Promise<import("axios").AxiosResponse<any, any>>;
        signin: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
        refresh: (refreshToken: any) => Promise<import("axios").AxiosResponse<any, any>>;
        password: {
            forgot: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
            reset: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
        };
    };
};
