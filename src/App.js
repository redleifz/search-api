

import './App.css';
import {useState,useEffect} from "react"

function App() {

  const [countries,setCountries] = useState([])
  const [word,setWord] = useState("")
  const [dataFilter] = useState(["name","capital"]) 

  useEffect(()=>{
    fetch("https://restcountries.com/v2/all")
    .then(res=>(res.json()))
    .then(data=>{
      setCountries(data);
    })
  },[])

  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const searchCountries=(countries)=>{
    return countries.filter((item)=>{
      // eslint-disable-next-line 
        return dataFilter.some((filter)=>{
          if(item[filter]){
          return item[filter].toString().toLowerCase().indexOf(word.toLowerCase())>-1
          }
        })
    })
}

  return (
    <div className="container">
      <div className='search-container'>
        <label htmlFor='search-from'>
            <input type="text" className='search-input' placeholder='search anything here (capital,county)' 
              value = {word}
              onChange={(e)=>setWord(e.target.value)}
              />
        </label> 
      </div>
      <ul className="row">
      {searchCountries(countries).map((item,index)=>{
          return (
            <li key={index}> 
              <div className="card">
                
                <div className="card-title">
                  <img src={item.flag} alt={item.name}/>               
                </div>
                <div className='card-body'>
                  <div className='card-description'>
                    <h2>{item.name}</h2>
                    <ol className='card-list'>
                        <li>Population : <span>{formatNumber(item.population)} ppl</span></li>
                        <li>Region : <span>{item.region}</span></li>
                        <li>Capital : <span>{item.capital}</span></li>
                    </ol>
                  </div>
                </div>
              </div>
            </li>  
         
          )      
      })}
      </ul>
    </div>
  );
}

export default App;
