import React, {Component} from "react";
import GotDatabase from "../../services/got";
import PageWrap from "./pageWrap";
import {Field} from "../itemDetails";

export default class HousePage extends Component {
    gotService = new GotDatabase();

    render() {
        return (
            <PageWrap
                listAsyncGetter={this.gotService.getHousesAll}
                itemAsyncGetter={this.gotService.getHouse}
                labelHandler={(item) => `${item.name} (${item.region})`}
            >
                <Field label="Region" field="region"/>
                <Field label="Coat" field="coatOfArms"/>
                <Field label="Words" field="words"/>
            </PageWrap>
        );
    }
}