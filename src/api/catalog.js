export default function addCatalogs(api) {
    const urlPrefix = '/catalogs';
    
    api.catalogs = {
        addItem: async (catalogId, { 
            spotifyId,
            spotifyArtistId,
            comment,
            position,
        }) => {
            return api.post(`${urlPrefix}/${catalogId}`, {
                spotifyId,
                spotifyArtistId,
                comment,
                position,
            });
        },

        createCatalog: async ({ comment, name, isPrivate, imageUrl }) => {
            return api.post(`${urlPrefix}/`, { comment, name, isPrivate, imageUrl });
        },

        deleteCatalog: async (catalogId) => {
            return api.delete(`${urlPrefix}/${catalogId}`);
        },

        deleteItem: async (itemId) => {
            return api.delete(`${urlPrefix}/item/${itemId}`);
        },

        getCatalogById: async (catalogId) => {
            return api.get(`${urlPrefix}/${catalogId}`);
        },

        getCurrentUserCatalogs: async () => {
            return api.get(`${urlPrefix}/user`);
        },

        getUserPublicCatalogs: async (userId) => {
            return api.get(`${urlPrefix}/user/${userId}`);
        },

        updateCatalog: async (catalogId, { comment, name, isPrivate, imageUrl }) => {
            return api.put(`${urlPrefix}/${catalogId}`, { comment, name, isPrivate, imageUrl });
        },
        
        updateCatalogItem: async (itemId, { position, comment }) => {
            return api.put(`${urlPrefix}/item/${itemId}`, {position, comment })
        },
    };
};
