import React, { useState, useEffect, memo } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";

const Login = ({ setLogin }) => {
    const [email, setEmail] = useState("anishwanare@gmail.com");
    const [password, setPassword] = useState("12345678");
    const [name, setName] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.User)


    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        if (showSignup) {
            formdata.append('name', name)
        }
        formdata.append('email', email)
        formdata.append('password', password)
        const response = dispatch(login(formdata))
        response.then(() => {
            setLogin(prev => !prev)
        })
    }


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <form className="bg-white p-6 rounded-lg shadow-md w-96 border border-gray-300 relative" onSubmit={handleSubmit}>
                <button
                    title="Close"
                    className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
                    onClick={() => setLogin(prev => !prev)}
                >
                    <IoClose />
                </button>
                <h2 className="text-2xl font-bold text-center mb-4 text-black">
                    {showSignup ? "Sign Up" : "Sign In"}
                </h2>

                {showSignup && (
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-black w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>

                <div className="mb-4 relative">
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-4 text-gray-500"
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? <FaEyeSlash size={20} title="hide" /> : <FaEye size={20} title="show" />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
                >
                    {showSignup ? loading ? "loading..." : "Sign Up" : loading ? "loading....." : "Sign In"}
                </button>

                <p className="text-center text-sm pt-4 text-gray-700">
                    {showSignup ? "Already have an account?" : `New to ${import.meta.env.VITE_APP_NAME || "BookNexus"}?`}
                    <span
                        className="text-orange-600 cursor-pointer font-semibold hover:underline"
                        onClick={() => setShowSignup(!showSignup)}
                    >
                        {showSignup ? "Sign In" : "Create Account"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default memo(Login);
