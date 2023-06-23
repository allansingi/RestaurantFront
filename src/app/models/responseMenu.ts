import { Menu } from "./menu";

export interface ResponseMenu {
    status: string;
    sentOn: string;
    statusCode: string;
    transactionId: string;
    msg: string;
    resValues: Menu[];
}