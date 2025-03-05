import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import toast from "react-hot-toast";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
        book: {},
        loading: false,
        error: null
    },
    reducers: {
        fetchBooksResponse(state) {
            state.loading = true;
        },
        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload?.books
        },
        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error
        },
        fetchSingleBookRequest(state) {
            state.loading = true
        },
        fetchSingleBookSuccess(state, action) {
            state.loading = false;
            state.book = action.payload?.book
        },
        fetchSingleBookFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error
        },
        deleteBookRequest(state, action) {
            state.loading = true
        },
        deleteBookSuccess(state, action) {
            state.loading = false
        },
        deleteBookFailed(state, action) {
            state.loading = false
            state.error = action.payload?.error
        },
    }
})


export const fetchBooks = () => async (dispatch) => {
    dispatch(bookSlice.actions.fetchBooksResponse())
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v2/book/fetch-all-book`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(bookSlice.actions.fetchBooksSuccess(data));
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        dispatch(bookSlice.actions.fetchBooksFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "Failed to fetched books");
    }
}

export const fetchBookById = (bookId) => async (dispatch) => {
    dispatch(bookSlice.actions.fetchSingleBookRequest())
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v2/book/fetch-single-book/${bookId}`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(bookSlice.actions.fetchSingleBookSuccess(data));
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        dispatch(bookSlice.actions.fetchSingleBookFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "Failed to fetched books");
    }
}
export const deleteBookById = (bookId) => async (dispatch) => {
    dispatch(bookSlice.actions.deleteBookRequest());

    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v2/book/delete/${bookId}`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(bookSlice.actions.deleteBookSuccess());
            dispatch(fetchBooks())
            toast.success(data?.message);
        }
    } catch (error) {
        dispatch(bookSlice.actions.deleteBookFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "Failed to delete book");
    }
};


export default bookSlice.reducer