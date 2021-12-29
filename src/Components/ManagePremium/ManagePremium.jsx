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

function ManagePremium(props) {

    const navigate = useNavigate();
    const classes = useStyles();

    //local state
    const [AddPremium, setAddPremium] = useState(false)
    const [PremiumArr, setPremiumArr] = useState([])
    const [isloading, setisloading] = useState(false)
    const [premiumname, setpremiumname] = useState("");
    const [isUpdated, setisUpdated] = useState(false);
    const [premiumimage, setpremiumimage] = useState(false)
    const [price, setprice] = useState("");
    const [days, setdays] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);

        const getUserDetails = () => {
            try {
                setisloading(true);
                let url = getBaseUrl() + "api/v1/premium/getallpremium";
                axios.get(url, {
                    headers: {
                        token: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(
                    (res) => {
                        console.log("res::", res);
                        setPremiumArr(res.data.data)
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

    const AddPremiumdata = () => {
        try {
            setisloading(true)
            let url = getBaseUrl() + "api/v1/premium/AddPremiumcategory";

            let fd = new FormData();
            fd.append("premiumimage", premiumimage);
            fd.append("premiumname", premiumname);
            fd.append("price", price);
            fd.append("validity", days)
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        console.log("add res", res)
                        showNotificationMsz(res.data.message, "success")
                        setisUpdated(!isUpdated)
                        setAddPremium(!AddPremium)
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

    return (
        <>
            <div className="Page_width content_padding" >
                <div className="ml-3 mr-3">
                    <div className="Content_topHeading">
                        Manage Premium
                    </div>
                    <hr />

                    <div className="text-center sub_content mt-3 mb-2">Premium List</div>
                    <div ><span className="hover_cursor" onClick={() => setAddPremium(!AddPremium)}><i className='fa fa-plus-circle mr-1' />Add Premium</span></div>

                    <Expand open={AddPremium}>
                        <Card className="p-2 Card_shadow mt-2">
                            <div className='text_feild_heading'>Premium Name</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Premium Name"
                                    className="form-control"
                                    value={premiumname}
                                    onChange={(e) => {
                                        setpremiumname(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='text_feild_heading mt-2'>Price</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Price"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => {
                                        setprice(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='text_feild_heading mt-2'>Validity</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter validity"
                                    className="form-control"
                                    value={days}
                                    onChange={(e) => {
                                        setdays(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='text_feild_heading mt-2'>Premium Image</div>
                            <div>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => {
                                        setpremiumimage(e.target.files[0])
                                    }}
                                />
                            </div>

                            <div className='mt-2 mb-2'>
                                <Button className='add_button' onClick={AddPremiumdata}>Add</Button>
                            </div>
                        </Card>
                    </Expand>
                    <div className="mb-3">
                        <Card className="p-2 Card_shadow mt-2">

                            <Grid className="Component_main_grid">
                                <Grid item md={3} className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search by Premium Name"
                                        className="form-control"
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
                                                Premium Name
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="left"
                                                className="table_header"
                                            >
                                                Price
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="left"
                                                className="table_header"
                                            >
                                                Validity
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
                                            ? PremiumArr.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage +
                                                rowsPerPage
                                            )
                                            : PremiumArr
                                        ).map((row) => (
                                            <StyledTableRow>

                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    {row.premiumname}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"

                                                >
                                                    {row.price}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"

                                                >
                                                    {row.validity}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    <div>
                                                        <span className='text-info hover_cursor'>
                                                            <i className='fa fa-edit' />
                                                        </span>
                                                        <span className='ml-5 text-info hover_cursor'>
                                                            <i className='fa fa-trash' />
                                                        </span>

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
                                    count={PremiumArr.length}
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

export default HOC(ManagePremium)
