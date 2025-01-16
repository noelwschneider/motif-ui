export default function addCatalogs(api) {
    const urlPrefix = '/catalogs';
    
    api.catalogs = {
        addItem: async (catalogId, { itemId, itemType, position, notes }) => {
            return api.post(`${urlPrefix}/${catalogId}/items`, { itemId, itemType, position, notes });
        },

        create: async ({ description, name, isPrivate }) => {
            return api.post(urlPrefix + '/', { description, name, isPrivate });
        },

        delete: async (id) => {
            return api.delete(`${urlPrefix}/${id}`);
        },

        deleteItem: async (catalogId, itemId) => {
            return api.delete(`${urlPrefix}/${catalogId}/items/${itemId}`);
        },

        getAll: async () => {
            return api.get(urlPrefix + '/');
        },

        update: async (id, { description, name, isPrivate }) => {
            return api.put(`${urlPrefix}/${id}`, { description, name, isPrivate });
        },   
    };
};
