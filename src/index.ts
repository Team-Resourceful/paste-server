import express from "express";
import {readdir} from "fs/promises";
import {PublicApiEndpoint} from "./utils/types";
import {Config} from "./utils/config";
import {FileStorage} from "./storage/file";
import {MysqlStorage} from "./storage/mysql";

const app = express()
export const storage = Config.storage.file ? new FileStorage() : new MysqlStorage();

app.use(express.text())

app.use("/", express.static("public", {
    extensions: ["html"]
}))

app.get("/document/:id", async (req, res) => {
    res.sendFile(process.cwd() + "/public/document.html")
});

app.get("/document/:id/raw", async (req, res) => {
    const id = req.params.id;
    if (id) {
        const doc = Config.documents[id] || null;

        storage.get(id, doc !== undefined)
            .then(data => {
                if (data) {
                    res.contentType("text/plain").status(200).send(data);
                } else {
                    res.status(404).json({error: "Document not found."});
                }
            })
            .catch(() => res.status(404).send("Document not found."));
    } else {
        res.status(400).json({
            error: "Missing document id."
        })
    }
});

readdir("./dist/paths/public")
    .then(r => r.filter(file => file.endsWith(".js")))
    .then(files => files.forEach(async file => {
        const endpoint: PublicApiEndpoint = (await import(`./paths/public/${file}`)).default;
        app.route(`/api/v1/public/${endpoint.path}`)[endpoint.type](endpoint.execute)
    }))

app.get("/", (req,res) => res.sendFile(process.cwd() + "/public/index.html"));

app.listen(Config.server.port)

console.log(`Listening on port: http://localhost:${Config.server.port}`)

process.on('uncaughtException', function(err) {
    console.log(err)
})