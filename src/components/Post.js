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
            postIndex: ""
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
    render() {
        return (
            <Grid container>
                <Grid item md={6}>
                    <p
                        style={{
                            fontFamily: "monospace",
                            textAlign: "center"
                        }}
                    >
                        {this.props.name} Post
                    </p>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Title List</TableCell>
                                <TableCell align="right">Body List</TableCell>
                                <TableCell align="right">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.posts.map(
                                ({ userId, id, title, body }, key) => (
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {body}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() =>
                                                    this.expandPost(id, key)
                                                }
                                            >
                                                Comment
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
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
