import React from "react";
import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ book, rating = 5 }) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-300 bg-white">
            <img
                src={book?.bookImg?.url}
                alt={book?.name || "Book Cover"}
                className="w-full h-52 object-contain"
            />

            <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 truncate w-2/3">
                        {book?.name || "Book Title"}
                    </h2>
                    <div className="flex">
                        {Array.from({ length: rating }).map((_, i) => (
                            <CiStar key={i} className="fill-orange-500 text-orange-500" />
                        ))}
                    </div>
                </div>

                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {book?.desc.split("").splice(0, 30).join("") + "...." || "N/A"}
                </p>
            </div>

            <Link to={`/book-details/${book?._id}`}>
                <div className="px-4 pb-4">
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                        View Details
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default Card;
