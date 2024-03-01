const express = require("express");
const router = express.Router();
const User = require("../model/User");

// GET all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET a specific user
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST a new user
router.post("/", async (req, res) => {
	const user = new User({
		googleId: req.body.googleId,
		displayName: req.body.displayName,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		profilePicture: req.body.profilePicture,
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// PATCH (update) a user
router.patch("/:id", getUser, async (req, res) => {
	if (req.body.googleId != null) {
		res.user.googleId = req.body.googleId;
	}
	if (req.body.displayName != null) {
		res.user.displayName = req.body.displayName;
	}
	if (req.body.firstName != null) {
		res.user.firstName = req.body.firstName;
	}
	if (req.body.lastName != null) {
		res.user.lastName = req.body.lastName;
	}
	if (req.body.email != null) {
		res.user.email = req.body.email;
	}
	if (req.body.profilePicture != null) {
		res.user.profilePicture = req.body.profilePicture;
	}

	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE a user
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: "User deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find user" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;
