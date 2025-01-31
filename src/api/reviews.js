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
            return api.delete(urlPrefix + `/${reviewId}`);
        },

        update: async ({ reviewId, rating, comment, isPrivate }) => {
            return api.put(urlPrefix + `/${reviewId}`, { rating, comment, isPrivate });
        },

        currentUser: async () => {
            return api.get(urlPrefix + '/');
        },
    }
};