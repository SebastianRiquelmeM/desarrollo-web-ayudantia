import React, { useState } from "react";
import "../css/style.css";
import Cookies from "universal-cookie";

export const Events = () => {
	//query events to http://localhost:5000/events and store it
	//in array of events
	const [events, setEvents] = useState([]);
	const cookies = new Cookies();
	console.log("Entra a events");
	console.log(cookies.get("token"));

	//fetch events from http://localhost:5000/events
	const fetchEvents = async () => {
		const response = await fetch("http://localhost:5000/API/eventos");
		const data = await response.json();
		//console.log(data.eventos);
		setEvents(data.eventos);
	};

	//fetch events when component is mounted
	React.useEffect(() => {
		fetchEvents();
	}, []);

	return (
		<div>
			<meta charSet="UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
				integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
				crossOrigin="anonymous"
			/>
			<title>Document</title>
			{/* <link rel="stylesheet" href="../css/style.css" /> */}
			<div className="jumbotron jumbotron-fluid">
				<nav
					id="navbar"
					className="navbar navbar-expand-lg navbar-light fixed-top"
				>
					<a className="navbar-brand text-light" href="#">
						Navbar
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<a className="nav-link text-light" href="#">
									Home{" "}
									<span className="sr-only">(current)</span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link text-light" href="#">
									Link
								</a>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle text-light"
									href="#"
									role="button"
									data-toggle="dropdown"
									aria-expanded="false"
								>
									Dropdown
								</a>
								<div className="dropdown-menu">
									<a className="dropdown-item" href="#">
										Action
									</a>
									<a className="dropdown-item" href="#">
										Another action
									</a>
									<div className="dropdown-divider" />
									<a className="dropdown-item" href="#">
										Something else here
									</a>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link text-light disabled">
									Disabled
								</a>
							</li>
						</ul>
						<button
							type="button"
							className="btn btn-light ml-3"
							data-toggle="modal"
							data-target="#modalIniciarSesion"
						>
							Iniciar sesión
						</button>
						<button
							type="button"
							className="btn btn-light ml-3"
							data-toggle="modal"
							data-target="#modalRegistro"
						>
							Registrarse
						</button>
					</div>
				</nav>
				<div className="container">
					<h1 className="display-4 text-center text-light font-weight-bold">
						<ion-icon name="ticket-outline" />
					</h1>
					<h1 className="display-4 text-center text-light font-weight-bold">
						{" "}
						Ticketera
					</h1>
				</div>
				<p className="text-right mr-2 text-light" id="creditosPortada">
					<small>
						Foto de{" "}
						<a
							id="creditosLink1"
							className="text-light"
							href="https://unsplash.com/@yvettedewit?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						>
							Yvette de Wit
						</a>{" "}
						en{" "}
						<a
							className="text-light"
							id="creditosLink2"
							href="https://unsplash.com/es/s/fotos/concert?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						>
							Unsplash
						</a>
					</small>
				</p>
			</div>
			<div className="container-sm mt-5 mb-5">
				<div className="input-group mb-5">
					<input
						type="text"
						id="buscar"
						className="form-control shadow"
						placeholder="Buscar"
						aria-label="Buscar"
						aria-describedby="button-addon2"
					/>
					<div className="input-group-append">
						{/* <button class="btn btn-outline-secondary mr-5" type="button" id="button-addon2">Button</button> */}
						<div className="dropdown">
							<button
								id="botonCat"
								className="btn btn-secondary dropdown-toggle grisClaro"
								type="button"
								data-toggle="dropdown"
								aria-expanded="false"
							>
								Categoría
							</button>
							<div className="dropdown-menu">
								<a className="dropdown-item" href="#">
									Infantil
								</a>
								<a className="dropdown-item" href="#">
									Romance
								</a>
								<a className="dropdown-item" href="#">
									Terror
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="card-deck text-light ">
					{events.map((event, index) => {
						let image = "." + event.imagen;
						//console.log(image);
						return (
							<div key={index} className="card shadow">
								<img
									src={image}
									className="card-img-top"
									alt="..."
								/>
								{/* 								<img
									src="img/products/primaverasoundsantiago.jpg"
									className="card-img-top"
									alt="..."
								/> */}
								<div className="card-body">
									<h5 className="card-title">
										{event.nombre}
									</h5>
									<p className="card-text">
										{event.ubicacion}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div
				className="modal fade"
				id="modalVerFechas"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Fechas
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<img
								src="./img/products/lollapalooza.jpg"
								className="card-img-top"
								alt="..."
							/>
							<div id="fechas" className="card" style={{}}>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<div className="container">
											<div className="row">
												<div className="col-sm">
													<h4>AUG</h4>
													<h4>204</h4>
												</div>
												<div className="col-sm">
													<p
														id="titulo_fecha"
														className="text-right"
													>
														Teatro Tapia
													</p>
												</div>
											</div>
										</div>
									</li>
									<li className="list-group-item">
										A second item
									</li>
									<li className="list-group-item">
										A third item
									</li>
								</ul>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Cerrar
							</button>
							<button type="button" className="btn btn-primary">
								Enviar
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Modal */}
			<div
				className="modal fade"
				id="modalIniciarSesion"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Iniciar sesión
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">
										Correo electrónico
									</label>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
									/>
									<small
										id="emailHelp"
										className="form-text text-muted"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">
										Contraseña
									</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
									/>
								</div>
								<div className="form-group form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="exampleCheck1"
									/>
									<label
										className="form-check-label"
										htmlFor="exampleCheck1"
									>
										Recuerdame
									</label>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Cerrar
							</button>
							<button type="button" className="btn btn-primary">
								Enviar
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Modal */}
			<div
				className="modal fade"
				id="modalRegistro"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Registro
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">
										Nombre
									</label>
									<input
										type="text"
										className="form-control"
										id="exampleName"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">
										Correo electrónico
									</label>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
									/>
									<small
										id="emailHelp"
										className="form-text text-muted"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">
										Contraseña
									</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">
										Confirmar contraseña
									</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Cerrar
							</button>
							<button type="button" className="btn btn-primary">
								Enviar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
