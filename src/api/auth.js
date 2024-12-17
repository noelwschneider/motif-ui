
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
            const csrfToken = getCookie('csrf_refresh_token');
            return api.post(urlPrefix + '/refresh', null, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
        },

        logout: async () => {
            return api.post(urlPrefix + '/logout');
        },

        verify: async () => {
            return api.get(urlPrefix + '/verify');
        },
    };

    addInterceptor(api);
}


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
                const csrfToken = getCookie('csrf_refresh_token');
                const { data } = await api.post('/auth/refresh', null, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
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

    api.interceptors.request.use((config) => {
        const csrfToken = getCookie('csrf_access_token');
        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }
        return config;
    });
};


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};
