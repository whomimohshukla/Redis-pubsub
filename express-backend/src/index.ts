import express from "express";

import { createClient } from "redis";

const client = createClient();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

client.connect();

app.post("/submit", (req, res) => {
	const { problemId, userId, code, language } = req.body;

	//push this to a database prisma.submission.create()

	client.lpush(
		"submissions",
		JSON.stringify({ problemId, userId, code, language })
	);

	res.json({ message: "submission added to queue" });
});

app.listen(3000, () => {
	console.log("server is running on port 3000");
});
