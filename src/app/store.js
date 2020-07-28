import { configureStore } from '@reduxjs/toolkit';
import feeds from "../features/feeds/feedSlice";

export default configureStore({
    reducer: {
        feeds: feeds,
    },
});
