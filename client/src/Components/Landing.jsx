import React from "react";
import { Link } from "react-router-dom";
import "../css/Landing.css"

export default function LandingPage () {
    return (
        <div className="parent">
            <div className="child">
            <h1 className="letra">Bienvenidos!</h1>
            <Link to="/home">
                <button className="letra">Ingresar</button>
            </Link>
            </div>
        </div>
    )
}