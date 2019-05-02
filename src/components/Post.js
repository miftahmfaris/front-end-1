import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Comment from "./Comment";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            expand: false,
            postId: "",
            postIndex: "",
            title: "",
            body: "",
            editPostId: "",
            editPost: false
        };
    }

    expandPost = (id, key) => {
        this.setState({
            expand: !this.state.expand,
            postId: id,
            postIndex: key
        });
    };

    componentWillMount = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/posts?userId=${
                    this.props.userId
                }`
            )
            .then(({ data }) => {
                this.setState({ posts: data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    addPost = e => {
        e.preventDefault();

        axios
            .post(`${process.env.REACT_APP_API_URL}/posts`)
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

    deletePost = (postId, key) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
            .then(data => {
                this.state.posts.splice(key, 1);
                this.setState({ posts: this.state.posts });
            })
            .catch(error => {
                console.log(error);
            });
    };

    editPost = postId => {
        this.setState({ editPost: true, editPostId: postId });
    };

    submit = e => {
        e.preventDefault();

        axios
            .put(
                `${process.env.REACT_APP_API_URL}/posts/${
                    this.state.editPostId
                }`
            )
            .then(data => {
                this.setState({ editPost: false });
            })
            .catch(error => {
                console.log(error);
            });

        this.setState({
            title: "",
            body: ""
        });
    };
    render() {
        return (
            <Grid container>
                <Grid item md={6}>
                    <h3
                        style={{
                            fontFamily: "monospace",
                            textAlign: "center"
                        }}
                    >
                        {this.props.name} Post
                    </h3>
                    <form onSubmit={this.addPost}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.title}
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
                                    <TableCell align="right">
                                        Title List
                                    </TableCell>
                                    <TableCell align="right">
                                        Body List
                                    </TableCell>
                                    <TableCell align="right">Comment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.editPost === true ? (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                name="title"
                                                style={{ border: "none" }}
                                                onChange={this.handleChange}
                                                value={this.state.title}
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
                                            {this.state.editPost === true && (
                                                <Button type="submit">
                                                    Submit
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    this.state.posts.map(
                                        ({ userId, id, title, body }, key) => (
                                            <TableRow key={id}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {title}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {body}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        onClick={() =>
                                                            this.editPost(id)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            this.expandPost(
                                                                id,
                                                                key
                                                            )
                                                        }
                                                    >
                                                        Comment
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            this.deletePost(
                                                                id,
                                                                key
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </form>
                </Grid>
                <Grid item md={6}>
                    {this.state.expand === true && (
                        <Comment
                            postId={this.state.postId}
                            postIndex={this.state.postIndex}
                            name={this.props.name}
                        />
                    )}
                </Grid>
            </Grid>
        );
    }
}
