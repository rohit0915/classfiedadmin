import React from 'react'
import "./Footer.css"
function Footer() {
    return (
        <>
            <div className="Footer_BackGround p-3">
                <div className="text-center">@ {new Date().getFullYear()} All Rights Reserved</div>
            </div>
        </>
    )
}

export default Footer
