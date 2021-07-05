import React from "react";

import './error.css';
import errorImg from './error.jpg';

const Error = () => {
    return (
        <div className="error-wrap">
            <img src={errorImg} alt="error"/>
            <h4>Something goes wrong...</h4>
        </div>
    );
}

export default Error;