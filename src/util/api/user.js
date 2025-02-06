export default function addUser(api) {
    const urlPrefix = '/user';

    api.user = {
        fetchUser: async (userId) => {
            return api.get(`${urlPrefix}/${userId}`);
        }, 
    };
};