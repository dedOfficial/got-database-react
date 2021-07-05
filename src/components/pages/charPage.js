import React, {Component} from "react";
import GotDatabase from "../../services/got";
import PageWrap from "./pageWrap";
import {Field} from "../itemDetails";

export default class CharPage extends Component {
    gotService = new GotDatabase();

    render() {
        return (
            <PageWrap
                listAsyncGetter={this.gotService.getCharactersAll}
                itemAsyncGetter={this.gotService.getCharacter}
                labelHandler={(item) => `${item.name} (${item.gender})`}
            >
                <Field label="Gender" field="gender"/>
                <Field label="Born" field="born"/>
                <Field label="Died" field="died"/>
                <Field label="Culture" field="culture"/>
            </PageWrap>
        );
    }
}
