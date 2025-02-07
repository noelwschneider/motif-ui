import { AuthLoginArgs, AuthRegisterArgs, MotifApiInstance, UserResponse } from 'types';

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
