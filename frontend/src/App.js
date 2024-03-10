import "./App.css";
import { Header, PlateCalculator, PlateInventory, SignUp } from "./components";
import { Routes, Route, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useUser } from "./UserContext";

function App() {
	const { setUser } = useUser();

	useEffect(() => {
		fetch("/api/current_user")
			.then((res) => res.json())
			.then((data) => {
				if (data.loggedIn) {
					setUser(data.user);
				} else {
					console.log("User is not logged in.");
					// Update state or context to reflect no user logged in
				}
			});
	}, [setUser]);

	return (
		<div className="App">
			<header className="App-header">
				<Header />
			</header>
			<Routes>
				<Route path="/" element={<Link to="/plate-calculator" />} />
				<Route path="/plate-calculator" element={<PlateCalculator />} />
				<Route path="/plate-inventory" element={<PlateInventory />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
