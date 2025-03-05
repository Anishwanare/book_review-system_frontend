import React, { memo, useState, useEffect } from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { logout } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const Header = () => {
    const [login, setLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.User);
    const dispatch = useDispatch();


    return (
        <header className="bg-white text-black p-4 flex items-center justify-between shadow-lg px-6 md:px-10 relative">

            <Link to={"/"}>
                <div className="text-2xl font-bold cursor-pointer">
                    {import.meta.env.VITE_APP_NAME || "BookNexus"}
                </div>
            </Link>


            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-40 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <button
                    className="absolute top-4 right-4 text-3xl cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                >
                    <HiX />
                </button>
            </div>

            <div className="relative">
                {!isAuthenticated ? (
                    <div className="flex gap-5">
                        <button
                            className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                            onClick={() => setLogin(true)}
                        >
                            Sign In
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-5 items-center justify-between flex-row-reverse">
                        <div>
                            <FaRegUserCircle
                                className="text-3xl cursor-pointer"
                                onClick={() => setProfileOpen(!profileOpen)}
                            />

                            {profileOpen && (
                                <div
                                    className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 w-48 z-30"
                                    onMouseLeave={() => setProfileOpen(false)}
                                >
                                    <p className="font-semibold">{user?.name || "Guest"}</p>
                                    <p className="text-sm text-gray-600">{user?.email || "No Email"}</p>
                                    {isAuthenticated && user?.role === "Admin" &&
                                        <Link to={'/dashboard'}>
                                            <button
                                                className="mt-3 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"

                                            >
                                                Dashboard
                                            </button>
                                        </Link>
                                    }
                                    <Link to={`/profile/${user._id}`}>
                                        <button
                                            className="mt-3 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                                            onClick={() => {
                                                setProfileOpen(false);
                                            }}
                                        >
                                            Profile
                                        </button>
                                    </Link>
                                    <button
                                        className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                                        onClick={() => {
                                            dispatch(logout());
                                            setProfileOpen(false);
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {isAuthenticated && user?.role === "Admin" &&
                            <Link to={'/dashboard'}>
                                <button
                                    className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"

                                >
                                    Dashboard
                                </button>
                            </Link>
                        }
                    </div>
                )}
            </div>

            {login && !isAuthenticated && <Login setLogin={setLogin} />}
        </header>
    );
};

export default memo(Header);
