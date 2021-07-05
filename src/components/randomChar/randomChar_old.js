import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './randomChar.css';
import GotDatabase from "../../services/got";
import Error from "../error";
import Spinner from "../spinner/spinner";

export default class RandomChar extends Component {
    gotService = new GotDatabase();

    state = {
        char: {},
        isLoading: true,
        isError: false
    }

    static defaultProps = {
        timeout: 4000
    }

    static propTypes = {
        timeout: PropTypes.number
    }

    #intervalId = null
    componentDidMount() {
        this.onUpdateChar();
        this.#intervalId = setInterval(this.onUpdateChar, this.props.timeout);
    }

    componentWillUnmount() {
        clearInterval(this.#intervalId);
    }

    render() {
        const {char, isError, isLoading} = this.state;

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

    onUpdateChar = async () => {
        const id = Math.floor(Math.random()*1000 + 1);

        try {
            const char = await this.gotService.getCharacter(id);
            this.onCharLoaded(char);
        } catch (e) {
            this.onError(e);
        }
    };

    onError = e => {
        console.error(e);
        this.setState({
            isLoading: false,
            isError: true
        })
    };

    onCharLoaded = char => {
        this.setState({
            char,
            isLoading: false,
        });
    }

}

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
