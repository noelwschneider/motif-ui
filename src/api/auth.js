export default function addAuth(api) {
    const urlPrefix = '/auth';

    api.auth = {
        login: async ({ email, password }) => {
            return api.post(urlPrefix + '/login', { email, password });
        },

        register: async ({ username, email, password }) => {
            return api.post(urlPrefix + '/register', { username, email, password });
        },

        logout: async () => {
            return api.post(urlPrefix + '/logout');
        },

        verify: async () => {
            return api.get(urlPrefix + '/verify');
        },
    };
};
