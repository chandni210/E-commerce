import "./Slidebar.css";
import React from 'react';
import logo from "../../Image/logo.png";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { TreeView, TreeItem } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImportExportIcon from "@material-ui/icons/ImportExport";

const Slidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>
            <Link to="#">
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId='1' label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId='2' label="All" icon={<PostAddIcon />} />
                        </Link>
                        <Link to="/admin/newproduct">
                            <TreeItem nodeId='3' label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon /> Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon /> Reviews
                </p>
            </Link>
        </div>
    );
};
export default Slidebar;