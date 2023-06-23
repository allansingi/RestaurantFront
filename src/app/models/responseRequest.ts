import { Request } from "./request";

export interface ResponseCourier {
    status: string;
    sentOn: string;
    statusCode: string;
    transactionId: string;
    msg: string;
    resValues: Request[];
}