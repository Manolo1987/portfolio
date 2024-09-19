import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import ReactPlayer from 'react-player'

export default function navbar() {
  return (
    <div className={styles.navbar}>
      <nav>
        <h1>PlayDaily<span>.</span></h1>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/stats">Stats</NavLink>
          </li>
          <li>
            <NavLink to="/groups">Groups</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
