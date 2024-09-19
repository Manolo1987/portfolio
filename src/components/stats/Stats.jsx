import React, { useState, useEffect } from 'react'
import styles from './Stats.module.css'

export default function Stats() {
  const [winCounter, setWinCounter] = useState(0);
  const [lossCounter, setLossCounter] = useState(0);
  const [KDRatio, setKDRatio] = useState();


  function handleSubmit() {

  }
  function increaseWinCounter() {
    setWinCounter(winCounter + 1)
  }
  function increaseLossCounter() {
    setLossCounter(lossCounter + 1)
  }


  return (
    <div>
      <h4>Match Stats</h4>
      <div className={styles.stats}>
        <button onClick={increaseWinCounter}>WIN</button>
        <button onClick={increaseLossCounter}>LOSS</button>
        <p>Current K/D:{KDRatio}</p>
        <p>Overall Wins:{winCounter}</p>
        <p>Overall Losses:{lossCounter}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="kills">Kills:</label>
          <input type="text" /><br />
          <label htmlFor="deaths">Deaths:</label>
          <input type="text" />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
