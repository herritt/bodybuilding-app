const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	googleId: { type: String, unique: true, required: true },
	displayName: String,
	firstName: String,
	lastName: String,
	email: { type: String, unique: true, sparse: true },
	profilePicture: String,
});

userSchema.statics.findOrCreate = function findOrCreate(condition, callback) {
	const self = this;
	self.findOne(condition, function (err, result) {
		return result
			? callback(err, result)
			: self.create(condition, function (err, result) {
					return callback(err, result);
			  });
	});
};

const User = mongoose.model("User", userSchema);

module.exports = User;
