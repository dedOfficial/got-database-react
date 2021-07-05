import React, {Component} from "react";
import './itemList.css';
import PropTypes from "prop-types";
import Error from "../error";
import Spinner from "../spinner";

export default class ItemList extends Component {

    state = {
        itemList: [],
        isLoading: true,
        isError: false
    }

    static propTypes = {
        requestFunc: PropTypes.func,
        labelHandler: PropTypes.func,
        onItemSelect: PropTypes.func
    }

    componentDidMount() {
        if (!this.state.itemList.length) {
            this.updateHandler();
        }
    }

    updateHandler = async () => {
        try {
            const itemList = await this.props.requestFunc();
            this.loadedHandler(itemList);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    errorHandler = e => {
        console.error(e);
        this.setState({
            isError: true,
            isLoading: false
        });
    }

    loadedHandler = itemList => {
        this.setState({
            itemList,
            isLoading: false
        });
    };

    renderList = () => {
        const {itemList} = this.state;

        if (!itemList.length) {
            return [];
        }

        return itemList.map((item) => {
            const {id} = item;
            const label = this.props.labelHandler(item);

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelect(id)}
                >
                    {label}
                </li>
            );
        });
    }

    render() {
        const {isError, isLoading} = this.state;

        const listOfItem = this.renderList();

        const error = isError ? <Error/> : null;
        const loading = isLoading ? <Spinner/> : null;
        const content = !(isLoading || isError) ? listOfItem : null;

        return (
            <ul className="item-list list-group">
                {error}
                {loading}
                {content}
            </ul>
        );
    }
}

