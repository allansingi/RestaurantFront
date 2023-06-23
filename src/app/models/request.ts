export interface Request {
    id?: any;
    client: any;
    courier: any;
    requestedMenuId: string;
    requestedMenuName: string;
    requestedQuantity: string;
    deliveryAddress: string;
    createDate?: string;
    updateDate?: string;
    deliveredDate?: string;
    requestStatus: string;
}