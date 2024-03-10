const express = require("express");
const router = express.Router();
const passport = require("../utils/oauth");

// Route to start the authentication process with Google
router.get(
	"/google",
	(req, res, next) => {
		console.log("Initiating authentication with Google.");
		next(); // Pass control to the next middleware
	},
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google will redirect to after successful authentication
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "http://localhost:3000/sign-up" }),
	function (req, res) {
		// Successful authentication, redirect home or to another page
		console.log("Signed in with Google");
		res.redirect("http://localhost:3000/");
	}
);

module.exports = router;
