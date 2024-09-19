import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div>
      <h3>404 - Page Not Found 😒</h3>
      <NavLink to="/">Just go back Home </NavLink>
    </div>
  )
}
