export interface Link {
    id: number;
    shortLink: string;
    link: string;
    created: string;
    expiryDate?: string;
    userId: number;
    usageCount: number;
}