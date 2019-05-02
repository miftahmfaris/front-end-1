import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            expand: false,
            postId: "",
            commentId: ""
        };
    }

    expandPost = id => {
        this.setState({ expand: !this.state.expand, postId: id });
    };

    componentWillMount = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/comments?postId=${
                    this.props.postId
                }`
            )
            .then(({ data }) => {
                this.setState({ comments: data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    delete = (commentId, key) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`)
            .then(data => {
                this.state.comments.splice(key, 1);
                this.setState({ comments: this.state.comments });
            })
            .catch(error => {
                console.log(error);
            });
    };
    render() {
        return (
            <div>
                <p
                    style={{
                        fontFamily: "monospace",
                        textAlign: "center"
                    }}
                >
                    Number {this.props.postIndex} {this.props.name} Comment
                </p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Body</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.comments.map(
                            ({ postId, id, name, email, body }, key) => (
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {name}
                                    </TableCell>
                                    <TableCell align="right">{email}</TableCell>
                                    <TableCell align="right">{body}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() => this.delete(id, key)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
