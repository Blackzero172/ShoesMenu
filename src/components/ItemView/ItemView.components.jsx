import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
import "./ItemView.styles.css";
import Logo from "../../assets/imgs/LogoShoe.png";
const ItemView = ({ item, deleteItem, editItem }) => {
	const { name, size, price, id } = item;
	return (
		<div style={{ border: "3px solid black" }} className="item-view">
			<img src={Logo} alt="Logo" />
			<div className="text-container">
				<h3>Brand: {name}</h3>
				<p>Shoe Size: {size}</p>
				<p>Shoe Price: {price}$</p>
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
