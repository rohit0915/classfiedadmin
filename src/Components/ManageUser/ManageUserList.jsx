import React, { useState, useEffect } from 'react';
import HOC from "../../Common/HOC.jsx"
import Expand from 'react-expand-animated';

//material ui data table
import { Card, Grid, Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

import { useNavigate } from 'react-router-dom';


//for API Call
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";

function ManageUserList(props) {

    const navigate = useNavigate();
    const classes = useStyles();

    //local state

    const [UserListArr, setUserListArr] = useState([])
    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)
    const [name, setname] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);

        const getUserDetails = () => {
            try {
                setisloading(true);
                let url = getBaseUrl() + "api/v1/user/getallusers";
                axios.get(url, {
                    headers: {
                        token: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(
                    (res) => {
                        console.log("res::", res);
                        setUserListArr(res.data.data.data)
                        setisloading(false);
                    },
                    (error) => {
                        showNotificationMsz(`${error}`, "danger");
                        console.log("data response error:::", error);
                        setisloading(false);
                    }
                );
            } catch (error) {
                showNotificationMsz(`${error}`, "danger");
                setisloading(false);
                console.log("data response error:::", error);
            }
        };
        getUserDetails();
    }, [isUpdated])

    // for pagination hadler 
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);



    const handleChangePage = (event, newPage) => {
        window.scrollTo(0, 0);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //to delete User
    const DeleteUser = (ID) => {
        //delete Id
        let id = ID

        try {
            setisloading(true)
            let url = getBaseUrl() + `api/v1/user/deleteuserbyid/${id}`;
            axios
                .delete(url)
                .then(
                    (res) => {
                        console.log("delete res", res)
                        showNotificationMsz(res.data.message, "success")
                        setisUpdated(!isUpdated)
                        setisloading(false)
                    },
                    (error) => {
                        showNotificationMsz(`${error}`, "danger")
                        console.log("data response error:::", error)
                        setisloading(false)
                    }
                )
        } catch (error) {
            showNotificationMsz(`${error}`, "danger")
            setisloading(false)
            console.log("data response error:::", error)
        }
    }

    const filterUserListArr = UserListArr.filter((event) => {
        return (
            event.username.toLowerCase().indexOf(name.toLowerCase()) !== -1
        );
    });

    return (
        <>
            <div className="Page_width content_padding" >
                <div className="ml-3 mr-3">
                    <div className="Content_topHeading">
                        Manage User
                    </div>
                    <hr />

                    <div className="text-center sub_content mt-3 mb-2">User List</div>

                    <div className="mb-3">
                        <Card className="p-2 Card_shadow mt-2">

                            <Grid className="Component_main_grid">
                                <Grid item md={3} className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search by Name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => {
                                            setname(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item md={9} className="p-3"></Grid>
                            </Grid>
                            <TableContainer component={Paper}>
                                <Table
                                    className={classes.table}
                                    aria-label="customized table"

                                >
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell
                                                align="left"
                                                className="table_header"
                                            >
                                                User Name
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="left"
                                                className="table_header"
                                            >
                                                Email Address
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="left"
                                                className="table_header"
                                            >
                                                Mobile Number
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="left"
                                                className="table_header"
                                            >
                                                Action
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? filterUserListArr.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage +
                                                rowsPerPage
                                            )
                                            : filterUserListArr
                                        ).map((row) => (
                                            <StyledTableRow>

                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    {row.username}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    {row.email}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    {row.number}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    <div className=' text-info hover_cursor'>
                                                        <i className='fa fa-trash' onClick={() => DeleteUser(row._id)} />
                                                    </div>
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    true
                                    rowsPerPageOptions={false}
                                    component="div"
                                    count={filterUserListArr.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </TableContainer>
                        </Card>
                    </div>
                </div>

            </div>

            <Loder loading={isloading} />

        </>
    )
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },

});

export default HOC(ManageUserList)
