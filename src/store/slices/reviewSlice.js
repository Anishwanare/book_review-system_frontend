import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import //toast from "react-hot-//toast";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        averageRating: 0,
        totalReviews: 0,
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchReviewRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchReviewSuccess(state, action) {
            state.loading = false;
            state.averageRating = action.payload?.averageRating || 0;
            state.totalReviews = action.payload?.totalReviews || 0;
            state.reviews = action.payload?.reviews || [];
        },
        fetchReviewFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
        uploadReviewResponse(state) {
            state.loading = true
        },
        uploadReviewSuccess(state) {
            state.loading = false
        },
        uploadReviewFailed(state) {
            state.loading = false
        },
    },
});

export const getBookReviewById = (id) => async (dispatch) => {
    dispatch(reviewSlice.actions.fetchReviewRequest());
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v2/book/average-book-review/${id}`);
        dispatch(reviewSlice.actions.fetchReviewSuccess(data));
        //toast.success(data.message);
    } catch (error) {
        dispatch(reviewSlice.actions.fetchReviewFailure({ error: error.message }));
        //toast.error("Failed to fetch reviews");
    }
};

export const sendReview = (formData, id) => async (dispatch) => {
    dispatch(reviewSlice.actions.uploadReviewResponse());
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v2/book/give-review/${id}`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(reviewSlice.actions.uploadReviewSuccess(response.data));
        dispatch(getBookReviewById(id))
        //toast.success(response.data?.message);
    } catch (error) {
        dispatch(reviewSlice.actions.uploadReviewFailed({ error: error.message }));
        //toast.error(error.response?.data?.message);
    }
}

export default reviewSlice.reducer;
