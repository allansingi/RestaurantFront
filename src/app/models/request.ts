export interface Request {
    id?: any;
    clientId: string;
    clientName?: string;
    deliveryAddress?: string;
    requestedMenuId: string;
    requestedMenuName?: string;
    requestedQuantity: number;
    courierId?: any;
    courierName?: string;
    createDate?: string;
    updateDate?: string;
    deliveredDate?: string;
    requestStatus?: string;
}