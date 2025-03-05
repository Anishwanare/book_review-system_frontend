import React, { useEffect, useState } from "react";
import RegisterBook from "./RegisterBook";
import MyPublishBooks from "./MyPublishBooks";
import { useDispatch, useSelector } from "react-redux";
import { myPublishBooks } from "../store/slices/uploadBookSlice";
import { FiBook, FiPlusCircle, FiMenu, FiX } from "react-icons/fi";

const AdminDashboard = () => {
    const { loading } = useSelector((state) => state.UploadBook);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("mybooks");



    useEffect(() => {
        dispatch(myPublishBooks());
    }, [dispatch]);

    return (
        <div className="flex min-h-screen bg-gray-50 w-full">
            <aside className={`hidden md:block fixed z-50 bg-white shadow-lg border-r h-screen w-72 p-6 transition-transform duration-300 md:translate-x-0`}>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                </div>

                <div className="mt-6 space-y-3 ">
                    <button
                        className={`flex items-center w-full p-3 text-left font-semibold rounded-lg transition duration-200 ${selected === "mybooks" ? "bg-orange-500 text-white" : "hover:bg-orange-200"}`}
                        onClick={() => { setSelected("mybooks"); }}
                    >
                        <FiBook className="mr-3 text-xl" />
                        My Books
                    </button>
                    <button
                        className={`flex items-center w-full p-3 text-left font-semibold rounded-lg transition duration-200 ${selected === "register" ? "bg-orange-500 text-white" : "hover:bg-orange-200"}`}
                        onClick={() => { setSelected("register"); }}
                    >
                        <FiPlusCircle className="mr-3 text-xl" />
                        Register Book
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 bg-gray-100 w-full md:ml-72">

                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : selected === "register" ? (
                    <RegisterBook />
                ) : (
                    <MyPublishBooks />
                )}
            </main>

            <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-2 flex justify-around md:hidden">
                <button
                    className={`flex flex-col items-center p-2 text-sm ${selected === "mybooks" ? "text-orange-500 font-bold" : "text-gray-700"}`}
                    onClick={() => setSelected("mybooks")}
                >
                    <FiBook className="text-2xl" />
                    My Books
                </button>
                <button
                    className={`flex flex-col items-center p-2 text-sm ${selected === "register" ? "text-orange-500 font-bold" : "text-gray-700"}`}
                    onClick={() => setSelected("register")}
                >
                    <FiPlusCircle className="text-2xl" />
                    Register
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
