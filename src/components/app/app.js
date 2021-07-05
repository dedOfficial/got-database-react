import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharPage, BookPage, HousePage} from "../pages";
import {BrowserRouter as Router, Route} from "react-router-dom";

export default class App extends Component {
    state = {
        isRandomDisplay: true
    }

    toggleHandler = () => {
        this.setState(({isRandomDisplay}) => ({
            isRandomDisplay: !isRandomDisplay
        }));
    }

    render() {
        const {isRandomDisplay} = this.state;

        const randomChar = isRandomDisplay ? <RandomChar/> : null;

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 6, offset: 0}}>
                                {randomChar}
                            </Col>
                            <Col md='4' style={{marginBottom: '2rem '}}>
                                <Button
                                    color="primary"
                                    size="lg"
                                    onClick={this.toggleHandler}
                                >Toggle Random Char Card</Button>
                            </Col>
                        </Row>

                        <Route path="/characters/" exact component={CharPage}/>
                        <Route path="/houses/" exact component={HousePage}/>
                        <Route path="/books/" exact component={BookPage}/>

                    </Container>
                </div>
            </Router>

        );
    }
}
