import { Client } from "./client";

export interface ResponseClient {
    status: string;
    sentOn: string;
    statusCode: string;
    transactionId: string;
    msg: string;
    resValues: Client[];
}