
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookById, fetchBookById } from "../store/slices/bookSlice";
import DetailsSkeleton from "../component/DetailsSkeleton";
import { getBookReviewById, sendReview } from "../store/slices/reviewSlice";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import Login from "../component/Login";

const BookDetails = () => {
    const { bookId } = useParams();
    const [login, setLogin] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { book, loading: bookLoading } = useSelector((state) => state.Book);
    const { averageRating, totalReviews, loading: reviewLoading, reviews } = useSelector((state) => state.Review);
    const { user, isAuthenticated } = useSelector((state) => state.User);

    useEffect(() => {
        if (bookId) {
            dispatch(fetchBookById(bookId));
            dispatch(getBookReviewById(bookId));
        }
    }, [dispatch, bookId]);

    if (bookLoading || reviewLoading) {
        return <DetailsSkeleton />;
    }

    const handleDeleteBook = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");

        if (!confirmDelete) return toast("Book is safe....");

        await dispatch(deleteBookById(bookId));
        navigate("/");
    }


    const handleReviewSubmit = (e) => {
        e.preventDefault()
        if (!rating || !reviewText.trim()) return toast.error("Empty review not allowed");

        const formData = new FormData()
        formData.append('rate', rating)
        formData.append('desc', reviewText)
        dispatch(sendReview(formData, bookId))
        setReviewText("");
        setRating(0);
    };

    return (
        <div className="max-w-6xl m-auto">
            <h1 className=" mt-10 md:my-10 text-center text-xl md:text-2xl font-semibold text-orange-500 cursor-pointer underline">Book Description </h1>
            <hr />
            <div className="relative my-5 mx-auto p-4 md:p-6 lg:p-8  border border-stone-300 rounded-lg flex flex-col md:flex-row gap-6 mb-10">
                <div className="w-full md:w-1/3 flex flex-col justify-center gap-5">
                    <img
                        src={book?.bookImg?.url || "https://via.placeholder.com/200"}
                        alt={book?.name || "Book Cover"}
                        className="w-96 h-64 object-contain rounded-lg shadow-md"
                    />
                    <div onClick={handleDeleteBook} className="absolute top-0 right-0 text-2xl cursor-pointer p-2 rounded-full hover:bg-red-600 hover:text-white border border-orange-500 m-2">
                        <MdDeleteOutline />
                    </div>
                    <p className="text-xl font-bold text-green-500">Rating: {averageRating} / 5</p>
                    <h2 className="text-2xl md:text-3xl cursor-pointer text-orange-600 font-bold">{book?.name || "Book Title"}</h2>
                    <div>
                        <p className="font-semibold text-orange-600">Desc:</p>
                        <p className="text-gray-700 text-sm md:text-base mt-2">
                            {book?.desc || "This book offers an insightful journey into an amazing world."}
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    {user?.role !== "Admin" && <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Leave a Review</h3>
                        <div className="flex items-center space-x-2 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`cursor-pointer text-xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                        <textarea
                            placeholder="Write your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            rows="3"
                        ></textarea>
                        {isAuthenticated ? <button
                            onClick={handleReviewSubmit}
                            className="mt-2 w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                            Submit Review
                        </button> :
                            <button
                                onClick={() => setLogin(true)}
                                className="mt-2 w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                            >
                                Submit Review
                            </button>}
                    </div>}

                    <div className="mt-6 max-h-48 bg-slate-50 p-2 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Customer Reviews: {totalReviews}</h3>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="border-t py-3">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-gray-900">{review?.user?.name || "Anonymous"}</strong>
                                        <div className="flex">
                                            {[...Array(Math.round(review.rate))].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-500" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700">{review?.desc || "No review text provided."}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
            {login && !isAuthenticated && <Login setLogin={setLogin} />}
        </div>
    );
};

export default BookDetails;
