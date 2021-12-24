import React from "react";

const Label = ({ text, name }) => {
	return <label htmlFor={name}>{text}</label>;
};
export default Label;
