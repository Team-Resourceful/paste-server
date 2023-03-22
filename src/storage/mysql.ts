import {Database} from "../utils/database";
import {Config} from "../utils/config";
import {Storage} from "../utils/storage";

export class MysqlStorage extends Storage {

    private database: Database;

    constructor() {
        super();
        this.database = new Database(Config.database);
        this.database.connect()
            .catch(() => {
                console.error('Failed to connect to database.');
                process.exit(1);
            });
    }

    public override set(key: string, data: string, skipExpire: boolean = false): Promise<void> {
        const now = Math.floor(Date.now() / 1000);

        return new Promise<void>((resolve, reject) => {
            this.database.query(
                'INSERT IGNORE INTO `entries` (`key`, `value`, `expiration`) VALUES (?)',
                [[key, data, (Config.storage.expire && !skipExpire) ? Config.storage.expire + now : null]]
            )
                .then(() => resolve())
                .catch(() => {
                    //winston.error('failed to set mysql document', { key: key, error: err });
                    reject();
                });
        });
    }

    public override get(key: string, skipExpire: boolean = false): Promise<string> {
        const now = Math.floor(Date.now() / 1000);

        return new Promise<string>((resolve, reject) => {
            this.database.query(
                'SELECT `id`, `value`, `expiration` FROM `entries` WHERE `key` = ? AND (`expiration` IS NULL OR `expiration` > ?)',
                [key, now]
            ).then(async (results: any) => {
                if (results.length) {
                    if (Config.storage.expire && !skipExpire) {
                        await this.database.query(
                            'UPDATE `entries` SET `expiration` = ? WHERE `id` = ?',
                            [Config.storage.expire + now, results[0].id]
                        );
                    }
                    resolve(results[0].value);
                } else {
                    reject({
                        status: 404,
                        message: 'Document not found.'
                    });
                }
            }).catch(() => {
                //winston.error('error retrieving value from mysql', { error: err });
                reject({
                    status: 500,
                    message: 'Internal server error.'
                });
            });
        });
    }

}