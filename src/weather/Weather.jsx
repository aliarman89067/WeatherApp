import React, { useState, useEffect } from 'react'
import './weather.css'
import {clear, clouds, dust, fog, haze, mist, smoke, snow, sunny, rain} from './index';
const Weather = () => {

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          searchWeather();
        }
      }
    const [cityName, setCityName] = useState("new york")
    const [weatherinfo, setweatherinfo] = useState("");
    const [Icons, setIcons] = useState("");
    const [image, setimage] = useState({});
    const searchWeather = async ()  =>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=8beb535f87a34294e0708e8d0ea9a106`;
        const res = await fetch(url);
        const data = await res.json();
        try {
            const {main:weather} = data.weather[0];
            const {country} = data.sys;
            const {name} = data
            const {temp} = data.main;
            const {sunrise} = data.sys;
            const {sunset} = data.sys;
            const {humidity} = data.main;
            const {pressure} = data.main;
           const weatherValues = {
            weather,
            country,
            name,
            temp,
            sunrise,
            sunset,
            humidity,
            pressure,
           }
           setweatherinfo(weatherValues);

           if(weather){
            switch (weather) {
                case "Clouds":
                    setIcons("wi-cloudy")
                    setimage(clouds)
                    break;
                case "Smoke":
                    setIcons("wi-smoke")
                    setimage(smoke)
                    break;
                case "Rain":
                    setIcons("wi-rain")
                    setimage(rain)
                    break;
                case "Haze":
                    setIcons("wi-cloudy-windy")
                    setimage(haze)
                    break;
                case "Dust":
                    setIcons("wi-dust")
                    setimage(dust)
                    break;
                case "Snow":
                    setIcons("wi-snow")
                    setimage(snow)
                    break;
                case "Sunny":
                    setIcons("wi-day-sunny")
                    setimage(sunny)
                    break;
                case "Sun":
                    setIcons("wi-day-sunny")
                    setimage(sunny)
                    break;
                case "Clear":
                    setIcons("wi-night-clear")
                    setimage(clear)
                    break;
                case "Fog":
                    setIcons("wi-fog")
                    setimage(fog);
                    break;
                case "Mist":
                    setIcons("wi-cloudy-gusts")
                    setimage(mist)
                    break;
            
                default:
                    setIcons("wi-cloudy")
                    setimage(clouds);
                    break;
            }
           }
         
        } catch (error) {
            console.log(error);
        }
    }
    const updatemiliValues = () =>{
        let sec = weatherinfo.sunrise;
        let newct = new Date(sec * 1000);
        let newHours = newct.getHours();
        let newMinutes = newct.getMinutes();
        if(newHours > 12){
            newHours  = newHours - 12;
        }
        if(newHours < 10){
            newHours = "0" + newHours;
        }
        if(newMinutes < 10){
            newMinutes = "0" + newMinutes;
        }
        let newTime = `${newHours}:${newMinutes}`
        return newTime;
    }
    const updatemiliValues2 = () =>{
        let sec = weatherinfo.sunset;
        let newct = new Date(sec * 1000);
        let newHours = newct.getHours();
        let newMinutes = newct.getMinutes();
        if(newHours > 12){
            newHours  = newHours - 12;
        }
        if(newHours < 10){
            newHours = "0" + newHours;
        }
        if(newMinutes < 10){
            newMinutes = "0" + newMinutes;
        }
        let newTime = `${newHours}:${newMinutes}`
        return newTime;
    }
    useEffect(() => {
      searchWeather()
    }, [])
  
    let Timer = new Date().toLocaleTimeString();
    const [Timing,setTiming] = useState(Timer)
    function updateTiming(){
    let Timer = new Date().toLocaleTimeString();
    setTiming(Timer);
    }
    setInterval(updateTiming,1000)
    
    return (
    <div className='app__main'>
        <div className='app__search-container'>
            <input type="text" placeholder='Enter City Name...'
            value={cityName}
            onChange={(event)=> setCityName(event.target.value)}
            onKeyDown={handleKeyPress}
            />
            <button type='button' onClick={searchWeather}>Search</button>
        </div>
        <img src={image} alt="winter" className='app__main-img'/>
        <div className='app__weather-container'>
           <div className='app__weather-container_two'>
           <div className='app__weather-info'>
           <div className='app__weather-type'>
               <i className={`wi ${Icons}`}></i>
               <h1>{weatherinfo.weather}</h1>
               <div className='app__weather-type_place'>
                   <p>{weatherinfo.country},</p>
                   <p>{weatherinfo.name}</p>
               </div>
           </div>
           <div  className='app__line'/>
           <div className='app__weather-temp'>
               <h1>{weatherinfo.temp}&deg;</h1>
           </div>
           </div>
           <div className='app__weather-time_container'>
               <h3 className='app__yourtime'>Your Time</h3>
               <div className='app__weather-time_time'>
                   <h3 className='app__time-pm'>{Timing}</h3>
                   <p>{new Date().toLocaleDateString()}</p>
               </div>
           </div>
           </div>
           <div className='app__weather-other_info'>
                <div className='app__weather-icon'>
                    <div className='app__weather-icon_box'>
                        <i className={'wi wi-day-cloudy'}></i>
                    </div>
                    <div className='app__weather-icon-info'>
                        <p>SunSet</p>
                        <p>{updatemiliValues2()}</p>
                    </div>
                </div>
                <div className='app__weather-icon'>
                    <div className='app__weather-icon_box'>
                        <i className={'wi wi-day-sunny'}></i>
                    </div>
                    <div className='app__weather-icon-info'>
                        <p>SunRise</p>
                        <p>{updatemiliValues()}</p>
                    </div>
                </div>
                <div className='app__weather-icon'>
                    <div className='app__weather-icon_box'>
                        <i className={'wi wi-humidity'}></i>
                    </div>
                    <div className='app__weather-icon-info'>
                        <p>Humidity</p>
                        <p>{weatherinfo.humidity}%</p>
                    </div>
                </div>
                <div className='app__weather-icon'>
                    <div className='app__weather-icon_box'>
                        <i className={'wi wi-cloudy-windy'}></i>
                    </div>
                    <div className='app__weather-icon-info'>
                        <p>Pressure</p>
                        <p>{weatherinfo.pressure}</p>
                    </div>
                </div>
           </div>
        </div>
    </div>
  )
}

export default Weather