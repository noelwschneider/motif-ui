export default function addSpotify(api) {
    const urlPrefix = '/spotify';
    
    api.spotify = {

        artistProfile: async (id) => {
            return api.get(urlPrefix + '/artist-profile', {
                params: { id }
            });
        },

        callback: async ( code ) => {
            return api.get(urlPrefix + '/callback' + `?code=${code}`);
        },

        search: async ({
            query = '', 
            type = 'album,artist,track', 
            limit = 20, 
            offset = 0, 
            market = "US", 
            album = "", 
            artist = "", 
            track = "", 
            genre = ""
        }) => {
            let q = query;
            q += album ? ` album:${album}` : '';
            q += artist ? ` artist:${artist}` : '';
            q += genre ? ` genre:${genre}` : '';
            q += track ? ` track:${track}` : '';

            if (!q) return null;

            return api.get(urlPrefix + '/search', {
                params: { q, type, limit, market, offset },
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
