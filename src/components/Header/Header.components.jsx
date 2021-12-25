import React from "react";
import { Link } from "react-router-dom";
import "./Header.styles.css";
const Header = () => {
	return (
		<nav>
			<Link to="/" exact>
				Play & Practice
			</Link>
			<Link to="/cards">Edit Cards</Link>
		</nav>
	);
};
export default Header;
