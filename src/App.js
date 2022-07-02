import './App.css';
import {useState,useEffect} from "react"

function App() {

  const [contries,setCountries] = useState([])

  useEffect(()=>{
    fetch("https://restcountries.com/v2/all")
    .then(res=>(res.json()))
    .then(data=>{
      setCountries(data);
    })
  },[])

  return (
    <div className="container">
      <ul className="row">
        {contries.map((item,index)=>{
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
                        <li>Population : <span>{item.population} ppl</span></li>
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
