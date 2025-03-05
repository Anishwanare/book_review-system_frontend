import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import bookReducer from "./slices/bookSlice"
import reviewReducer from "./slices/reviewSlice"
import uploadBookReducer from "./slices/uploadBookSlice"

export const store = configureStore({
    reducer: {
        User: userReducer,
        Book: bookReducer,
        Review: reviewReducer,
        UploadBook: uploadBookReducer
    }
})