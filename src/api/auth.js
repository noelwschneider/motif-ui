export default function addAuth(api) {
    const urlPrefix = '/auth';

    api.auth = {
        login: async ({ email, password }) => {
            return api.post(urlPrefix + '/login', { email, password });
        },

        register: async ({ username, email, password }) => {
            return api.post(urlPrefix + '/register', { username, email, password });
        },

        refreshToken: async () => {
            return api.post(urlPrefix + '/refresh');
        },

        logout: async () => {
            return api.post(urlPrefix + '/logout');
        },

        verify: async () => {
            return api.get(urlPrefix + '/verify');
        },
    };

    addInterceptor(api);
};


function addInterceptor(api) {
    let isRefreshing = false;
    let subscribers = [];

    const onRefreshed = (token) => {
        subscribers.forEach((callback) => callback(token));
        subscribers = [];
    };

    const handleTokenRefresh = async (originalRequest) => {
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const { data } = await api.post('/auth/refresh');
                isRefreshing = false;
                onRefreshed(data.token);
            } catch (error) {
                console.error('Failed to refresh token:', error);
                isRefreshing = false;
                onRefreshed(null);
                throw error;
            }
        }

        return new Promise((resolve, reject) => {
            subscribers.push((token) => {
                if (token) {
                    api(originalRequest).then(resolve).catch(reject);
                } else {
                    reject(new Error('Token refresh failed'));
                }
            });
        });
    };

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url !== '/auth/login' &&
                originalRequest.url !== '/auth/refresh'
            ) {
                originalRequest._retry = true;
                return handleTokenRefresh(originalRequest);
            }

            return Promise.reject(error);
        }
    );
};
