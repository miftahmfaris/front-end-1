import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            expand: false,
            albumId: ""
        };
    }

    expandPost = id => {
        this.setState({ expand: !this.state.expand, albumId: id });
    };

    componentWillMount = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/photos?albumId=${
                    this.props.albumId
                }`
            )
            .then(({ data }) => {
                this.setState({ photos: data });
            })
            .catch(error => {
                console.log(error);
            });
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Url</TableCell>
                            <TableCell align="right">Thumbnail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.photos.map(
                            (
                                { albumId, id, title, url, thumbnailUrl },
                                key
                            ) => (
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {title}
                                    </TableCell>
                                    <TableCell align="right">
                                        <img src={url} alt="User Photos" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <img
                                            src={thumbnailUrl}
                                            alt="User Thumbnail"
                                        />
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
