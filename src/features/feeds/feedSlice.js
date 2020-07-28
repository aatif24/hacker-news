import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = "https://hacker-news.firebaseio.com/v0/";

export const counterSlice = createSlice({
    name: "feeds",
    initialState: {
        feeds: [],
        story: {},
        loading: false,
    },
    reducers: {
        feeds: (state, action) => {
            state.feeds = action.payload;
        },
        loading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { feeds, loading } = counterSlice.actions;

export const getStories = (type = "top") => (dispatch) => {
    dispatch(loading(true));
    axios
        .get(API_BASE_URL + `${type}stories.json`)
        .then(async (response) => {
            dispatch(feeds(response.data.slice(0, 10)));
            dispatch(loading(false));
        })
        .catch((err) => {
            console.log(err);
        });
};
export const getStory = (id) => (dispatch) => {
    // dispatch(loading(true));
    // axios
    //     .get(API_BASE_URL + `item/${id}.json`)
    //     .then((response) => {
    //         dispatch(story(response.data));
    //         dispatch(loading(false));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
};

export default counterSlice.reducer;
