import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Post from "./Post";
import Album from "./Album";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            expand: false,
            expandAlbum: false,
            id: "",
            name: ""
        };
    }

    expand = id => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(({ data }) => {
                this.setState({ name: data.name });
            })
            .catch(error => {
                console.log(error);
            });
        this.setState({ expand: !this.state.expand, id: id });
    };

    expandAlbum = id => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(({ data }) => {
                this.setState({ name: data.name });
            })
            .catch(error => {
                console.log(error);
            });
        this.setState({
            expandAlbum: !this.state.expandAlbum,
            id: id,
            expand: !this.state.expand
        });
    };

    componentWillMount = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users`)
            .then(({ data }) => this.setState({ user: data }))
            .catch(error => {
                console.log(error);
            });
    };
    render() {
        return (
            <Grid container>
                <Grid item md={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">User List</TableCell>
                                <TableCell align="right">Album List</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.user.map(({ id, name }) => (
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => this.expand(id)}>
                                            Post
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() => this.expandAlbum(id)}
                                        >
                                            Album
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item md={12}>
                    {this.state.expand === true ? (
                        <Post userId={this.state.id} name={this.state.name} />
                    ) : (
                        this.state.expandAlbum === true && (
                            <Album
                                userId={this.state.id}
                                name={this.state.name}
                            />
                        )
                    )}
                </Grid>
            </Grid>
        );
    }
}
