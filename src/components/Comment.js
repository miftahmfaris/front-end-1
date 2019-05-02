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
            commentId: "",
            editComment: false,
            editCommentId: "",
            name: "",
            email: "",
            body: ""
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

    editField = commentId => {
        this.setState({ editComment: true, editCommentId: commentId });
    };

    submit = e => {
        e.preventDefault();

        axios
            .put(
                `${process.env.REACT_APP_API_URL}/comments/${
                    this.state.editCommentId
                }`
            )
            .then(data => {
                this.setState({ editComment: false });
            })
            .catch(error => {
                console.log(error);
            });

        this.setState({
            name: "",
            email: "",
            body: ""
        });
    };

    addComment = e => {
        e.preventDefault();

        axios
            .post(`${process.env.REACT_APP_API_URL}/comments`)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

        this.setState({
            name: "",
            email: "",
            body: ""
        });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        return (
            <div>
                <h3
                    style={{
                        fontFamily: "monospace",
                        textAlign: "center"
                    }}
                >
                    Number {this.props.postIndex + 1} {this.props.name} Comment
                </h3>
                <form onSubmit={this.addComment}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                    <input
                        type="text"
                        placeholder="Body"
                        name="body"
                        onChange={this.handleChange}
                        value={this.state.body}
                    />
                    <Button type="submit">Add</Button>
                </form>
                <form onSubmit={this.submit}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Body</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.editComment === true ? (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            style={{ border: "none" }}
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            style={{
                                                border: "none"
                                            }}
                                            onChange={this.handleChange}
                                            value={this.state.email}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <input
                                            type="text"
                                            placeholder="Body"
                                            name="body"
                                            style={{
                                                border: "none"
                                            }}
                                            onChange={this.handleChange}
                                            value={this.state.body}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {this.state.editComment === true && (
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                this.state.comments.map(
                                    (
                                        { postId, id, name, email, body },
                                        key
                                    ) => (
                                        <TableRow key={id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {email}
                                            </TableCell>
                                            <TableCell align="right">
                                                {body}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    onClick={() =>
                                                        this.editField(id)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        this.delete(id, key)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                                {this.state.editComment ===
                                                    true && (
                                                    <Button type="submit">
                                                        Submit
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            )}
                        </TableBody>
                    </Table>
                </form>
            </div>
        );
    }
}
