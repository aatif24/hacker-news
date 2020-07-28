/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Loader from "./Loader";

const API_BASE_URL = "https://hacker-news.firebaseio.com/v0/";

const App = ({ id }) => {
    const [story, setStory] = useState({});
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let getStory = async () => {
            try {
                let res = await axios.get(API_BASE_URL + `item/${id}.json`);
                setStory(res["data"]);
            } catch (error) {}
        };
        getStory();
    }, [id]);

    let getComments = () => {
        let getComme = async () => {
            let comments = [];
            setCommentsLoading(true);
            try {
                if (story["kids"]) {
                    story["kids"] = story["kids"].sort(function (a, b) {
                        return b - a;
                    });
                    for (let i = 0; i < story["kids"].length; i++) {
                        let c = story["kids"][i];
                        let res = await axios.get(API_BASE_URL + `item/${c}.json`);

                        comments.push(res["data"]);
                    }
                    setComments(comments);
                    setCommentsLoading(false);
                }
            } catch (error) {}
        };
        getComme();
    };

    return (
        <>
            <div className="col-12 mb-3 ">
                <div className="card shadow border-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-10 col-lg-10">
                                <p className="h5 font-weight-bold">{story.title}</p>
                                <p dangerouslySetInnerHTML={{ __html: story.text }}></p>
                            </div>
                            <div className="col-md-2 col-lg-2">
                                {story.url && (
                                    <p className="text-right">
                                        <a href={story.url}>Know more</a>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p className="text-right text-muted text-capitalize p-0 m-0">
                                    <i className="fas fa-user"></i> {story.by}
                                </p>
                                <p className="text-right text-muted p-0 m-0">
                                    {moment.unix(story.time).format("LLL")}
                                </p>
                                {story.kids && story.kids.length ? (
                                    <div className="text-right">
                                        <button
                                            className="btn btn-link p-0 m-0"
                                            type="button"
                                            data-toggle="collapse"
                                            data-target={`#collapse${id}`}
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                            onClick={(e) => {
                                                getComments();
                                            }}
                                        >
                                            <i className="fas fa-comment-alt mr-1"></i>
                                            {story.kids && story.kids.length}
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className=" row mt-2 collapse comment-section" id={`collapse${id}`}>
                            {commentsLoading ? <Loader /> : null}
                            {comments.length ? (
                                <>
                                    <hr />
                                    {comments.map((v, i) => {
                                        return (
                                            <div className="row my-2" key={i}>
                                                <div className="col-12">
                                                    <small className=" text-capitalize border-bottom font-italic">
                                                        by {v.by}
                                                        {" - "}
                                                        {moment.unix(v.time).fromNow()}
                                                    </small>
                                                    <p
                                                        className="pl-4"
                                                        dangerouslySetInnerHTML={{ __html: v.text }}
                                                    ></p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <p>No comments</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
