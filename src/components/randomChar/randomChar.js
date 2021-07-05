import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './randomChar.css';
import GotDatabase from "../../services/got";
import Error from "../error";
import Spinner from "../spinner/spinner";

function RandomChar({timeout}) {
    const [char, updateChar] = useState({});
    const [isError, updateError] = useState(false);
    const [isLoading, updateLoading] = useState(true);

    const gotService = new GotDatabase();

    useEffect(() => {
        onUpdateChar();
        const intervalId = setInterval(onUpdateChar, timeout)
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const onUpdateChar = async () => {
        const id = Math.floor(Math.random()*1000 + 1);

        try {
            const char = await gotService.getCharacter(id);
            updateChar(char);
            updateLoading(false);
        } catch (e) {
            console.error(e);
            updateError(true);
        }
    };

    const error = isError ? <Error/> : null;
    const loading = isLoading ? <Spinner/> : null;
    const content = !(isLoading || isError) ? <CharInfo char={char}/> : null;

    return (
        <div className="random-block rounded">
            {error}
            {loading}
            {content}
        </div>
    );
}
RandomChar.defaultProps = {
    timeout: 5000
}
RandomChar.propTypes = {
    timeout: PropTypes.number
}

export default RandomChar;

const CharInfo = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <React.Fragment>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </React.Fragment>
    )
}
