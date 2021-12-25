import React from "react";
import "./CustomInput.styles.css";
class CustomInput extends React.Component {
	render() {
		const { type, onChange, placeHolder, inputRef, name } = this.props;
		if (type === "textarea")
			return (
				<textarea
					name={name}
					id={name}
					cols="40"
					rows="20"
					className="edit-input"
					style={{ resize: "none" }}
					ref={inputRef}
				/>
			);
		else
			return (
				<input
					type={type}
					onChange={onChange}
					placeholder={placeHolder}
					ref={inputRef}
					className="edit-input"
				/>
			);
	}
}
export default CustomInput;
