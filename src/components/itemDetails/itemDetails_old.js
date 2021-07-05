import React, {Component} from 'react';
import './itemDetails.css';
import Spinner from "../spinner";
import Error from "../error";

export default class ItemDetails extends Component {
    state = {
        item: {},
        isLoaded: true,
        isError: false
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateHandler();
        }
    }

    async updateHandler() {
        try {
            const {itemId, requestFunc} = this.props;
            const item = await requestFunc(itemId);
            this.loadedHandler(item);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    errorHandler = e => {
        console.error(e);
        this.setState({
            isLoaded: false,
            isError: true
        })
    }

    loadedHandler = item => {
        this.setState({
            item,
            isLoaded: false
        });
    };

    render() {
        if (!this.props.itemId) {
            return <span className="select-error">Select item in left menu</span>
        }

        const {item, isLoaded, isError} = this.state;

        const spinner = isLoaded ? <Spinner/> : null;
        const error = isError ? <Error/> : null;
        const content = !(isLoaded || isError) ? <ItemDetailContent
            item={item}
            fields={this.props.children}
        /> : null;

        return (
            <div className="item-details rounded">
                {spinner}
                {error}
                {content}
            </div>
        );
    }
}

const Field = ({item, label, field}) => {

    let content;

    if (typeof item[field] === 'string' && item[field].length > 50) {
        content = `${item[field].slice(0, 50)}...`;
    } else if (item[field] instanceof Array) {
        content = item[field].join(', ');
    } else {
        content = item[field];
    }

    return (
        <li key={item.id} className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{content}</span>
        </li>
    );
};
export {Field};

const ItemDetailContent = ({item, fields}) => {
    const {name} = item;

    return (
        <React.Fragment>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {fields.map((field, i) => {
                    return React.cloneElement(field, {item, key: item.id + i});
                })}
            </ul>
        </React.Fragment>
    )
}