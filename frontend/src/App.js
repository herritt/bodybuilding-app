import "./App.css";
import { Header, PlateCalculator } from "./components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Header />
			</header>
			<Routes>
				<Route path="/" element={<Link to="/plate-calculator" />} />
				<Route path="/plate-calculator" element={<PlateCalculator />} />
				<Route path="/plate-inventory" element={<h1>Plate Inventory</h1>} />
			</Routes>
		</div>
	);
}

export default App;
