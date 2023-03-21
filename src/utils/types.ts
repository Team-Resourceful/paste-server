import {Request, Response} from "express";

export interface PublicApiEndpoint {
    path: string;
    type: MethodType;
    execute(request: Request, response: Response): void;
}

export enum MethodType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}