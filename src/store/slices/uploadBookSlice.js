import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const uploadBookSlice = createSlice({
    name: "uploadBook",
    initialState: { book: null, loading: false, error: null, myBooks: [] },
    reducers: {
        uploadBookResponse(state) {
            state.loading = true;
        },
        uploadBookSuccess(state) {
            state.loading = false;
        },
        uploadBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
        },
        myBooksResponse(state) {
            state.loading = true;
        },
        myBooksSuccess(state, action) {
            state.loading = false;
            state.myBooks = action.payload?.books
        },
        myBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
        },
    },
});

export const uploadBook = (formData) => async (dispatch) => {
    dispatch(uploadBookSlice.actions.uploadBookResponse());
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v2/book/publish`,
            formData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        if (data.success) {
            dispatch(uploadBookSlice.actions.uploadBookSuccess());
        }
        toast.success(data.message);
    } catch (error) {
        toast.error("Failed to upload book");
        dispatch(
            uploadBookSlice.actions.uploadBookFailed({
                error: error?.response?.data?.error,
            })
        );
    }
};

export const myPublishBooks = () => async (dispatch) => {
    dispatch(uploadBookSlice.actions.myBooksResponse());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v2/book/fetch-publisher-book`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        if (data.success) {
            dispatch(uploadBookSlice.actions.myBooksSuccess(data));
        }
        toast.success(data.message);
    } catch (error) {
        toast.error("Failed to upload book");
        dispatch(
            uploadBookSlice.actions.myBooksFailed({
                error: error?.response?.data?.error,
            })
        );
    }
};

export default uploadBookSlice.reducer;
