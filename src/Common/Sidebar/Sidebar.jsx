import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
    faFile,
    faLaptopHouse,
    faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
    const navigate = useNavigate();
    return (
        <>

            <div className="sidebar_in_mobile_view">
                <ProSidebar collapsed={props.isloading}>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FontAwesomeIcon icon={faLaptopHouse} />} onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </MenuItem>

                        <MenuItem icon={<FontAwesomeIcon icon={faFile} />} onClick={() => navigate("/manage-category")}>
                            Manage Category
                        </MenuItem>

                        <MenuItem icon={<FontAwesomeIcon icon={faFile} />} onClick={() => navigate("/manage-premium")}>
                            Manage Premium
                        </MenuItem>

                    </Menu>
                </ProSidebar>
            </div>

        </>
    );
}

export default Sidebar;
