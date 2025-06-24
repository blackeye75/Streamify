import { useState } from 'react'
import { Routes, Route } from 'react-router'
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
import {axiosInstance} from './lib/axios'

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/me')
      return response.data
    }
  })
  console.log(data);
  

  return (
    <div className='h-screen' data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<SignUpPage />} />
        <Route path="/onboarding" element={<SignUpPage />} />
      </Routes>
      <Toaster />
      <button onClick={() => toast.success('Successfully hello world toasted!')} >Check</button>
    </div>
  )
}

export default App
