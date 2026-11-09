import React from 'react'
import SearchBar from '../components/SearchBar'
import { doctorDetails } from '../data/sampleDoctors'
import { doctorSpecialties } from '../data/specialties'
import Avatar from '../components/Avatar'
import { TiTick } from "react-icons/ti";


function Home() {
  return (
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
       <HeroPicture doctor={doctorDetails[0]}/>
      </div>
    </section>

  )
}

export default Home



const HeroPicture = ({doctor}) => {
  return (
    <div className="hero-art">
      <img src="" alt="" className="hero-art-panel" />
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
            <TiTick/>
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
