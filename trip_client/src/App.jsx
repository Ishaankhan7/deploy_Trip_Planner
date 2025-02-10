import React from 'react'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import EmergencyPage from './pages/EmergencyPage'
import ContactusPage from './pages/ContactusPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TripPlanning from './pages/TripPlanning';
import ExplorePageforPlaces from './pages/ExplorePageforPlaces'
import OtpVerificationPage from './pages/OtpVerificationPage'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import TripFormpage from './pages/TripFormpage'
import BookGuidePage from './pages/BookGuidePage'
import ChatroomwithGuide from './pages/ChatroomwithGuide'
import GuidePortalPage from './pages/GuidePortalPage'

function App() {
  return (
    <div> 
      <Routes>
       <Route path="/"  element={<LandingPage/>}  />
       <Route path="/signup"  element={<SignUpPage/>} />
       <Route path="/home"  element={<HomePage/>} />
       <Route path="/emergency"  element={<EmergencyPage/>} />
       <Route path="/contact"  element={<ContactusPage/>} />
       <Route path="/tripplanning"  element={<TripPlanning/>} />
       <Route path="/explore/:id" element={<ExplorePageforPlaces />} />
       <Route path='/verifyotp' element={<OtpVerificationPage/>} />
       <Route path='/signin' element={<LoginPage/>} />
       <Route path='/profile' element={<ProfilePage/>} />
       <Route path='/bookyourtrip' element={<TripFormpage/>} />
       <Route path='/bookyourguide' element={<BookGuidePage/>} />
       <Route path='/chatwithyourguide' element={<ChatroomwithGuide/>} />
       <Route path='/guideportal' element={<GuidePortalPage/>} />
      </Routes>
    </div>
  )
}

export default App
