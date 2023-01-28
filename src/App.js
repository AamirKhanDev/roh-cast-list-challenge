import { useEffect, useState } from 'react';
import './App.css';

const URL = `https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban`;
function App() {


  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  let performanceID = 14

  const getData = async () => {
    const response = await fetch(URL);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      setTitle(data.data.attributes.title);
      setShortDescription(data.data.attributes.shortDescription);
      setDate(data.included[performanceID].attributes.date);
    }
    else {
      console.log('ERROR');
      console.log(response);
    }
  }


  //get data on page load
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className='details'>
        <h1 className='heading'>{title}</h1>
        <p>Date: {date}</p>
        <p>{shortDescription}</p>
      </div>
    </div>
  );
}

export default App;