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

import { useNavigate } from 'react-router-dom';

//for API Call
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";

function ManageCategory(props) {
    const [categoryname, setcategoryname] = useState("");
    const [categoryimage, setcategoryimage] = useState(null)
    const [CategoryDataArr, setCategoryDataArr] = useState([])
    const [isloading, setisloading] = useState(false)
    const [isUpdated, setisUpdated] = useState(false)
    const [name, setname] = useState("")

    const [EditDailogOpen, setEditDailogOpen] = useState(false)
    const [EditCategoryName, setEditCategoryName] = useState("")
    const [EditCategoryImage, setEditCategoryImage] = useState("")
    const [EditID, setEditID] = useState("")

    //errors
    const [categoryNameError, setcategoryNameError] = useState(false)
    const [CategoryImageError, setCategoryImageError] = useState(false)
    const [EditcategoryNameError, setEditcategoryNameError] = useState(false)
    const [EditCategoryImageError, setEditCategoryImageError] = useState(false)

    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);

        const getUserDetails = () => {
            try {
                setisloading(true);
                let url = getBaseUrl() + "api/v1/category/getallcategory";
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
            if (!blankValidator(categoryname)) {
                setcategoryNameError(true);
                return
            }
            if (!blankValidator(categoryimage)) {
                setCategoryImageError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + "api/v1/category/addcategory";

            let fd = new FormData();
            fd.append("categoryname", categoryname);
            fd.append("categoryimage", categoryimage);
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        console.log("add res", res)
                        showNotificationMsz(res.data.message, "success")
                        setisUpdated(!isUpdated)
                        setAddCategory(!AddCategory)
                        setcategoryname("");
                        setcategoryimage(null)
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
            let url = getBaseUrl() + `api/v1/category/deletecategory/${id}`;
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
        setEditCategoryName(data.categoryname)
        setEditCategoryImage(data.categoryimage)
        setEditID(data._id)
        setEditDailogOpen(!EditDailogOpen)
    }



    const HandleEditCategoryData = (ID) => {
        let id = ID
        try {
            if (!blankValidator(EditCategoryName)) {
                setEditcategoryNameError(true);
                return
            }
            if (!blankValidator(EditCategoryImage)) {
                setEditCategoryImageError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + `api/v1/category/editcategory/${id}`;

            let fd = new FormData();
            fd.append("categoryname", EditCategoryName);
            fd.append("categoryimage", EditCategoryImage);
            axios
                .put(url, fd)
                .then(
                    (res) => {
                        console.log("add res", res)
                        showNotificationMsz(res.data.message, "success")
                        setisUpdated(!isUpdated)
                        setEditDailogOpen(!EditDailogOpen)
                        setEditCategoryName("");
                        setEditCategoryImage(null)
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

    const filterCategoryDataArr = CategoryDataArr.filter((event) => {
        return (
            event.categoryname.toLowerCase().indexOf(name.toLowerCase()) !== -1
        );
    });
    return (
        <>
            <div className="Page_width content_padding" >
                <div className="ml-3 mr-3">
                    <div className="Content_topHeading">
                        Manage Category
                    </div>
                    <hr />

                    <div className="text-center sub_content mt-3 mb-2">Category List</div>
                    <div ><span className="hover_cursor" onClick={() => setAddCategory(!AddCategory)}><i className='fa fa-plus-circle mr-1' />Add Category</span></div>

                    <Expand open={AddCategory}>
                        <Card className="p-2 Card_shadow mt-2">
                            <div className='text_feild_heading'>Enter Category</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Category Name"
                                    className="form-control"
                                    value={categoryname}
                                    onChange={(e) => {
                                        setcategoryNameError(false)
                                        setcategoryname(e.target.value)
                                    }}
                                />
                                {categoryNameError && (
                                    <span className="text-danger">Enter Category Name</span>
                                )}
                            </div>

                            <div className='text_feild_heading mt-2'>Image</div>
                            <div>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => {
                                        setCategoryImageError(false)
                                        setcategoryimage(e.target.files[0])
                                    }}
                                />
                                {CategoryImageError && (
                                    <span className="text-danger">Choose the Category image</span>
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
                                        placeholder="Search by Category Name"
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
                                            ? filterCategoryDataArr.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage +
                                                rowsPerPage
                                            )
                                            : filterCategoryDataArr
                                        ).map((row) => (
                                            <StyledTableRow>
                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    <img src={getBaseUrl() + row.categoryimage} alt="" style={{ height: "50px", width: "50px" }} />
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"
                                                >
                                                    {row.categoryname}
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

                                                        <span className='ml-5 text-info hover_cursor' onClick={() => navigate("/manage-sub-category", { state: row })}>
                                                            Manage Subcategory
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
                                    count={filterCategoryDataArr.length}
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
                    Edit Category Data
                    <span
                        className="float-right icon_color"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        <i class="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>

                    <div className='text_feild_heading'>Enter Category</div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Category Name"
                            className="form-control"
                            value={EditCategoryName}
                            onChange={(e) => {
                                setEditcategoryNameError(false)
                                setEditCategoryName(e.target.value)
                            }}
                        />
                        {EditcategoryNameError && (
                            <span className="text-danger">Enter Category Name</span>
                        )}
                    </div>

                    <div className='text_feild_heading mt-2'>Image</div>
                    <div>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => {
                                setEditCategoryImageError(false)
                                setEditCategoryImage(e.target.files[0])
                            }}
                        />
                        {EditCategoryImageError && (
                            <span className="text-danger">Choose the Category Image</span>
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

export default HOC(ManageCategory)
