import { useEffect, useState } from 'react';
import './App.css';

const URL = `https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban`;
function App() {


  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [creatives, setCreatives] = useState([]);

  let performanceID = 14

  const getData = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      setTitle(data.data.attributes.title);
      setShortDescription(data.data.attributes.shortDescription);
      setDate(formatDate(data.included[performanceID].attributes.date));
      getCreatives(data.included)
    }
    else {
      console.log('ERROR');
      console.log(response);
    }
  }


  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  function getCreatives(arr) {
    let creatives = arr.filter(function (obj) {
      return obj.type === 'creatives'
    })
    setCreatives(creatives);
  }
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className='details'>
        <h1 className='heading'>{title}</h1>
        <p>Date: {date}</p>
        <p>{shortDescription}</p>
        <ul>
          <h2>Creatives</h2>
              {
                creatives.map((creative) => (
                  <li key={creative.attributes.id}>{creative.attributes.name} ({creative.attributes.role})</li>
                ))
              }
            </ul>
      </div>
    </div>
  );
}

export default App;