import React, {useState, useEffect} from 'react';
import './itemList.css';
import Error from "../error";
import Spinner from "../spinner";
import PropTypes from "prop-types";

function ItemList({requestFunc, labelHandler, onItemSelect}) {
    const [itemList, listUpdate] = useState([]);
    const [isLoading, loadingUpdate] = useState(true);
    const [isError, errorUpdate] = useState(false);

    useEffect(() => {
        if (!itemList.length) {
            updateHandler();
        }
    });

    async function updateHandler() {
        try {
            const itemList = await requestFunc();
            listUpdate(itemList)
            loadingUpdate(false)
        } catch (e) {
            errorUpdate(true);
        }
    }

    function renderList() {
        if (!itemList.length) {
            return [];
        }

        return itemList.map((item) => {
            const {id} = item;
            const label = labelHandler(item);

            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelect(id)}
                >
                    {label}
                </li>
            );
        });
    }

    const listOfItem = renderList();

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

ItemList.propTypes = {
    requestFunc: PropTypes.func,
    labelHandler: PropTypes.func,
    onItemSelect: PropTypes.func
}

export default ItemList;