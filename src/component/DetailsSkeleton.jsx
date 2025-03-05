import React from "react";

const DetailsSkeleton = () => {
    return (
        <div className="max-w-[70%] m-auto rounded-lg overflow-hidden shadow-lg border border-gray-300 bg-white animate-pulse">
            <div className="w-full h-96 bg-gray-300"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>

                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-4/6"></div>
            </div>

            <div className="px-4 pb-4">
                <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
        </div>
    );
};

export default DetailsSkeleton;
