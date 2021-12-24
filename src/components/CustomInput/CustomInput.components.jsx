import React from "react";
import "./CustomInput.styles.css";
const CustomInput = React.forwardRef(({ type, onChange, placeHolder }, ref) => (
	<input type={type} onChange={onChange} placeholder={placeHolder} ref={ref} className="edit-input" />
));
export default CustomInput;
