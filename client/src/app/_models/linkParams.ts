export class LinkParams {
    maxExpiryDate = 8640;
    pageNumber = 1;
    pageSize = 9;
    orderBy = 'newest';
    all = false;
    
    constructor(maxExpiryDate?: number, pageNumber?: number, pageSize?: number, orderBy?: string, all?: boolean){}
}