import React from 'react'
import NewsCard from './NewsCard'
import Footer from './Footer'
import { useState, useEffect } from 'react'


export const NewsList = () => {

  const [search, setSearch] = useState("India");
  const [newsData,setNewsData] = useState(null)


  const getData = async () =>{

    const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
    const jsonData = await response.json();
    console.log(jsonData.articles);
    let dt = jsonData.articles.slice(0,10)
    setNewsData(dt);

  }
    useEffect(()=>{
      getData()
    },[])




    const handleInput = (e) => {
      console.log(e.target.value);
      setSearch(e.target.value)
      
    }
  
    const userInput = (event) =>{
      setSearch(event.target.value)
    }

  return (
    <div>
      <nav>
        <div>
          <h1>NewsNow</h1>
        </div>
        <ul style ={{display: "flex", gap:"11px"}}>
          <a style={{fontWeight:600, fontSize:"17px"}}>All news</a>
          <a style={{fontWeight:600, fontSize:"17px"}}>Trending</a>
        </ul>
        <div className = 'searchBar'>
          <input type = 'text' placeholder = 'Search News' value={search} onChange={handleInput}/>
          <button onClick = {getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className='head'>Stay Updated with NewsNow!</p>
      </div>

      <div className = 'categoryBtn'>
        <button onClick={userInput} value="sports">Sports</button>
        <button onClick={userInput} value="politics">Politics</button>
        <button onClick={userInput} value="entertainment">Entertainment</button>
        <button onClick={userInput} value="health">Health</button>
        <button onClick={userInput} value="technology">Technology</button>
        <button onClick={userInput} value="fitness">Fitness</button>
      </div>

      <div>
       
       {newsData? <NewsCard data={newsData}/> : null}
      </div>
      <Footer/>
    </div>
  )


}

export default NewsList