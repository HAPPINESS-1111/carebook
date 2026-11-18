import React from 'react'
import SearchBar from '../components/SearchBar'
import { doctorDetails } from '../data/sampleDoctors'
import { doctorSpecialties } from '../data/specialties'
import Avatar from '../components/Avatar'
import { TiTick } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineSafety } from "react-icons/ai";
import { FEATURES } from "../data/features";
import { FaArrowRight } from "react-icons/fa6";
import heroImage from "../assets/assets/illustrations/hero-heartbeat.svg";



function Home() {
  return (
    <>
      <section className='home-hero full-bleed'>
        <div className='home-inner home-hero-grid'>
          <div className='hero-left'>
            <h1> See the right doctor, without the waiting room.</h1>
            <p className="lead">
              Search approved doctors, pick a time that suits you and pay securely with paystack.
              Your booking is confirmed as soon as the payment clears.
            </p>
            <SearchBar />
            <div className="popular row">
              <span className='small muted'>Popular:</span>
              {doctorSpecialties.map((s) => (
                <button type='button' className="chip" key={s.id}>{s.specialty}</button>
              ))}
            </div>
          </div>
          <HeroPicture doctor={doctorDetails[0]} />
        </div>
      </section>
      <section className='how-it-works'>
        <h2 className="sr-only">How it works</h2>
        <div className="feature-grid">
          {
            FEATURES.map((feature) => (
              <div className='card feature' key={feature.id}>
                <span className='feature-icon'>
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p className="mutted">
                  {feature.description}
                </p>
              </div>
            ))
          }
        </div>
      </section>
      <section className="home-inner section">
        <div className="row between">
          <h2>Top-rated doctors</h2>
          <button className="see-all link-btn">
            See all doctors
            <FaArrowRight />
          </button>
        </div>
        <div className="tile-grid">
          {doctorDetails.map((doctor) => <DoctorTile key={doctor.id} doctor={doctor} />)}
        </div>
      </section>
    </>
  )
}

export default Home



const HeroPicture = ({ doctor }) => {
  return (
    <div className="hero-art">
      <img src={heroImage} alt="" className="hero-art-panel" />
      {doctor && (
        <div className="hero-art-card top">
          <div className="row">
            <Avatar name={doctor.name} color="green" />
            <div>
              <strong>Dr {doctor.name}</strong>
              <div className="small muted">
                {doctor.specialty} {doctor.location}
              </div>
              <div className="hero-art-times">
                <span className="on">open</span>
                <span>Open</span>
                <span className="taken">Booked</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="hero-art-card bottom">
        <div className="row">
          <span className="tick">
            <TiTick />
          </span>
          <div>
            <strong>Appointment confirmed</strong>
            <div className="small muted"> payment verified with paystack</div>
          </div>
        </div>
      </div>
    </div>
  )
}


function DoctorTile({ doctor }) {
  return (
    <div className='card doctor-tile'>
      <div className="row">
        <Avatar name={doctor.name} color={"green"} size={""} />
        <div>
          <strong>Dr. {doctor.name}</strong>
          <div className="small-muted">{doctor.specialty}</div>
        </div>
      </div>
      <div className="row between small">
        <span>
          {
            doctor.rating?.count
              ? <>
                <span className="stars">⭐</span>
                <strong>{doctor.rating.average.toFixed(1)}</strong>
                <span className="muted">({doctor.rating.count})</span>
              </>
              : <span className="muted">New</span>
          }
        </span>
        <strong>₦{doctor.fee}</strong>
      </div>
    </div>
  )
}

