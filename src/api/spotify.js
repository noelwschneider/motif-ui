export default function addSpotify(api) {
    const urlPrefix = '/spotify';
    
    api.spotify = {
        callback: async ( code ) => {
            return api.get(urlPrefix + '/callback' + `?code=${code}`);
        },

        search: async ({q, type = 'track', limit = 20, offset = 0}) => {
            return api.get(urlPrefix + '/search', {
                params: { q, type, limit, offset },
            });
        },

        user: async () => {
            return api.get(urlPrefix + '/user');
        },

        login: async () => {
            return api.get(urlPrefix + '/login');
        },
    };
};
