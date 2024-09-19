import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import styles from './Layout.module.css'

export default function Layout() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
        <Navbar />
      <main>
        <Outlet />
      </main>
        <div className={styles.footer}>
          Copyright © {currentYear} by PlayDaily
        </div>
  </div>
  )
}
