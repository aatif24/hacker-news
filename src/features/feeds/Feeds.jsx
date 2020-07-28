/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStories } from "./feedSlice.js";
import Feed from "../../components/FeedCard";
import Filter from "../../components/Filter";
import Loader from "../../components/Loader";

const App = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState("top");
    const { feeds, loading } = useSelector((state) => state.feeds);

    useEffect(() => {
        dispatch(getStories(type));
    }, []);

    useEffect(() => {
        dispatch(getStories(type));
    }, [type]);

    return (
        <>
            {loading && <Loader />}

            <div className="container mx-0 px-0">
                <div className="row">
                    <Filter story={type} setStory={setType} />
                </div>

                <div className="row">
                    {feeds && feeds.length
                        ? feeds.map((v, i) => {
                              return <Feed key={i} id={v} />;
                          })
                        : null}
                </div>
            </div>
        </>
    );
};

export default App;
