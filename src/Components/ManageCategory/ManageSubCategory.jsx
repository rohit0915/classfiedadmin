import React, { useState, useEffect } from 'react';
import HOC from "../../Common/HOC.jsx"
import "./Category.css";
import Expand from 'react-expand-animated';

//material ui data table
import { Card, Grid, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

import { useLocation } from 'react-router-dom';

//for API Call
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";

function ManageSubCategory(props) {

    const { state } = useLocation();

    let CategoryName = state.categoryname;
    let CategoryId = state._id

    const [subcategoryname, setsubcategoryname] = useState("");
    const [subcategoryimage, setsubcategoryimage] = useState(null)
    const [CategoryDataArr, setCategoryDataArr] = useState([])
    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)

    const [EditDailogOpen, setEditDailogOpen] = useState(false)
    const [EditsubCategoryName, setEditsubCategoryName] = useState("")
    const [EditsubCategoryImage, setEditsubCategoryImage] = useState("")
    const [EditCatgoryId, setEditCatgoryId] = useState("")
    const [EditCategoryName, setEditCategoryName] = useState("")
    const [EditID, setEditID] = useState("")

    //errors
    const [subcategoryNameError, setsubcategoryNameError] = useState(false)
    const [subCategoryImageError, setsubCategoryImageError] = useState(false)
    const [EditsubcategoryNameError, setEditsubcategoryNameError] = useState(false)
    const [EditsubCategoryImageError, setEditsubCategoryImageError] = useState(false)

    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);

        const getUserDetails = () => {
            try {
                setisloading(true);
                let url = getBaseUrl() + "api/v1/subCategory/getallsubCategory";
                axios.get(url, {
                    headers: {
                        token: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }).then(
                    (res) => {
                        console.log("res::", res);
                        setCategoryDataArr(res.data.data)
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

    const [AddCategory, setAddCategory] = useState(false)

    const handleChangePage = (event, newPage) => {
        window.scrollTo(0, 0);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const AddCategorydata = () => {
        try {
            if (!blankValidator(subcategoryname)) {
                setsubcategoryNameError(true);
                return
            }
            if (!blankValidator(subcategoryimage)) {
                setsubCategoryImageError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + "api/v1/subCategory/addsubcategory";

            let fd = new FormData();
            fd.append("categoryId", CategoryId);
            fd.append("subcategoryname", subcategoryname);
            fd.append("subcategoryimage", subcategoryimage);
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        console.log("add res", res)
                        showNotificationMsz(res.data.message, "success")
                        setisUpdated(!isUpdated)
                        setAddCategory(!AddCategory)
                        setsubcategoryname("");
                        setsubcategoryimage(null)
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

    //to delete Category
    const DeleteCategory = (ID) => {
        //delete Id
        let id = ID

        try {
            setisloading(true)
            let url = getBaseUrl() + `api/v1/subCategory/deleteSubcategory/${id}`;
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

    //set Edit category data
    const EditCategoryData = (data) => {

        setEditsubCategoryName(data.subcategoryname)
        setEditsubCategoryImage(data.subcategoryimage)
        setEditID(data._id)
        setEditCatgoryId(data.categoryId._id)
        setEditCategoryName(data.categoryId.categoryname)
        setEditDailogOpen(!EditDailogOpen)
    }



    const HandleEditCategoryData = (ID) => {
        let id = ID
        try {
            if (!blankValidator(EditsubCategoryName)) {
                setEditsubcategoryNameError(true);
                return
            }
            if (!blankValidator(EditsubCategoryImage)) {
                setEditsubCategoryImageError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + `api/v1/subCategory/editsubCategory/${id}`;

            let fd = new FormData();
            fd.append("categoryId", EditCatgoryId)
            fd.append("subcategoryname", EditsubCategoryName);
            fd.append("subcategoryimage", EditsubCategoryImage);
            axios
                .put(url, fd)
                .then(
                    (res) => {
                        console.log("add res", res)
                        showNotificationMsz(res.data.message, "success")
                        setisUpdated(!isUpdated)
                        setEditDailogOpen(!EditDailogOpen)
                        setEditsubCategoryName("");
                        setEditsubCategoryImage(null)
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
                        Manage Sub-Category
                    </div>
                    <hr />

                    <div className="text-center sub_content mt-3 mb-2">Sub-Category List</div>
                    <div ><span className="hover_cursor" onClick={() => setAddCategory(!AddCategory)}><i className='fa fa-plus-circle mr-1' />Add sub-Category</span></div>

                    <Expand open={AddCategory}>
                        <Card className="p-2 Card_shadow mt-2">
                            <div className='text_feild_heading'>Category Name</div>
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={CategoryName}
                                    disabled={true}
                                />

                            </div>

                            <div className='text_feild_heading mt-2'>Enter Sub-Category</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Category Name"
                                    className="form-control"
                                    value={subcategoryname}
                                    onChange={(e) => {
                                        setsubcategoryNameError(false)
                                        setsubcategoryname(e.target.value)
                                    }}
                                />
                                {subcategoryNameError && (
                                    <span className="text-danger">Enter sub-Category Name</span>
                                )}
                            </div>

                            <div className='text_feild_heading mt-2'>Image</div>
                            <div>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => {
                                        setsubCategoryImageError(false)
                                        setsubcategoryimage(e.target.files[0])
                                    }}
                                />
                                {subCategoryImageError && (
                                    <span className="text-danger">Choose the sub-Category image</span>
                                )}
                            </div>

                            <div className='mt-2 mb-2'>
                                <Button className='add_button' onClick={AddCategorydata}>Add</Button>
                            </div>
                        </Card>
                    </Expand>
                    <div className="mb-3">
                        <Card className="p-2 Card_shadow mt-2">

                            <Grid className="Component_main_grid">
                                <Grid item md={3} className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search by sub-Category Name"
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
                                                Category Image
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="left"
                                                className="table_header"
                                            >
                                                Name
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
                                            ? CategoryDataArr.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage +
                                                rowsPerPage
                                            )
                                            : CategoryDataArr
                                        ).map((row) => (
                                            <StyledTableRow>
                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    <img src={getBaseUrl() + row.subcategoryimage} alt="" style={{ height: "50px", width: "50px" }} />
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    {row.subcategoryname}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    <div>
                                                        <span className='text-info hover_cursor'>
                                                            <i className='fa fa-edit' onClick={() => EditCategoryData(row)} />
                                                        </span>
                                                        <span className='ml-5 text-info hover_cursor'>
                                                            <i className='fa fa-trash' onClick={() => DeleteCategory(row._id)} />
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
                                    count={CategoryDataArr.length}
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

            <Dialog
                open={EditDailogOpen}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth="fullWidth"
            >
                <DialogTitle>
                    Edit Sub-Category Data
                    <span
                        className="float-right icon_color"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        <i class="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>

                    <div className='text_feild_heading'>Category Name</div>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            value={EditCategoryName}
                            disabled={true}
                        />

                    </div>

                    <div className='text_feild_heading mt-2'>Enter sub-Category</div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Category Name"
                            className="form-control"
                            value={EditsubCategoryName}
                            onChange={(e) => {
                                setEditsubcategoryNameError(false)
                                setEditsubCategoryName(e.target.value)
                            }}
                        />
                        {EditsubcategoryNameError && (
                            <span className="text-danger">Enter sub-Category Name</span>
                        )}
                    </div>

                    <div className='text_feild_heading mt-2'>Image</div>
                    <div>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => {
                                setEditsubCategoryImageError(false)
                                setEditsubCategoryImage(e.target.files[0])
                            }}
                        />
                        {EditsubCategoryImageError && (
                            <span className="text-danger">Choose the sub-Category Image</span>
                        )}
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button
                        className="add_button"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="add_button"
                        onClick={() => HandleEditCategoryData(EditID)}
                    >
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>

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

export default HOC(ManageSubCategory)
