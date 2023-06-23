import { Request } from "./request";

export interface ResponseRequest {
    status: string;
    sentOn: string;
    statusCode: string;
    transactionId: string;
    msg: string;
    resValues: Request[];
}