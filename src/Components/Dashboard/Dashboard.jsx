import React from 'react'
import HOC from "../../Common/HOC.jsx"
import { Card } from "@material-ui/core";
import "./Dashboard.css";

function Dashboard() {
    return (
        <>
            <div className="content_padding Page_width">
                <div className="ml-3 mr-3">
                    <div className="Content_topHeading">
                        Dashboard
                    </div>
                    <hr />

                    <div className='mb-3'>
                        <Card className="p-2 Card_shadow mt-2 card_height">
                            <div className="sub_content">Graph Details</div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Dashboard)
