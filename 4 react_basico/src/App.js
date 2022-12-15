import logo from "./logo.svg";
import "./App.css";
import { Componente1 } from "./components/Componente1";
import { Componente2 } from "./components/Componente2";
import { Lista } from "./components/Lista";
import { Reactivo } from "./components/Reactivo";
import { InputReactivo } from "./components/InputReactivo";

function Welcome(props) {
	return <h1>Hola, {props.name}</h1>;
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>React de Sebastián</p>
				<Componente1 />
				<Componente2 />
				<Welcome name="estudiantes" />
				<Lista />
				<Reactivo />
				<InputReactivo />
			</header>
		</div>
	);
}

export default App;
