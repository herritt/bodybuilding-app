require("dotenv").config();

const passport = require("passport");
const User = require("../model/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
			clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
		},
		async function (accessToken, refreshToken, profile, cb) {
			try {
				let user = await User.findOne({ googleId: profile.id });
				if (!user) {
					// Split the displayName to attempt to get first and last names
					// This is a basic split and might not work perfectly for all names
					let names = profile.displayName.split(" ");
					let firstName = names[0] || "";
					let lastName = names.slice(1).join(" ") || "";

					// Create the user with the correct mapping
					user = await User.create({
						googleId: profile.id,
						displayName: profile.displayName,
						firstName: firstName,
						lastName: lastName,
						email: profile.emails[0].value,
						profilePicture: profile.photos[0].value, // Assuming the profile picture URL is stored here
					});
				}
				cb(null, user);
			} catch (err) {
				cb(err);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id); // Use MongoDB's _id for session
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id); // Find user by MongoDB's _id
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// const FacebookStrategy = require("passport-facebook").Strategy;

// passport.use(
// 	new FacebookStrategy(
// 		{
// 			clientID: YOUR_FACEBOOK_APP_ID,
// 			clientSecret: YOUR_FACEBOOK_APP_SECRET,
// 			callbackURL: "http://yourdomain.com/auth/facebook/callback",
// 		},
// 		function (accessToken, refreshToken, profile, cb) {
// 			// Find or create a user in your database
// 			User.findOrCreate({ facebookId: profile.id }, function (err, user) {
// 				return cb(err, user);
// 			});
// 		}
// 	)
// );

module.exports = passport;
