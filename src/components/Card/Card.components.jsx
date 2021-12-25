import "./Card.styles.css";
import React from "react";
const Card = ({ question, answer, cardRef }) => {
	return (
		<div className="card" ref={cardRef}>
			<div className="front face">
				<p>{question}</p>
			</div>
			<div className="back face">
				<p>{answer}</p>
			</div>
		</div>
	);
};
export default Card;
