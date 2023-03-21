import {readFileSync} from "fs";
let ConfigInternal: ConfigData | null = null;

function loadConfig(): ConfigData {
    if (!ConfigInternal) {
        const data = readFileSync(process.cwd() + "/config.json");
        if (data) {
            ConfigInternal = JSON.parse(data.toString()) as ConfigData;
        } else {
            throw new Error("Could not load config json.")
        }
    }
    return ConfigInternal;
}

export const Config = loadConfig();

export interface ConfigData {
    database: DatabaseData,
    storage: StorageData,
    server: ServerData,
    documents: {
        [key: string]: string
    },
}

export interface DatabaseData {
    database: string,
    host: string,
    password: string,
    port: number,
    user: string
}

export interface StorageData {
    file: boolean,
    expire: number | null,
    maxSize: number | null,
    keyLength: number | null,
}

export interface ServerData {
    port: number
}
