import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const ProtectedRoutes = (props) => {
	const cookies = new Cookies();
	const userToken = cookies.get("token");
	if (!userToken || userToken === "undefined") {
		return <Navigate to="/auth" />;
	} else {
		return <Outlet />;
	}
};
export default ProtectedRoutes;
