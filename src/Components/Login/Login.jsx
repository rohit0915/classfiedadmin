import React, { useState, useEffect } from "react";

//css file
import "./Login.css";

//login,register,resetpassword uses material ui text-feild
import { Button, Card, TextField, IconButton, OutlinedInput, InputAdornment, FormControl } from "@material-ui/core";

//icons to show & hide th password
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useNavigate } from 'react-router-dom';


//for API Call
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";

const Login = (props) => {
    const navigate = useNavigate();

    //---------------------local state ----------------------
    const [showPassword, setshowPassword] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [isloading, setisloading] = useState(false)

    //error 
    const [emailError, setemailError] = useState(false);
    const [emailMatchError, setemailMatchError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const LoginUserData = () => {
        try {
            if (!blankValidator(email)) {
                setemailError(true);
                return
            }
            if (!emailValidator(email)) {
                setemailMatchError(true);
                return
            }
            if (!blankValidator(password)) {
                setpasswordError(true);
                return
            }
            setisloading(true)
            let url = getBaseUrl() + "api/v1/admin/adminlogin";

            let temp = {
                email: email,
                password: password
            }
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        localStorage.setItem("accessToken", res.data.data.accessToken)
                        localStorage.setItem("fullname", res.data.data.fullname)
                        if (res.data.data.accessToken) {
                            localStorage.setItem("isAuth", true)
                        }
                        showNotificationMsz(res.data.message, "success")
                        navigate("/dashboard")
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
            <div className="Login_Main_div content_padding">
                <Card className="pt-2 pb-2 Card_shadow form_width mt-2">
                    <div className="login_heading">
                        Login
                    </div>
                    <div className="main_padding_top_bottom">
                        <div>
                            <TextField
                                placeholder="Email Address *"
                                id="outlined-basic"
                                variant="outlined"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => {
                                    setemailError(false)
                                    setemailMatchError(false)
                                    setemail(e.target.value)
                                }}
                            />
                            {emailError && (
                                <span className="text-danger">Enter the Email Address</span>
                            )}
                            {emailMatchError && (
                                <span className="text-danger">Enter the Correct Email Address</span>
                            )}

                        </div>

                        <div className="mt-2">
                            <FormControl className="MuiFormControl-fullWidth" variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    placeholder="Password *"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => {
                                        setpasswordError(false)
                                        setpassword(e.target.value)
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setshowPassword(!showPassword)}
                                                onMouseDown={(event) => event.preventDefault()}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            {passwordError && (
                                <span className="text-danger">Enter the Password</span>
                            )}
                        </div>

                        <div className="inputfiledformatting mt-2">
                            <Button
                                variant="contained"
                                className="Login_page_button"
                                onClick={LoginUserData}

                            >
                                Log in
                            </Button>
                        </div>
                        <div className="text-right text-info hover_cursor  mb-3" >
                            Forgot Password?
                        </div>
                    </div>


                </Card>
            </div>

            <Loder loading={isloading} />
        </>
    );
};

export default Login;
