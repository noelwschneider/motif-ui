import { MotifApiInstance } from "app/api";
import { AxiosResponse } from "axios";

interface ArtistReviews {
    comment: string;
    createdDate: string;
    displayName: string;
    rating: number;
    reviewId: number;
    spotifyId: string;
    updatedDate: string;
    upvotes: number;
    userId: number;
    username: string;
};

interface Review {
    comment?: string;
    createdDate: string;
    downvotes: number;
    id: number;
    isPrivate: boolean;
    rating: number;
    spotifyArtistId: string;
    spotifyId: string;
    updatedDate: string;
    upvotes: number;
    userId: number;
};


export interface ReviewsApi {
    create: (args: Review) => Promise<AxiosResponse>;  // todo: fix any
    currentUser: () => Promise<Review[]>;
    delete: (reviewId: number) => Promise<AxiosResponse>;
    getArtist: (artistId: string) => Promise<ArtistReviews[]>;
    update: (reviewId: number, args: Review) => Promise<AxiosResponse>;

};

export default function addReviews(api: MotifApiInstance) {
    const urlPrefix = '/reviews';

    // todo: return type for non-GET routes
    api.reviews = {
        create: async ({ 
            comment, 
            isPrivate, 
            rating, 
            spotifyArtistId, 
            spotifyId 
        }: Review) => {
            if (!spotifyId || !spotifyArtistId) return null;
            
            return api.post(urlPrefix + '/', { 
                comment, 
                isPrivate, 
                rating, 
                spotifyArtistId, 
                spotifyId 
            });
        },

        delete: async (reviewId: number) => {
            return api.delete(`${urlPrefix}/${reviewId}`);
        },

        update: async (reviewId: number, { comment, isPrivate, rating, }: Review) => {
            return api.put(`${urlPrefix}/${reviewId}`, { comment, isPrivate, rating, });
        },

        currentUser: async (): Promise<Review[]> => {
            return api.get(urlPrefix + '/');
        },

        getArtist: async (artistId: string): Promise<ArtistReviews[]> => {
            const response = await api.get(`${urlPrefix}/artist/${artistId}`);
            return response?.data || response || null;
        },
    } as ReviewsApi;
};
