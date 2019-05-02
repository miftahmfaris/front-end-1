import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Photo from "./Photo";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            expand: false,
            albumId: "",
            postIndex: "",
            title: "",
            body: "",
            editPostId: "",
            editPost: false,
            expandPhoto: false
        };
    }

    expandPhoto = (id, key) => {
        this.setState({
            expandPhoto: !this.state.expandPhoto,
            albumId: id,
            postIndex: key
        });
    };

    componentWillMount = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/albums?userId=${
                    this.props.userId
                }`
            )
            .then(({ data }) => {
                this.setState({ albums: data });
            })
            .catch(error => {
                console.log(error);
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
                        {this.props.name} Album
                    </h3>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Title List</TableCell>
                                <TableCell align="right">Photos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.albums.map(
                                ({ userId, id, title }, key) => (
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {title}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                onClick={() =>
                                                    this.expandPhoto(id, key)
                                                }
                                            >
                                                Photos
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item md={6}>
                    {this.state.expandPhoto === true && (
                        <Photo
                            albumId={this.state.albumId}
                            postIndex={this.state.postIndex}
                            name={this.props.name}
                        />
                    )}
                </Grid>
            </Grid>
        );
    }
}
