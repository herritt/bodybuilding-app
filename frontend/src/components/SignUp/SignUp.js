import React from "react";

const SignUp = () => {
	const handleGoogleSignUp = () => {
		// Send the user to the backend API route for Google sign up
		window.location.href = "http://localhost:3001/auth/google";
	};

	return (
		<div>
			<h1>Sign Up</h1>
			{/* Add your sign up form or content here */}
			<button onClick={handleGoogleSignUp}>Sign up with Google</button>
		</div>
	);
};

export default SignUp;
