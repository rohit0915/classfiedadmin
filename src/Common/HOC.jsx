import React, { Fragment, Component } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const HOC = (Wcomponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isloading: false,
            };
        }
        setLoading = () => {
            try {
                this.setState({
                    isloading: !this.state.isloading,
                });
            } catch (error) {
                console.log(error);
            }
        };


        render() {
            return (
                <Fragment>
                    <div className="app-container-hoc main-margin">
                        <Header setLoading={this.setLoading} {...this.props} />
                        <div className="d-flex">
                            <Sidebar isloading={this.state.isloading} {...this.props} />
                            <Wcomponent {...this.props} />
                        </div>
                        <Footer />
                    </div>
                </Fragment>
            );
        }
    }

};

export default HOC;