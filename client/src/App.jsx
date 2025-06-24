import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnBoardingPage from './pages/OnBoardingPage'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

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
