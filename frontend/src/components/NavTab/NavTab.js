import React from "react"
import "./NavTab.css"
import { Link } from "react-scroll"

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link to="about" className="nav-tab__link" smooth={true} duration={500}>
        О проекте
      </Link>
      <Link to="techs" className="nav-tab__link" smooth={true} duration={500}>
        Технологии
      </Link>
      <Link
        className="nav-tab__link"
        to="about-me"
        smooth={true}
        duration={500}
      >
        Студент
      </Link>
    </nav>
  )
}

export default NavTab
