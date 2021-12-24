import React from "react";

const CustomButton = ({ text, children, onClick, id, edit, className }) => {
	return (
		<button type="button" onClick={onClick} id={id} edit={edit} className={className}>
			{children} {text}
		</button>
	);
};
export default CustomButton;
