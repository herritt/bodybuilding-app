const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 3001;
const { calculatePlate } = require("./utils/Calculator");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("./utils/oauth");

mongoose
	.connect(process.env.MONGO_DB_URL)
	.then(() => console.log("MongoDB connected…"))
	.catch((err) => console.log(err));

app.use(express.json());

app.use(
	session({
		secret: "your session secret",
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/api/calculatePlates", (req, res) => {
	let plates = calculatePlate(req.body.weight);
	res.json({ plates: plates });
});

app.get("/api/current_user", (req, res) => {
	if (req.isAuthenticated()) {
		// Check if the user is authenticated
		res.send({ user: req.user, loggedIn: true });
	} else {
		res.send({ loggedIn: false });
	}
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
