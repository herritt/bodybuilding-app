import "./PlateInventory.css";
import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";

const PlateInventorySelector = () => {
	const { user } = useUser();

	// Define the order and initial counts separately
	const plateWeights = [
		0.25, 0.5, 0.75, 1, 1.25, 2.5, 5, 7.5, 10, 15, 20, 25, 30, 35, 45, 50, 55, 100,
	];
	const initialPlateCounts = plateWeights.reduce((acc, weight) => ({ ...acc, [weight]: 0 }), {});

	const [plateInventory, setPlateInventory] = useState(initialPlateCounts);

	// Increment plate count
	const incrementCount = (weight) => {
		setPlateInventory((prevState) => ({
			...prevState,
			[weight]: prevState[weight] + 1,
		}));
	};

	// Decrement plate count
	const decrementCount = (weight) => {
		setPlateInventory((prevState) => ({
			...prevState,
			[weight]: prevState[weight] > 0 ? prevState[weight] - 1 : 0,
		}));
	};

	// Example submission function
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Plate Inventory:", plateInventory);
		// Logic to save this data could be added here
	};

	return (
		<form onSubmit={handleSubmit} className="plate-inventory-form">
			<h2>Select Plate Inventory (lbs)</h2>
			<div className="plate-inventory-container">
				{plateWeights.map((weight) => (
					<div key={weight} className="plate-inventory-item">
						<label>
							<span className="weight-circle">{weight}</span>
						</label>
						<div className="plate-count-adjust">
							<button type="button" onClick={() => decrementCount(weight)}>
								-
							</button>
							<input type="text" readOnly value={plateInventory[weight]} />
							<button type="button" onClick={() => incrementCount(weight)}>
								+
							</button>
						</div>
					</div>
				))}
			</div>
			{user ? (
				<button className="save-inventory-button" type="submit">
					Save Inventory
				</button>
			) : (
				<div>Please sign in to save your inventory</div>
			)}
		</form>
	);
};

export default PlateInventorySelector;
