import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
// import //toast from "react-hot-//toast";

const userSlice = createSlice({
    name: "User",
    initialState: {
        user: {},
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        registerResponse(state, action) {
            state.loading = true;
        },
        registerSuccess(state, action) {
            state.loading = false;
        },
        registerFailed(state, action) {
            state.loading = false;
        },
        loginResponse(state, action) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload?.user || {};
            state.isAuthenticated = true;
            state.error = null
        },
        loginFailed(state, action) {
            state.loading = false;
            state.user = {};
            state.isAuthenticated = false;
            state.error = action.payload?.error
        },
        logoutResponse(state, action) {
            state.loading = true
        },
        logoutSuccess(state) {
            state.loading = false;
            state.user = {};
            state.isAuthenticated = false
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.user = {};
            state.isAuthenticated = false;
            state.error = action.payload?.error
        },
        updateProfileResponse(state, action) {
            state.loading = true
        },
        updateProfileSuccess(state) {
            state.loading = false;
        },
        updateProfileFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error
        },
    }
})

export const register = (userData) => async (dispatch) => {
    dispatch(userSlice.actions.registerResponse());
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/register`,
            userData,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(userSlice.actions.registerSuccess());
            //toast.success(data?.message);
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        dispatch(userSlice.actions.registerFailed({ error: error.response?.data?.message }));
        //toast.error(error.response?.data?.message);
    }
};
export const login = (userData) => async (dispatch) => {
    dispatch(userSlice.actions.loginResponse());
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/login`,
            userData,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(userSlice.actions.loginSuccess(data));
            //toast.success(data?.message);
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        dispatch(userSlice.actions.loginFailed({ error: error.response?.data?.message }));
        //toast.error(error.response?.data?.message);
    }
};

export const fetchUserProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.loginResponse());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/fetch-me`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(userSlice.actions.loginSuccess(data));
            //toast.success(data?.message);
            console.log(data?.message); //why i get 2 times message
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        dispatch(userSlice.actions.loginFailed({ error: error.response?.data?.message }));
        //toast.error(error.response?.data?.message);
    }
};

export const logout = () => async (dispatch) => {
    dispatch(userSlice.actions.logoutResponse());
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/logout`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(userSlice.actions.logoutSuccess());
            //toast.success(data?.message);
            console.log(data?.message);
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        dispatch(userSlice.actions.loginFailed({ error: error.response?.data?.message }));
        //toast.error(error.response?.data?.message);
    }
}


export const updateProfile = (userData, userId) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileResponse())
    try {
        const { data } = await axios.put(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/update/${userId}`, userData,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        if (data?.success) {
            dispatch(userSlice.actions.updateProfileSuccess());
            dispatch(fetchUserProfile())
            //toast.success(data?.message);
            console.log(data?.message);
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        dispatch(userSlice.actions.loginFailed({ error: error.response?.data?.message }));
        //toast.error(error.response?.data?.message);
    }
}



export default userSlice.reducer