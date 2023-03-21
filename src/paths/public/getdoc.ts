import {MethodType, PublicApiEndpoint} from "../../utils/types";
import {Request, Response} from "express";
import {Config} from "../../utils/config";
import {storage} from "../../index";

export default {
    path: "documents/:id",
    type: MethodType.GET,
    execute(request: Request, response: Response) {
        const id = request.params.id;
        if (id) {
            const doc = Config.documents[id] || null;

            storage.get(id, doc !== undefined)
                .then(data => {
                    if (data) {
                        response.status(200).json({
                            data,
                            key: id
                        });
                    } else {
                        response.status(404).json({error: "Document not found."});
                    }
                })
                .catch((reason) => response.status(reason.status)
                    .json({
                        error: reason.message
                    })
                );

        } else {
            response.status(400).json({
                error: "Missing document id."
            })
        }
    }
} as PublicApiEndpoint