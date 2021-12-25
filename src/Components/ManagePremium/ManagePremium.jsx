import React, { useState } from 'react';
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

function ManagePremium(props) {

    const navigate = useNavigate();
    const classes = useStyles();

    const filterData = [{
        name: "ujjawal"
    }];

    // for pagination hadler 
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const [AddPremium, setAddPremium] = useState(false)

    const handleChangePage = (event, newPage) => {
        window.scrollTo(0, 0);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                                />
                            </div>

                            <div className='text_feild_heading mt-2'>Price</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Price"
                                    className="form-control"
                                />
                            </div>

                            <div className='text_feild_heading mt-2'>Validity</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter validity"
                                    className="form-control"
                                />
                            </div>

                            <div className='mt-2 mb-2'>
                                <Button className='add_button'>Add</Button>
                            </div>
                        </Card>
                    </Expand>
                    <div className="mb-3">
                        <Card className="p-2 Card_shadow mt-2 card_height">

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
                                            ? filterData.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage +
                                                rowsPerPage
                                            )
                                            : filterData
                                        ).map((row) => (
                                            <StyledTableRow>

                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    {row.name}
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"
                                                   
                                                >

                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"
                                                  
                                                >

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
                                    count={filterData.length}
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
