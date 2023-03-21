import {Config} from "./config";
import {KeyGen} from "./keygen";

export abstract class Storage {

    public push(data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const key = KeyGen.generateKey(Config.storage.keyLength || 8);
            this.get(key, true)
                .then(() => this.push(data))
                .catch(() => {
                    this.set(key, data, false)
                        .then(() => resolve(key))
                        .catch(reject);
                });
        });
    }

    abstract set(key: string, data: string, skipExpire: boolean): Promise<void>;
    abstract get(key: string, skipExpire: boolean): Promise<string>;

}