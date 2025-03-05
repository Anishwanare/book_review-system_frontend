import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBook } from "../store/slices/uploadBookSlice";
import toast from "react-hot-toast";

const RegisterBook = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [bookImg, setBookImg] = useState(null);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.UploadBook);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !desc.trim() || !bookImg) {
            return toast.error("All fields are required!");
        }

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("desc", desc.trim());
        formData.append("bookImg", bookImg);
        const response = dispatch(uploadBook(formData));
        if (response) {
            setName("")
            setDesc("")
            setBookImg(null)
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center text-orange-600">Register a Book</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Book Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Enter book name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Enter book description"
                        rows="3"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        onChange={(e) => setBookImg(e.target.files[0])}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Register Book"}
                </button>
            </form>
        </div>
    );
};

export default RegisterBook;