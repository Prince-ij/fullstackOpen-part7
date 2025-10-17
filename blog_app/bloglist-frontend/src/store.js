import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./reducers/notification";
import blogSlice from "./reducers/blog"
import userSlice from "./reducers/users"

const store = configureStore({
    reducer: {
        notification: notificationSlice,
        blogs: blogSlice,
        user: userSlice
    }
})

export default store;
