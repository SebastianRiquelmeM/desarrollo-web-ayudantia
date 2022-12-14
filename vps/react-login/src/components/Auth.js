import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const Auth = () => {
	let navigate = useNavigate();
	const cookies = new Cookies();
	let [authMode, setAuthMode] = useState("signin");

	const changeAuthMode = () => {
		setAuthMode(authMode === "signin" ? "signup" : "signin");
	};

	const [pass, setPass] = useState("");
	const [email, setEmail] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user: email, password: pass }),
		};
		fetch("http://localhost:5000/API/login", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.token) {
					//setCookie("token", data.token);
					cookies.set("token", data.token, { path: "/" });
					console.log("Login correcto");
					//navigate to events
					navigate("/events");
				}
			});
	}
	if (authMode === "signin") {
		return (
			<div className="Auth-form-container">
				<form className="Auth-form" onSubmit={handleSubmit}>
					<div className="Auth-form-content">
						<h3 className="Auth-form-title">Sign In</h3>
						<div className="text-center">
							Not registered yet?{" "}
							<span
								className="link-primary"
								onClick={changeAuthMode}
							>
								Sign Up
							</span>
						</div>
						<div className="form-group mt-3">
							<label>usuario</label>
							<input
								type="text"
								className="form-control mt-1"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group mt-3">
							<label>Contraseña</label>
							<input
								type="password"
								className="form-control mt-1"
								placeholder="Enter password"
								value={pass}
								onChange={(e) => setPass(e.target.value)}
							/>
						</div>
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
						<p className="text-center mt-2">
							Forgot <a href="/#">password?</a>
						</p>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign In</h3>
					<div className="text-center">
						Already registered?{" "}
						<span className="link-primary" onClick={changeAuthMode}>
							Sign In
						</span>
					</div>
					<div className="form-group mt-3">
						<label>Full Name</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="e.g Jane Doe"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Email Address"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Password"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
					<p className="text-center mt-2">
						Forgot <a href="/#">password?</a>
					</p>
				</div>
			</form>
		</div>
	);
};

/*

export default function (props) {
	let [authMode, setAuthMode] = useState("signin");

	const changeAuthMode = () => {
		setAuthMode(authMode === "signin" ? "signup" : "signin");
	};

	const [pass, setPass] = useState("");
	const [email, setEmail] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			console.log(email, pass);
		} catch (err) {
			console.log(err);
		}
	}
	if (authMode === "signin") {
		return (
			<div className="Auth-form-container">
				<form className="Auth-form" onSubmit={handleSubmit}>
					<div className="Auth-form-content">
						<h3 className="Auth-form-title">Sign In</h3>
						<div className="text-center">
							Not registered yet?{" "}
							<span
								className="link-primary"
								onClick={changeAuthMode}
							>
								Sign Up
							</span>
						</div>
						<div className="form-group mt-3">
							<label>Email address</label>
							<input
								type="email"
								className="form-control mt-1"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group mt-3">
							<label>Password</label>
							<input
								type="password"
								className="form-control mt-1"
								placeholder="Enter password"
								value={pass}
								onChange={(e) => setPass(e.target.value)}
							/>
						</div>
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
						<p className="text-center mt-2">
							Forgot <a href="#">password?</a>
						</p>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign In</h3>
					<div className="text-center">
						Already registered?{" "}
						<span className="link-primary" onClick={changeAuthMode}>
							Sign In
						</span>
					</div>
					<div className="form-group mt-3">
						<label>Full Name</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="e.g Jane Doe"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Email Address"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Password"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
					<p className="text-center mt-2">
						Forgot <a href="#">password?</a>
					</p>
				</div>
			</form>
		</div>
	);
}
 */
