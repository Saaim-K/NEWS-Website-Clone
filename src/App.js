import './App.css';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const [topic, setTopic] = useState("");



  const getNews = (e) => {
    e.preventDefault();
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: topic, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '8f6669f19bmshba740bef890ea3bp1e4445jsn0aeb066bb324',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(function (response) {
        console.log(response.data.value);
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  return (
    <>



      <form onSubmit={getNews}>
        <input type="search" onChange={(e) => {
          setTopic(e.target.value)

        }} />
        <button type='submit'>Get News</button>
      </form>

      <div>{ }</div>



    </>
  );
}
