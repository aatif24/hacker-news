import React from "react";
import moment from "moment";
import Loader from "./Loader";
const App = ({ data }) => {

    return (
        <>
            {data.length ? (
                data.map((v, i) => {
                    return (
                        <div className="row my-2 p-5">
                            <div className="col-md-6">
                                <p>{v.text}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-right text-capitalize">{v.by}</p>
                                <p className="text-right">{moment.unix(v.time).fromNow()}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <Loader />
            )}
        </>
    );
};

export default App;
