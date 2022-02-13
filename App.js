import React, { useState, useEffect } from "react";
import './App.css';
//// HIQyBYFBvhiecgPKk0UDt0eEQhvLs7NUGmietoUc7p8 ////

function App() {
  const getMode = () => {
    const initialMode = localStorage.getItem("mode")
    if (initialMode == null) {
      if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
        return true
      } else {
        return false
      }
    } else {
      return JSON.parse(localStorage.getItem("mode"))
    }

  }
  const [value, setValue] = useState("")
  const [results, setResults] = useState([])
  const [dark, setMode] = useState(getMode)

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark))
  }, [dark])


  const fetchImages = () => {
    fetch(`https://api.unsplash.com/search/photos?client_id=HIQyBYFBvhiecgPKk0UDt0eEQhvLs7NUGmietoUc7p8&query=${value}&orientation=squarish`)
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        setResults(data.results)
      })
  }





  return (
    <div className={dark ? "App dark-mode" : "App"}>
      <div className="mydiv" >
        {/* <span>SEARCH</span> */}
        <input
          style={{ width: "60%" }}
          type="text" placeholder="Anything Search..."
          value={value} onChange={(e) => { setValue(e.target.value) }} />
        <button style={{ width: "15%", padding: "5px" }} onClick={() => { fetchImages() }}>SEND</button>
        {/* dark mode */}
        <label className="switch">
          <input type="checkbox"
            checked={dark}
            onChange={() => setMode(!dark)} />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="content">
        <p>{dark ? "Dark Mode" : "Light Mode"}</p>
      </div>

      <div className="gallery ">
        {results.map((item) => {
          return <img key={item.id} src={item.urls.regular} />
        })}
      </div>
    </div>
  );
}

export default App;
