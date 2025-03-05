import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../component/Card'
import Skeleton from '../component/Skeleton'

const Books = () => {

    const { books, loading } = useSelector(state => state.Book)

    if (loading) {
        return (
            <div className='max-w-6xl mx-auto py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {Array.from({ length: 8 }).map(() => <Skeleton />)}
            </div>
        )
    }

    return (
        <div className='max-w-6xl mx-auto py-6 px-4'>
            <h1 className="  md:my-10 text-center text-xl md:text-2xl font-semibold text-orange-500 cursor-pointer underline">Explore Books </h1>
            <hr />
            <h2 className="text-2xl font-bold text-gray-900 mb-6"></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <Card key={book._id} book={book} />
                ))}
            </div>
        </div>
    )
}

export default Books
