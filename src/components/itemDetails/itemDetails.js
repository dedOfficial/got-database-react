import React, {useState, useEffect, useRef} from 'react';
import './itemDetails.css';
import Spinner from "../spinner";
import Error from "../error";

function ItemDetails({itemId, requestFunc, children}) {
    const [item, itemUpdate] = useState({});
    const [isLoaded, loadingUpdate] = useState(true);
    const [isError, errorUpdate] = useState(false);

    useEffect(() => {
        if(itemId) {
            updateHandler();
        }
    }, [itemId])

    async function updateHandler() {
        try {
            const item = await requestFunc(itemId);
            itemUpdate(item);
            loadingUpdate(false);
        } catch (e) {
            console.error(e);
            errorUpdate(true);
        }
    }

    if (!itemId) {
        return <span className="select-error">Select item in left menu</span>
    }

    const spinner = isLoaded ? <Spinner/> : null;
    const error = isError ? <Error/> : null;
    const content = !(isLoaded || isError) ? <ItemDetailContent
        item={item}
        fields={children}
    /> : null;

    return (
        <div className="item-details rounded">
            {spinner}
            {error}
            {content}
        </div>
    );
}

export default ItemDetails;

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