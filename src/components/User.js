import React, { Component } from "react";
import axios from "axios";

export default class User extends Component {
    componentWillMount = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users`)
            .then(({ data }) => console.log(data))
            .catch(error => {
                // handle error
                console.log(error);
            });
    };
    render() {
        return (
            <div>
                <p>Test</p>
            </div>
        );
    }
}
