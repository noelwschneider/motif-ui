export default function addReviews(api) {
    const urlPrefix = '/reviews';

    api.reviews = {
        create: async ({ 
            comment, 
            isPrivate, 
            rating, 
            spotifyArtistId, 
            spotifyId 
        }) => {
            if (!spotifyId || !spotifyArtistId) return null;
            
            return api.post(urlPrefix + '/', { 
                comment, 
                isPrivate, 
                rating, 
                spotifyArtistId, 
                spotifyId 
            });
        },

        delete: async (reviewId) => {
            return api.delete(`${urlPrefix}/${reviewId}`);
        },

        update: async (reviewId, { comment, isPrivate, rating, }) => {
            return api.put(`${urlPrefix}/${reviewId}`, { comment, isPrivate, rating, });
        },

        currentUser: async () => {
            return api.get(urlPrefix + '/');
        },

        getArtist: async (artistId) => {
            return api.get(`${urlPrefix}/artist/${artistId}`)
        },
    };
};
