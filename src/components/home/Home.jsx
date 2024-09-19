import React, {useState, useEffect} from 'react'
import Hero from './assets/hero-cs2.png'
import styles from './Home.module.css'
import { apiKey } from '../../assets/api';


export default function Home() {
  const [data, setData] = useState([]);
  const [topArticle, setTopArticle] =  useState([]);

  useEffect(()=> {
    
    const fetchData = async ()=> {
      try {
        const response = await fetch(`https://gnews.io/api/v4/search?q=cs2&apikey=${apiKey}`);
        const data = await response.json();
        setData(data);
        // console.log(data);        
        // console.log(data.articles[0]);  
        setTopArticle(data.articles[0]);
        
      } catch (error) {
          console.error('Unable to fetch data from API');          
      }
    };
    fetchData();
  },[])


  return (
    <div className={styles.home}>
      <h2>Top News</h2>
        <div className={styles.hero}>
          <a href={topArticle.url} target="_blank" rel="noopener noreferrer">
              <h4>{topArticle.title}</h4>
              <img src={topArticle.image} alt="top article image" />
          </a>
        </div>
      
    </div>
  )
}
