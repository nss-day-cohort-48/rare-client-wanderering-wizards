import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "../../images/rarerLogo.png"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link to="/"><img className="navbar__logo" src={Logo} /></Link>
            </li>
            <li className="navbar__item navbar__text">
                <Link className="navbar__link" to="/posts">All Posts</Link>
            </li>
            <li className="navbar__item navbar__text">
                <Link className="navbar__link" to="/myposts">My Posts</Link>
            </li>
            <li className="navbar__item navbar__text">
                <Link className="navbar__link" to="/categories">Category Manager</Link>
            </li>
            <li className="navbar__item navbar__text">
                <Link className="navbar__link" to="/tags">Tag Manager</Link>
            </li>
            {
                (localStorage.getItem("rare_user_id") !== null) ?
                    <li className="navbar__item navbar__text">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
