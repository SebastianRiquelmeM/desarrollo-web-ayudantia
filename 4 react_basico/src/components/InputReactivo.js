import React, { useState } from "react";

export const InputReactivo = () => {
	const [value, setValue] = useState("default");

	const changeValue = (newValue) => {
		//value = newValue;
		setValue(newValue);
	};

	return (
		<div>
			<h2>
				<b>Valor2:</b>
				{value}
			</h2>
			<input
				type="text"
				style={{ marginBottom: "200px" }}
				onChange={(e) => changeValue(e.target.value)}
			></input>
		</div>
	);
};
