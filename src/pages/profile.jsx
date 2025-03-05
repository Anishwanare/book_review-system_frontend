import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateProfile } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.User);
    const { userId } = useParams()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email) {
            return toast.error("Name and Email are required!");
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        dispatch(updateProfile(formData, userId));
        navigate('/')

    };

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])

    return (
        <div className="h-screen flex items-center justify-center bg-black bg-opacity-50 px-5">
            <div className="w-full max-w-lg bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-orange-600 mb-4">
                    Update Profile
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
