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
		function (accessToken, refreshToken, profile, cb) {
			// Here, you would find or create a user in your database
			// and pass the user to the cb (callback)
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return cb(err, user);
			});
		}
	)
);

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
