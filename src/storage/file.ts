import {Storage} from "../utils/storage";
import * as fs from "fs";

export class FileStorage extends Storage {

    private readonly path: string;

    constructor() {
        super();
        this.path = "./data";
    }

    public override set(key: string, data: string, skipExpire: boolean = false): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.mkdir(this.path, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    fs.writeFile(`${this.path}/${key}`, data, "utf8",(err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    public override get(key: string, skipExpire: boolean = false): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const file = this.path + '/' + key;
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                    reject({
                        status: 404,
                        message: 'Document not found.'
                    });
                } else {
                    resolve(data);
                }
            });
        });
    }

}