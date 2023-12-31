import { Courier } from "./courier";

export interface ResponseCourier {
    status: string;
    sentOn: string;
    statusCode: string;
    transactionId: string;
    msg: string;
    resValues: Courier[];
}