import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import { Toaster } from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { fetchUserProfile } from './store/slices/userSlice'
import BookDetails from './pages/BookDetails'
import Header from './component/Header'
import AdminDashboard from './Admin/AdminDashboard'
import Profile from './pages/profile'
import AuthWrapper from './component/AuthWrapper'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  return (
    <Router>
      <Toaster position="bottom-right" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-details/:bookId" element={<BookDetails />} />

        {/* profile route protected */}
        <Route
          path="/profile/:userId"
          element={
            <AuthWrapper>
              <Profile />
            </AuthWrapper>
          }
        />

        {/* Admin Route protected */}
        <Route
          path="/dashboard"
          element={
            <AuthWrapper role="Admin">
              <AdminDashboard />
            </AuthWrapper>
          }
        />
      </Routes>
    </Router>

  )
}

export default App
