import React from "react";
import GoogleButton from "react-google-button";

const SignUp = () => {
	const handleGoogleSignUp = (response) => {
		// Send the user to the backend API route for Google sign up
		window.location.href = "http://localhost:3001/auth/google";
	};

	return (
		<div>
			<h1>Sign In</h1>
			<GoogleButton onClick={handleGoogleSignUp} />
		</div>
	);
};

export default SignUp;
