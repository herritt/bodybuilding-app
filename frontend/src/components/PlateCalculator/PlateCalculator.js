import "./PlateCalculator.css";
import React, { useState } from "react";

function PlateCalculator() {
	const [weight, setWeight] = useState("");
	const [plates, setPlates] = useState([]);

	const handleCalculatePlates = () => {
		console.log("Calculating plates for weight:", weight);
		if (!weight) {
			console.log("Please enter a weight");
		} else if (parseInt(weight) < 45) {
			console.log("Weight is less than 45lbs");
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
					// Handle the response from the backend
					console.log(data);
					setPlates(data.plates);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	};

	return (
		<div className="plate-calculator">
			<div className="plate-calculator-user-input">
				<input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
				<button onClick={handleCalculatePlates}>Calculate Plates</button>
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
