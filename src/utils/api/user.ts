import { MotifApiInstance, UserResponse } from "types";


export default function addUser(api: MotifApiInstance): void {
    const urlPrefix = '/user';

    api.user = {
        fetchUser: async (userId: string): Promise<UserResponse | null> => {
            const response = await api.get(`${urlPrefix}/${userId}`);
            return response?.data || null;
        }, 
    };
};
