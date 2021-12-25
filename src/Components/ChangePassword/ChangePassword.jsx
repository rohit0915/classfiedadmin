import React from 'react';
import HOC from "../../Common/HOC.jsx"

//material ui data table
import { Card, Grid, Button } from "@material-ui/core";

function ChangePassword(props) {

    return (
        <>
            <div className="Page_width content_padding" >
                <div className="ml-3 mr-3">
                    <div className="Content_topHeading">
                        Manage User
                    </div>
                    <hr />

                    <div className="text-center sub_content mt-3 mb-2">Update Password</div>

                    <div className="mb-3">
                        <Card className="p-2 Card_shadow mt-2">

                            <Grid className="Component_main_grid">
                                <Grid item md={1} className="p-2">
                                </Grid>
                                <Grid item md={10} sm={12} className="p-3">
                                    <div className="text_feild_heading">User Name</div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter User Name"
                                            className="form-control"
                                        />
                                    </div>


                                    <div className="text_feild_heading mt-1">New Password</div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter New Password"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="text_feild_heading mt-1">Retype New Password</div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Retype New Password"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="text-right mt-3 mb-3">
                                        <span> <Button className="add_button">Submit</Button></span>
                                    </div>
                                </Grid>
                                <Grid item md={1} className="p-2"></Grid>
                            </Grid>

                        </Card>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HOC(ChangePassword)
