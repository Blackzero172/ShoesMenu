import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
import "./ItemView.styles.css";
const ItemView = ({ item, deleteItem, editItem }) => {
	const { question, answer, id } = item;
	return (
		<div style={{ border: "3px solid black" }} className="item-view">
			<div className="text-container">
				<h3>Question:</h3>
				<p>{question}</p>
				<h3>Answer:</h3>
				<p>{answer}</p>
				<p>ID: {id}</p>
			</div>
			<div className="button-container">
				<CustomButton onClick={editItem} id={id} edit="true">
					<i className="fas fa-edit" style={{ pointerEvents: "none" }}></i>
				</CustomButton>
				<CustomButton onClick={deleteItem} id={id}>
					<i className="fas fa-trash" style={{ pointerEvents: "none" }}></i>
				</CustomButton>
			</div>
		</div>
	);
};
export default ItemView;
