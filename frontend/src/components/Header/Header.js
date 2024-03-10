import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faCircleNotch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../UserContext";

function Header() {
	const { user } = useUser();

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

					{user ? (
						<div className="user">Welcome, {user.displayName}</div>
					) : (
						<li>
							<Link to="/sign-up">
								<FontAwesomeIcon icon={faUserPlus} /> Sign In
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
