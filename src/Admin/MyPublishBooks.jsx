import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myPublishBooks } from '../store/slices/uploadBookSlice'
import Card from '../component/Card'

const MyPublishBooks = () => {
    const { myBooks, loading } = useSelector((state) => state.UploadBook)

    if (loading) {
        return (
            <div className='max-w-6xl mx-auto py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {Array.from({ length: 8 }).map(() => <Skeleton />)}
            </div>
        )
    }

    return (
        <div className='max-w-6xl mx-auto py-6 px-4'>
            <h2 className="text-2xl font-bold text-gray-900 mb-6"></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {myBooks.map((book) => (
                    <Card key={book._id} book={book} />
                ))}
            </div>
        </div>
    )
}

export default MyPublishBooks
