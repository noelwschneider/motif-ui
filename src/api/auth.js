
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

    addInterceptors(api);
};


function addInterceptors(api) {
    api.interceptors.response.use((response) => {
        try {
            const newCsrfToken = getCookie('csrf_access_token');
            api.defaults.headers['X-CSRF-TOKEN'] = newCsrfToken;
            return response;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            throw error;
        };
    });

    api.interceptors.request.use((config) => {
        const csrfToken = getCookie('csrf_access_token');
        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        };
        return config;
    });
};


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};
