import { MotifApiInstance } from "app/api";
import { AxiosResponse } from "axios";

export interface Catalog {
    comment: string;
    imageUrl: string;
    isPrivate: boolean;
    name: string;
};

export interface CatalogItem {
    comment: string;
    position: number;
    spotifyArtistId: string;
    spotifyId: string;
};

export interface CatalogsApi {
    addItem: (catalogId: number, item: CatalogItem) => Promise<AxiosResponse>;
    createCatalog: (catalog: Catalog) => Promise<AxiosResponse>;
    deleteCatalog: (catalogId: number) => Promise<AxiosResponse>;
    deleteItem: (itemId: number) => Promise<AxiosResponse>;
    getCatalogById: (catalogId: number) => Promise<AxiosResponse>;
    getCurrentUserCatalogs: () => Promise<AxiosResponse>;
    getUserPublicCatalogs: (userId: number) => Promise<AxiosResponse>;
    updateCatalog: (catalogId: number, catalog: Catalog) => Promise<AxiosResponse>;
    updateCatalogItem: (itemId: number, item: CatalogItem) => Promise<AxiosResponse>;
};


export default function addCatalogs(api: MotifApiInstance) {
    const urlPrefix = '/catalogs';
    
    api.catalogs = {
        addItem: async (catalogId: number, { 
            spotifyId,
            spotifyArtistId,
            comment,
            position,
        }: CatalogItem) => {
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
