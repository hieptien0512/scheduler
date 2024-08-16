import React from "react";

function Footer() {
    return (
        <React.Fragment>
            <footer style={{
                background: "linear-gradient(to right, #f9f777, #f9f777)",
                color: "white"
            }}>
                <div className="container" >
                    <div className="row">
                        <div className="col-md-12">
                            <p>Scheduler v1.0.0</p>
                        </div>
                    </div>
                </div>

            </footer>

        </React.Fragment>
    );
}

export default Footer;