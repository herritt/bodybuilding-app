const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 3001;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
