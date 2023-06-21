import { Client } from "./client";

export interface ResponseCourier {
    status: string;
    sentOn: string;
    statusCode: string;
    transactionId: string;
    msg: string;
    resValues: Client[];
}