import React from 'react'
import { Avatar } from "@material-ui/core"
import logo from "../images/monkey-sunglasses-cool-gorilla-600w-1063902011.webp"

const Navbar = () => {
    return (
        <nav>
            <div className="nav__title">
                    <h2>Kimono</h2>
            </div>
            <div className="nav__avatar">
                <Avatar src={logo} alt="avatar" />
            </div>
        </nav>
    )
}

export default Navbar
