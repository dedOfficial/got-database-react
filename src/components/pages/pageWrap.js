import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";
import Error from "../error";
import PropTypes from "prop-types";

export default class PageWrap extends Component {

    state = {
        itemId: null,
        isError: false
    }

    static propTypes = {
        listAsyncGetter: PropTypes.func,
        itemAsyncGetter: PropTypes.func,
        labelHandler: PropTypes.func
    }

    componentDidCatch() {
        this.setState({
            isError: true
        })
    }

    itemSelectHandler = (id) => {
        this.setState({
            itemId: id
        })
    }

    render() {
        const {itemId, isError} = this.state;
        const {children, listAsyncGetter, itemAsyncGetter, labelHandler} = this.props;

        if (isError) {
            return <Error/>;
        }

        return (
            <Row>
                <Col md='6'>
                    <ItemList
                        onItemSelect={(id) => {this.itemSelectHandler(id)}}
                        requestFunc={listAsyncGetter}
                        labelHandler={labelHandler}
                    />
                </Col>
                <Col md='6'>
                    <ItemDetails
                        itemId={itemId}
                        requestFunc={itemAsyncGetter}
                    >
                        {children}
                    </ItemDetails>
                </Col>
            </Row>
        );
    }
}
