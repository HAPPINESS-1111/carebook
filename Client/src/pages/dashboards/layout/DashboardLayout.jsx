import React from 'react'
import { Link, NavLink } from "react-router-dom"
import logo from "../../../assets/assets/logo/logo.svg"
import { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUndo } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import logoOnDark from "../../../assets/assets/logo/logo-on-dark.svg"
import { MdLogout } from "react-icons/md";



const ASIDEMENUS = {
    patient: {
        heading: "my health",
        items: [
            { to: "/patient", lable: "overview", icon: CiHome },
            { to: "/doctors", lable: "find a doctor", icon: FaSearch },
            { to: "/patient/appointments", lable: "my appiontments", icon: CiCalendar },
            { to: "/patient/notes", lable: "visit notes", icon: IoDocumentTextSharp },
            { to: "/patient/payments", lable: "payments", icon: MdOutlinePayment },
        ]
    },
    doctor: {
        heading: "Doctor workspace",
        items: [
            { to: "/doctors", lable: "overview", icon: CiHome },
            { to: "/doctor/schedule", lable: "schedule", icon: CiCalendar },
            { to: "/doctor/profile", lable: "profile & availability", icon: FaRegClock },
            { to: "/doctor/notes", lable: "visit notes", icon: IoDocumentTextSharp },
            { to: "/doctor/earnings", lable: "earnings", icon: GiMoneyStack },
        ]
    },
    admin: {
        heading: "Admin",
        items: [
            { to: "/admin", lable: "overview", icon: CiHome },
            { to: "/admin/doctors", lable: "Doctor approvals", icon: FaStethoscope, notificationBadge: "pendingDoctors" },
            { to: "/admin/users", lable: "Users", icon: FiUsers },
            { to: "/admin/appointments", lable: "Appointments", icon: CiCalendar },
            { to: "/admin/payments", lable: "payments & refunds", icon: FaUndo, notificationBadge: "refundsNeeded" },
            { to: "/admin/revenue", lable: "Revenue", icon: FaChartLine },
        ]
    }
}

const ROLE_LABEL = {
    patient: "patient",
    doctor: "Doctor",
    admin: "Administrator"
}

function DashboardLayout({role}) {
    const [open, setOpen] = useState(false);
    const menu = ASIDEMENUS[role]

    return (
        <div className="dash">
            <header className="dash-topbar">
                <Link to={"/"} className="dash-logo">
                    <img src={logo} alt="Carebook logo" />
                </Link>
                <button className="dash-menu-btn">
                    {open ? <IoClose /> : <IoIosMenu />}
                </button>
            </header>
            <aside id='dash-sidebar' className={`dash-side ${open ? 'open' : ''}`}>
                <Link to={"/"} className='dash-logo'>
                    <img src={logoOnDark} alt="Carebook logo" />
                </Link>
                <p className="dash-side-heading">{menu.heading}</p>
                <nav className="dash-nav">
                    {
                        menu.items.map((item) => {
                            const MenuIcon = item.icon;
                            return (
                                <NavLink to={item.to} key={item.to}>
                                    {MenuIcon && <MenuIcon size={18} />}
                                    <span>{item.lable}</span>
                                </NavLink>
                            )
                        })
                    }
                </nav>
                <button className="dash-logout">
                    <MdLogout />
                    <span className="sr-only">Log out</span>
                </button>
            </aside>
            <main className="dash-main">

            </main>
        </div>
    )
}

export default DashboardLayout