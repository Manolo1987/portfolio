import React, { useState, useEffect } from 'react';
import styles from './Stats.module.css';
import Ancient from './assets/ancient.jpg'
import Anubis from './assets/anubis.png'
import Dust2 from './assets/dust2.jpg'
import Inferno from './assets/inferno.png'
import Mirage from './assets/mirage.png'
import Nuke from './assets/nuke.png'
import Vertigo from './assets/vertigo.png'

export default function Stats() {
  const [stats, setStats] = useState({
    kills: '',
    assists: '',
    deaths: '',
    isToggled: true,
    date: '',
    map: '',
  });

  const [overallStats, setOverallStats] = useState({
    wins: 0,
    losses: 0,
    overallKills: 0,
    overallDeaths: 0,
  });

  const [data, setData] = useState([]);

  const pictures = [Ancient, Anubis, Dust2, Inferno, Mirage, Nuke, Vertigo]

  // vorherige Daten --> hier overallstats werden geladen, wenn sie vorhanden sind
  // sind sie vorhanden werden im usestate initialisiert
  // parse ist nötig data localstorage daten immer als string gespeichert werden
  useEffect(() => {
    const storedOverallStats = JSON.parse(localStorage.getItem('overallStats'));
    if (storedOverallStats) {
      setOverallStats(storedOverallStats);
    }
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('statsArray'));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  function calculateCurrentKd(storedData) {
    if (storedData.deaths === 0) {
      return 'not available, enter stats';
    }
    return (storedData.kills / storedData.deaths).toFixed(2);
  }

  const calculateAverageKd = () => {
    if (overallStats.overallDeaths === 0) {
      return 'n.a. enter stats';
    }
    return (overallStats.overallKills / overallStats.overallDeaths).toFixed(2);
  };

  const now = new Date();
  const currentDateTime = now.toLocaleString().replace(",", "");

  // funktion um die inputs aus dem form zu verarbeiten --> nimmt name, value und e.target entgegen und updatet
  //  Stats, dabei werden die alten stats durch ...prevStats übernommen und diesem Fall ein neues Objekt angelegt mit den neu empfangen stats
  // besonderheit ist, dass immer durch date {currentDateTime} hinzugefügt wird
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setStats((prevStats) => ({
      ...prevStats,
      [name]: value,
      date: `${currentDateTime}`
    }));
  };


  // wird aufgerufen beim Absenden des Formulars
  // verarbeitet die eingegebenen daten, aktualisiert die stats, speichert die daten im local storage und setzt das formular zurück
  const handleSubmit = (e) => {
    e.preventDefault();

    // Hier werden die kills- und deaths-Werte aus dem aktuellen stats-Zustand extrahiert
    const { kills, deaths } = stats;

    // hier werden die overallstats geupdatet
    // erstellen eines neuen Objekts updatedOverallStats
    const updatedOverallStats = {
      // eine kopie von overallstats wird erstellt
      ...overallStats,
      // overallkills wird um kills erhöht --> parseInt nimmt nur volle zahlen entgegen, die 10 gibt das Zahlensystem oder Radix oder basis an, hier also von 0-9
      overallKills: overallStats.overallKills + parseInt(kills, 10),
      overallDeaths: overallStats.overallDeaths + parseInt(deaths, 10),
      wins: overallStats.wins + (stats.isToggled ? 1 : 0),
      losses: overallStats.losses + (!stats.isToggled ? 1 : 0),
    };

    // 'overallStats' --> ist der key im localstorage unter dem es gespeichert wird, vergleichbar mit einem Ordnernamen --> nach dem Komma folgt was ghespeichert werden soll, hier wieder das stringified object updatedOverallStats
    localStorage.setItem('overallStats', JSON.stringify(updatedOverallStats));

    // der state der der komponente wird mit den aktuellisierten stats überschrieben
    setOverallStats(updatedOverallStats);

    // die aktuellen stats werden data hinzugefügt
    const updatedData = [...data, stats];
    // und der state geupdatet
    setData(updatedData);
    // dann wird noch data im localstorage gespeichert
    localStorage.setItem('statsArray', JSON.stringify(updatedData));


    // Reset der von Stats und des Formular
    setStats({
      kills: '',
      assists: '',
      deaths: '',
      isToggled: true,
      date: '',
      map: '',
    });
  };

  // Funktion zum umschalten von Toggle
  // aktualisiert den state, genauer nur isToggled
  // zustand wird invertiertert/negiert, wenn er true war auf false und anders herum
  const handleToggle = () => {
    setStats((prevStats) => ({
      ...prevStats,
      isToggled: !prevStats.isToggled,
    }));
  };

  return (
    <div>
      <h2>Match Stats</h2>
      <div className={styles.containerAll}>
        <div className={styles.stats}>
          <div className={styles.displayedStats}>
            <p>Current K/D: <span>{data.length > 0 && data[data.length - 1].kills && data[data.length - 1].deaths ? calculateCurrentKd(data[data.length - 1]) : 'n.a. enter stats'}</span></p>
            <p>Average K/D: <span>{calculateAverageKd()}</span></p>
            <p>Overall Wins: <span>{overallStats.wins}</span></p>
            <p>Overall Losses: <span>{overallStats.losses}</span></p>
          </div>

          {/* Formular ab hier 📝 */}
          <h4>Track your current match</h4>
          <form onSubmit={handleSubmit}>
            <div className={styles.toggleSwitch} onClick={handleToggle}>
              <div className={`${styles.switch} ${stats.isToggled ? styles.on : styles.off}`}>
                <div className={styles.toggleHandle}></div>
              </div>
              <span>{stats.isToggled ? 'WIN' : 'LOSS'}</span>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputs}>
                <label htmlFor="kills">Kills:</label>
                <input
                  type="text"
                  name="kills"
                  value={stats.kills}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className={styles.inputs}>
                <label htmlFor="assists">Assists:</label>
                <input
                  type="text"
                  name="assists"
                  value={stats.assists}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className={styles.inputs}>
                <label htmlFor="deaths">Deaths:</label>
                <input
                  type="text"
                  name="deaths"
                  value={stats.deaths}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className={styles.inputs}>
                <label htmlFor="maps">Maps:</label>
                <select
                  id="map"
                  name="map"
                  value={stats.map}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a map</option>
                  <option value="0">Ancient</option>
                  <option value="1">Anubis</option>
                  <option value="2">Dust2</option>
                  <option value="3">Inferno</option>
                  <option value="4">Mirage</option>
                  <option value="5">Nuke</option>
                  <option value="6">Vertigo</option>

                </select>
              </div>
              <br />
              <div className={styles.inputs} style={{ visibility: 'hidden' }}>
                <label htmlFor="maps">Maps:</label>
                <select
                  id="date"
                  name="date"
                  value={stats.date}
                  onChange={handleChange}

                >
                  <option value="">{currentDateTime}</option>
                </select>
              </div>
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>

        {/* Hier beginnt die Präsentation der einzelnen Matches 🔫 */}
        <div className={styles.matchPresenter}>
          {data.length > 0 && data.map((item, index) => (

            // Container für die komplette MatchKarte
            <div
              key={index}
              className={styles.matchContainer}
              style={{ borderColor: item.isToggled ? '#01b26ebb' : '#d80d0d' }}
            >
              <div className={styles.presentedStats}>
                <ul>
                  <li>Kills:<span>{item.kills}</span></li>
                  <li>Deaths: <span>{item.deaths}</span></li>
                  <li>Assists:<span>{item.assists}</span></li>
                  <li>K/D: <span
                    style={{ color: (item.kills / item.deaths).toFixed(2) > 1 ? '#01b26ebb' : '#d80d0d' }}
                  >{(item.kills / item.deaths).toFixed(2)}</span></li>
                  <li>Outcome:  <span
                    style={{ color: item.isToggled ? '#01b26ebb' : '#d80d0d' }}
                  >{item.isToggled ? 'Win' : 'Loss'}</span></li>
                  <li><span style={{ textAlign: 'center' }}>{item.date}</span></li>
                </ul>
              </div>
              <div
                className={styles.presentedPic}
                style={{
                  backgroundImage: `url(${pictures[item.map]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px'
                }}
              >
              </div>
            </div>
          ))}
          <h4 style={{ margin: '0 0 4% 0' }}>Match History</h4>
        </div>
      </div>
    </div>
  );
}