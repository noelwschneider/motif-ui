import { MotifApiInstance } from "app/api";
import { UserResponse } from "./user";


// ? can this be set programmatically to match auth.api?
export interface AuthApi {
    login: (args: AuthLoginArgs) => Promise<UserResponse | null>;
    register: (args: AuthRegisterArgs) => Promise<string | null>;
    logout: () => Promise<string | null>;
    verify: () => Promise<UserResponse | null>;
};

export interface AuthLoginArgs {
    email: string;
    password: string;
};

export interface AuthRegisterArgs {
    email: string;
    password: string;
    username: string;
};


export default function addAuth(api: MotifApiInstance): void {
    const urlPrefix = '/auth';

    api.auth = {
        login: async ({ email, password }: AuthLoginArgs): Promise<UserResponse | null> => {
            const response = await api.post(`${urlPrefix}/login`, { email, password });
            return response?.data || null;
        },

        register: async ({ username, email, password }: AuthRegisterArgs): Promise<string | null> => {
            const response = await api.post(`${urlPrefix}/register`, { username, email, password });
            return response?.data?.message || null;
        },

        logout: async (): Promise<string | null> => {
            const response = await api.post(`${urlPrefix}/logout`);
            return response?.data?.message || null;
        },

        verify: async (): Promise<UserResponse | null> => {
            const response = await api.get(`${urlPrefix}/verify`);
            return response?.data || null;
        },
    };
};
