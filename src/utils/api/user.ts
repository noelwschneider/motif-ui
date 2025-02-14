import { MotifApiInstance } from "app/api";

export interface UserResponse {
    id: number;
    username: string;
    displayName: string;
    profilePicUrl: string;
    createDate: string;
};

export interface UserApi {
    fetchUser: (userId: string) => Promise<UserResponse | null>;
};


export default function addUser(api: MotifApiInstance): void {
    const urlPrefix = '/user';

    api.user = {
        fetchUser: async (userId: string): Promise<UserResponse | null> => {
            const response = await api.get(`${urlPrefix}/${userId}`);
            return response?.data || null;
        }, 
    };
};
