import "./App.css";
import { Header, PlateCalculator, PlateInventory, SignUp } from "./components";
import { Routes, Route, Link } from "react-router-dom";

function App() {
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
