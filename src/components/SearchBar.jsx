import React from 'react'
import { GoSearch } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";


function SearchBar() {
  return (
    <form className="home-search">
      <lable className="home-search-field">
        <span className='sr-only'>Doctor's name</span>
        <GoSearch />
        <input type="text" placeholder="Doctor's name" />
      </lable>
      <lable className="home-search-field">
        < CiLocationOn />
        <span>Location</span>
        <select name="" id="">
        <option value="">Any location</option>
        <option value="">Port Harcourt</option>
        <option value="">Lagos</option>
        <option value="">Abuja</option>
        </select>
      </lable>
      <button className="btn btn-lg">Seacrh</button>
    </form>
  )
}

export default SearchBar

