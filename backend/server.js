const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 3001;
const { calculatePlate } = require("./utils/Calculator");

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/api/calculatePlates", (req, res) => {
	console.log("req.body:", req.body);
	let plates = calculatePlate(req.body.weight);
	res.json({ plates: plates });
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
