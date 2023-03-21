import {MethodType, PublicApiEndpoint} from "../../utils/types";
import {Request, Response} from "express";
import {Config} from "../../utils/config";
import {storage} from "../../index";

export default {
    path: "documents",
    type: MethodType.POST,
    execute(request: Request, response: Response) {
        const data = request.body;
        if (data) {
            if (data.length > (Config.storage.maxSize || 4096)) {
                response.status(413).end();
            } else {
                storage.push(data)
                    .then((key) => {
                        response.status(200).json({key: key});
                    })
                    .catch(() => {
                        response.status(500).end();
                    });
            }
        } else {
            response.status(400).json({
                error: "Missing document data."
            })
        }
    }
} as PublicApiEndpoint