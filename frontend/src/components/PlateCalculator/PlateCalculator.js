import "./PlateCalculator.css";
import React, { useState } from "react";

function PlateCalculator() {
	// temporary place to store constants until we have the ability to create own weights
	const allPlates = [45, 35, 25, 15, 10, 5, 2.5, 1, 0.75, 0.5, 0.25];

	const maxWeight = allPlates.reduce((total, plate) => total + plate, 0) * 2 + 45;

	const [weight, setWeight] = useState("");
	const [plates, setPlates] = useState([]);
	const [message, setMessage] = useState("Enter the weight you want to lift");

	const handleCalculatePlates = () => {
		if (!weight) {
			setMessage("Enter the weight you want to lift");
		} else if (parseInt(weight) <= 45) {
			setMessage("Weight has to be greater than weight of the bar (45lb)");
		} else {
			// Send the weight to the backend API route for calculating the plates
			// Replace `apiRoute` with the actual API route
			fetch("/api/calculatePlates", {
				method: "POST",
				body: JSON.stringify({ weight: weight }),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					let totalWeight = data.plates.reduce((total, plate) => total + plate, 0) * 2 + 45;

					if (totalWeight >= maxWeight) {
						setMessage(`Max weight of ${totalWeight}lb loaded!`);
					} else {
						setMessage(`${totalWeight}lb loaded!`);
					}
					setPlates(data.plates);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleCalculatePlates();
		}
	};

	return (
		<div className="plate-calculator">
			<div className="plate-calculator-user-input">
				<input
					type="text"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
				<button onClick={handleCalculatePlates}>Calculate Plates</button>
				<p className="plate-calculator-user-input-label">{message}</p>
			</div>
			<div className="plates-container">
				{plates.map((plate, index) => {
					let className = "";
					if (plate >= 35) className = "large-plate";
					else if (plate >= 10) className = "medium-plate";
					else className = "small-plate";

					return (
						<div key={index} className={className}>
							{plate}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PlateCalculator;
