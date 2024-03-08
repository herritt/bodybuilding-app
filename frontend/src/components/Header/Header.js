import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faCircleNotch, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Header() {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to="/plate-calculator">
							<FontAwesomeIcon icon={faDumbbell} /> Plate Calculator
						</Link>
					</li>
					<li>
						<Link to="/plate-inventory">
							<FontAwesomeIcon icon={faCircleNotch} /> Plate Inventory
						</Link>
					</li>
					<li>
						<Link to="/sign-up">
							<FontAwesomeIcon icon={faUserPlus} /> Sign Up
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
