import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import ManageCategory from "./Components/ManageCategory/ManageCategory";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import ManageSubCategory from "./Components/ManageCategory/ManageSubCategory";
import ManagePremium from "./Components/ManagePremium/ManagePremium";

//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ManageUserList from "./Components/ManageUser/ManageUserList";
import ManageAdverts from "./Components/ManageAdverts/ManageAdverts";

function App() {
  let isAuth = localStorage.getItem("isAuth");
  return (
    <>
      <ReactNotification />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/*Manage admin */}
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/manage-sub-category" element={<ManageSubCategory />} />

        {/* maange Premium */}
        <Route path="/manage-premium" element={<ManagePremium />} />

        {/* maange User */}
        <Route path="/manage-user" element={<ManageUserList />} />

        {/* maange Adverts */}
        <Route path="/manage-adverts" element={<ManageAdverts />} />

        {/*Manage Password */}
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
