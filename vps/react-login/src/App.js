import "./App.css";
/* import React from "react"; */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./components/Auth";
import { Events } from "./components/Events";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				{/* <Route path="/events" element={<Events />} /> */}

				<Route element={<ProtectedRoutes />}>
					<Route path="/events" element={<Events />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
