import React, { useState } from 'react';

//material ui appbar
import { AppBar, Toolbar } from "@material-ui/core";

//css file
import "./Header.css";
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    let UserName = localStorage.getItem("fullname")

    /*local state */
    const [Sidebar, setSidebar] = useState(false);

    /*function to open a sidebar */
    const setLoadingnewside = () => {
        document.getElementById("mySidenav").style.width = "250px";
        setSidebar(true)
    };

    /*function to close a sidebar */
    const Closesidebar = () => {
        document.getElementById("mySidenav").style.width = "0px";
        setSidebar(false)
    }
    return (
        <div className="topheader">
            <AppBar position="fixed" className="MainHeader">
                <Toolbar className="header_padding">

                    <div className="d-flex">
                        <span className="toggle_button_sidebar mt-2">
                            <i class="fa fa-bars mr-2"
                                onClick={() => {
                                    props.setLoading();
                                }}>
                            </i></span>
                        <span className='mt-1 logo_font'><strong>Classified</strong></span>
                    </div>
                    <div className="header_grow" />
                    <div className="header_links">
                        <span className="" >
                            <div class="dropdown ">
                                <div data-toggle="dropdown" className='hover_cursor'>
                                    <span className='userproile mr-2 p-2'>{UserName !== null && UserName.substring(0, 2)}</span>
                                    <span>{UserName}</span>
                                </div>
                                <div class="dropdown-menu animate slideIn dopdown_formatting">
                                    <div className="dropdownLinks p-2" onClick={() => navigate("/change-password")}>
                                        <span><i className="fa fa-cog mr-3" />Change Password</span>
                                    </div>
                                    <hr />
                                    <div className="dropdownLinks p-2 mt-1" onClick={() => {
                                        navigate("/")
                                        localStorage.clear()
                                    }}>
                                        <span><i className="fa fa-sign-out mr-3" />LogOut</span>
                                    </div>

                                </div>
                            </div>
                        </span>

                    </div>
                    <div className="mobile_Burger_Menu">
                        <span
                            className="logout_Pointer_cursor mr-3 text-right mt-2"
                            onClick={!Sidebar ? setLoadingnewside : Closesidebar}
                        >
                            <i class="fa fa-bars"></i>
                        </span>

                        <div id="mySidenav" className="sidenav">
                            <div className="cross_icon_style">
                                <i
                                    class="fa fa-times cursor"
                                    onClick={() => {
                                        document.getElementById("mySidenav").style.width =
                                            "0px";
                                        setSidebar(false);
                                    }}
                                ></i>
                            </div>
                            <div className="text-center">
                                <span className='mt-1 logo_font'><strong>Classified</strong></span>
                            </div>
                            <span className="logout_Pointer_cursor mt-2" onClick={() => navigate("/dashboard")}>
                                Dashboard
                            </span>

                            <span className="logout_Pointer_cursor mt-2" onClick={() => navigate("/manage-category")}>
                                Manage Category
                            </span>

                            <span className="logout_Pointer_cursor mt-2" onClick={() => navigate("/manage-premium")}>
                                Manage Premium
                            </span>

                            <span className="logout_Pointer_cursor mt-2" onClick={() => navigate("/change-password")}>
                                Change Password
                            </span>

                            <span className="logout_Pointer_cursor mt-2"
                                onClick={() => {
                                    navigate("/")
                                    localStorage.clear()
                                }}>
                                Log Out
                            </span>

                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
