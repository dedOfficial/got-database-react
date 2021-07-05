import React, {Component} from "react";
import GotDatabase from "../../services/got";
import PageWrap from "./pageWrap";
import {Field} from "../itemDetails";

export default class BookPage extends Component {
    gotService = new GotDatabase();

    render() {
        return (
            <PageWrap
                listAsyncGetter={this.gotService.getBooksAll}
                itemAsyncGetter={this.gotService.getBook}
                labelHandler={(item) => `${item.name} (${item.numberOfPages} words)`}
            >
                <Field label="Number of pages" field="numberOfPages"/>
                <Field label="Authors" field="authors"/>
                <Field label="Publisher" field="publisher"/>
                <Field label="Country" field="country"/>
            </PageWrap>
        );
    }
}
