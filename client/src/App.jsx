import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { ShipWheelIcon } from "lucide-react";
import './App.css'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnBoardingPage from './pages/OnBoardingPage'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'

function App() {
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/me')
      // console.log(res);

      return res.data;
    },
    // retry: false,
  })

  const authUser = authData?.user
  console.log(authUser);


  return (
    <div className='h-screen' data-theme="forest">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <SignUpPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser ? <OnBoardingPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
