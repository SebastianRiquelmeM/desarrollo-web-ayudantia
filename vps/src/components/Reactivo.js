import React, { useState } from "react";

export const Reactivo = () => {
	const [value, setValue] = useState("default");

	const changeValue = (newValue) => {
		//value = newValue; 
          setValue(newValue);
	};

	return (
		<div>
			<h2>
				<b>Valor: </b>
				{value}
			</h2>
			<button onClick={(e) => changeValue("Cambiado")} style={{marginBottom: '50px'}}> Cambiar valor </button>

		</div>
	);
};
