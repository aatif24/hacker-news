import React from "react";

const App = ({ story, setStory }) => {
    return (
        <>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <p
                        className={story === "top" ? "nav-link active" : "nav-link"}
                        onClick={(e) => setStory("top")}
                        aria-current="page"
                    >
                        Top
                    </p>
                </li>
                <li className="nav-item">
                    <p
                        className={story === "new" ? "nav-link active" : "nav-link"}
                        onClick={(e) => setStory("new")}
                    >
                        New
                    </p>
                </li>
                <li className="nav-item">
                    <p
                        className={story === "ask" ? "nav-link active" : "nav-link"}
                        onClick={(e) => setStory("ask")}
                    >
                        Ask
                    </p>
                </li>
                <li className="nav-item">
                    <p
                        className={story === "show" ? "nav-link active" : "nav-link"}
                        onClick={(e) => setStory("show")}
                    >
                        Show
                    </p>
                </li>
                <li className="nav-item">
                    <p
                        className={story === "job" ? "nav-link active" : "nav-link"}
                        onClick={(e) => setStory("job")}
                    >
                        Job
                    </p>
                </li>
            </ul>
        </>
    );
};

export default App;
