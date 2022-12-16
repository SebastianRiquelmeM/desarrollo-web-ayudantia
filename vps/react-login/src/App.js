import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./components/Auth";
import { Events } from "./components/Events";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth" element={<Auth />} />
        <Route path="/events" element={<Events />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
