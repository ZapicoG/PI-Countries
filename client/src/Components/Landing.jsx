import React from "react";
import { Link } from "react-router-dom";
import "../css/Landing.css"

export default function LandingPage () {
    return (
        <div class="parent">
            <div class="child">
            <h1 class="letra">Bienvenidos!</h1>
            <Link to="/home">
                <button class="letra">Ingresar</button>
            </Link>
            </div>
        </div>
    )
}