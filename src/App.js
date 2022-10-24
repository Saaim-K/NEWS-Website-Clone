import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import moment from 'moment/moment';

export default function App() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function trending() {
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: { safeSearch: 'Off', textFormat: 'Raw' },
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '8f6669f19bmshba740bef890ea3bp1e4445jsn0aeb066bb324',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      axios.request(options).then(function (response) {
        setData(response.data.value);
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }
    trending()
  }, [])
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
    setLoading(true)
    axios.request(options)
      .then(function (response) {
        console.log(response.data.value);
        setLoading(false)
        setData(response.data.value);
        console.log(topic);
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error);
      });
  }
  return (
    <>
      <nav>
        <div className="hub">
          <span>NEWS</span>
          <span>hub</span>
        </div>
        <form className='form' onSubmit={getNews}>
          <BsSearch />
          <input type="search" onChange={(e) => { setTopic(e.target.value) }} />
        </form>
      </nav>
      {(loading) ? <div className='loader'><div className='pac-man' /></div> : ""}
      <div>{data.map(news => (
        <div key={news?.name}>
          <div className="projcard-container">
            <div className="projcard projcard-blue">
              <div className="projcard-innerbox">
                <img className="projcard-img" src={news?.image?.thumbnail?.contentUrl.replace("&pid=News", "").replace("pid=News&", "").replace("pid=News", "")} alt='saaim' />
                <div className="projcard-textbox">
                  <div className="projcard-title">{news?.name}</div>
                  <div className="projcard-subtitle">{moment(news?.datePublished).format('Do MMMM YYYY, h:mm a')}</div>
                  <div className="projcard-bar"></div>
                  <div className="projcard-description">{news?.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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