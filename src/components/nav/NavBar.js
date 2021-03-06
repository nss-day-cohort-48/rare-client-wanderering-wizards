import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../images/rarerLogo.png";
import { AuthorContext } from "../authors/AuthorProvider";
import logoutDoor from "../../images/logout.png";
import closeIcon from "../../images/close.png";

export const NavBar = () => {
	const history = useHistory();
	const isAdmin = JSON.parse(localStorage.getItem("rare_admin"));
	const { author, getAuthorById } = useContext(AuthorContext);
	const [menuActive, setMenuActive] = useState(false);

	useEffect(() => {
		getAuthorById();
	}, []);

	const showMenu = () => {
		return (
			<>
				<ul id="menu">
					<div className="menuTop">
						<Link
							onClick={() => {
								setMenuActive(false);
							}}
						>
							<img
								// style={{ maxHeight: "3rem", borderRadius: "50%" }}
								src={author.profile_image_url}
								className="menuPIU"
								onClick={() => {
									history.push(`/authors/${author.id}`);
								}}
							/>
						</Link>
						<li>{author.user?.username}</li>
						<img
							onClick={() => {
								setMenuActive(false);
							}}
							style={{
								height: "1rem",
								marginLeft: "auto",
								alignSelf: "baseline",
							}}
							src={closeIcon}
							alt=""
						/>
					</div>
					<li className="menuSepLI">
						<div className="menuSep"></div>
					</li>
					<li>
						<Link
							to="/Posts/create"
							className="navbar__link"
							onClick={() => {
								setMenuActive(false);
							}}
						>
							Write a Story
						</Link>
					</li>
					<li>
						<Link
							className="navbar__link"
							to="/myposts"
							onClick={() => {
								setMenuActive(false);
							}}
						>
							My Posts
						</Link>
					</li>
					<li className="">
						<Link
							className="navbar__link"
							to="/categories"
							onClick={() => {
								setMenuActive(false);
							}}
						>
							Categories
						</Link>
					</li>
					<li className="">
						<Link
							className="navbar__link"
							to="/tags"
							onClick={() => {
								setMenuActive(false);
							}}
						>
							Tags
						</Link>
					</li>
					{isAdmin ? (
						<li className="">
							<Link
								className="navbar__link"
								to="/authors"
								onClick={() => {
									setMenuActive(false);
								}}
							>
								User Manager
							</Link>
						</li>
					) : (
						""
					)}
				</ul>
			</>
		);
	};

	return (
		<>
			<ul className="navbar">
				<div className="navSpace"></div>
				<li className="">
					<Link
						to="/"
						onClick={() => {
							setMenuActive(false);
						}}
					>
						<img className="navbar__logo" src={Logo} />
					</Link>
				</li>
				{localStorage.getItem("rare_user_id") !== null ? (
					<li className="navbar__item">
						<button
							className="nav-link fakeLink"
							onClick={() => {
								localStorage.removeItem("rare_user_id");
								localStorage.removeItem("rare_admin");
								history.push({ pathname: "/" });
							}}
						>
							<img
								style={{ maxHeight: "1.5rem" }}
								className="logoutButton"
								src={logoutDoor}
							/>
						</button>
					</li>
				) : (
					<>
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								Login
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/register">
								Register
							</Link>
						</li>
					</>
				)}{" "}
				<Link>
					<img
						style={{ maxHeight: "3rem", borderRadius: "50%" }}
						src={author.profile_image_url}
						className="navbar__item menuProfileImage"
						onClick={() => {
							if (menuActive) {
								setMenuActive(false);
							} else {
								setMenuActive(true);
							}
						}}
					/>
				</Link>
				<div className="navSpace"></div>
			</ul>
			{menuActive ? showMenu() : ""}
		</>
	);
};
