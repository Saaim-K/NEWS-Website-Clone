import './App.css';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState([])



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
        setData(response.data.value);
        // console.log(data);
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
        {/* {console.log(topic)}; */}
        <button type='submit'>Search</button>
      </form>

      <div>{data.map(news => (
        
      )
      )
      }
      </div>



    </>
  );
}

//First of all there is a form consisting of one input tag and one button.
//The input tag has an onchange event that triggers as soon as something is typed in it
//The onchange function gets the value from the input tag using e.target.value and set it in setTopic
//The set topic has an initial value of topic that is empty string
//After the onchange event is triggered the setTopic hook changes the topic value to the query typed in input
//Both topic and settopic are in useState hook
//As the button in the input tag clicked the form runs a getNews function.
//The getNews has a parameter e and e.preventDefault() to stop the reloading of page onSubmit of form
//Then data is fetched using API
//The data that we got is of the topic that we typed in the search
//In the response of the api call we setData to response.data.value in data
//Now are data from api is saved in an array named data
//
//
//
//
//
//
//