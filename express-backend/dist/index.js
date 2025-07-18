"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
client.connect();
app.post("/submit", (req, res) => {
    const { problemId, userId, code, language } = req.body;
    //push this to a database prisma.submission.create()
    client.lpush("submissions", JSON.stringify({ problemId, userId, code, language }));
    res.json({ message: "submission added to queue" });
});
try {
    app.listen(3000, () => {
        console.log("server is running on port 3000");
    });
}
catch (error) {
    console.log(error);
}
