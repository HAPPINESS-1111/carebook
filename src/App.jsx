import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import HomePage from './pages/Home'
import DoctorProfile from './pages/DoctorProfile'
import ForgotPassword from './pages/ForgotPassword'
import PatientDashboard from './pages/dashboards/PatientDashboard'
import DoctorDashboard from './pages/dashboards/DoctorDashboard'
import AdminDashboard from './pages/dashboards/AdminDasboard'

function App() {
  return (
    <>
    <Header />
    <main className="container">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
    <Footer/>
    </>
 )
}

export default App
